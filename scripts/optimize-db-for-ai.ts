import { PrismaClient, FeeStatus } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import "dotenv/config"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("⚡ Starting database optimization with Smeared Chronological Alignment (60-Day Window)...")

  // 1. Fetch all students
  const students = await prisma.student.findMany()
  console.log(`Fetched ${students.length} students.`)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 2. Loop through students and distribute realistic, chronologically flawless financial histories
  for (let i = 0; i < students.length; i++) {
    const student = students[i]
    const currentSem = student.currentSemester
    
    // New distribution per request: 30% PAID, 25% UNPAID, remaining (45%) -> OVERDUE (defaulters)
    const pct = (i % 100) + 1 // deterministic 1..100 per student index
    // archetype: 0 = PAID, 1 = UNPAID, 2 = OVERDUE
    let archetype = 0
    if (pct <= 30) archetype = 0
    else if (pct <= 30 + 25) archetype = 1
    else archetype = 2

    // Fetch assignments for this student, including their fee structures and payments
    const assignments = await prisma.feeAssignment.findMany({
      where: { studentId: student.id },
      include: { 
        feeStructure: true,
        payments: true 
      }
    })

    for (const assignment of assignments) {
      const sem = assignment.feeStructure.semester
      
      let delayDays = 2
      let lateFee = 0
      let status: FeeStatus = FeeStatus.PAID

      // Create a student-specific random shift (0 to 14 days) to smear payments naturally
      const randomShift = (i * 3 + sem * 7) % 15
      
      let dueDate: Date
      let createdAt: Date

      if (sem < currentSem) {
        // Prior Semesters: Chronologically in the past
        // We use a 45-day semester interval with a random shift to spread payments over the last 60 days
        const semesterOffset = currentSem - sem
        const totalOffsetDays = semesterOffset * 45 + randomShift
        
        dueDate = new Date(today.getTime() - totalOffsetDays * 24 * 60 * 60 * 1000)
        createdAt = new Date(dueDate.getTime() - 20 * 24 * 60 * 60 * 1000)

        // Prior semesters are always PAID, but delay depends on archetype
        if (archetype === 0) {
          delayDays = ((sem * 5) % 5) + 1 // 1-5 days delay
          lateFee = 0
        } else if (archetype === 1) {
          delayDays = ((sem * 7) % 8) + 10 // 10-17 days delay (occasionally late)
          lateFee = (sem % 2 === 0) ? 500 : 0
        } else {
          delayDays = ((sem * 11) % 12) + 18 // 18-29 days delay (mostly late)
          lateFee = 1500
        }
        status = FeeStatus.PAID
      } else if (sem === currentSem) {
        if (archetype === 0) {
          // PAID
          delayDays = 3
          lateFee = 0
          status = FeeStatus.PAID
          dueDate = new Date(2026, 3, 25)
          createdAt = new Date(2026, 3, 5)
        } else if (archetype === 1) {
          // UNPAID — due date has not passed yet
          delayDays = 0
          lateFee = 0
          status = FeeStatus.UNPAID
          dueDate = new Date(2026, 4, 28)
          createdAt = new Date(2026, 4, 1)
        } else {
          // OVERDUE — due date has passed and student has not paid
          delayDays = 0
          lateFee = 1500
          status = FeeStatus.OVERDUE
          dueDate = new Date(2026, 3, 20)
          createdAt = new Date(2026, 2, 25)
        }
      } else {
        // Future Semesters (assigned early by mistake or pre-generated)
        const semesterOffset = sem - currentSem
        dueDate = new Date(today.getTime() + (semesterOffset * 45 + randomShift) * 24 * 60 * 60 * 1000)
        createdAt = new Date(dueDate.getTime() - 20 * 24 * 60 * 60 * 1000)
        status = FeeStatus.UNPAID
        lateFee = 0
        delayDays = 0
      }

      // Calculate paidAt based on delayDays
      let paidAt = status === FeeStatus.PAID
        ? new Date(createdAt.getTime() + delayDays * 24 * 60 * 60 * 1000)
        : null

      // For PAID assignments on current semester, distribute paidAt across April/May 2026
      // and ensure 5 students are paid on 2026-05-19 for supervisor checks.
      if (status === FeeStatus.PAID && sem === currentSem) {
        const paidBucket = i % 100
        if (paidBucket < 5) {
          paidAt = new Date(2026, 4, 19)
        } else if (paidBucket % 2 === 0) {
          const day = 5 + (i % 21)
          paidAt = new Date(2026, 3, day)
        } else {
          const day = 1 + (i % 18)
          paidAt = new Date(2026, 4, day)
        }
      }

      // Ensure amountPaid matches status
      const amountPaid = status === FeeStatus.PAID
        ? assignment.amountDue
        : 0

      // Update FeeAssignment in DB
      await prisma.feeAssignment.update({
        where: { id: assignment.id },
        data: {
          lateFeeApplied: lateFee,
          status,
          amountPaid,
          dueDate,
          createdAt,
          paidAt
        }
      })

      // D. Sync payments to match the new paidAt delay and status
      if (assignment.payments.length > 0) {
        for (const payment of assignment.payments) {
          const isCompleted = status === FeeStatus.PAID
          const paymentStatus = isCompleted ? "COMPLETED" : "FAILED"
          const paymentPaidAt = isCompleted ? paidAt : null

          await prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: paymentStatus,
              paidAt: paymentPaidAt,
              createdAt: createdAt
            }
          })
        }
      }
    }
  }

  console.log("\n✅ Successfully optimized and naturally smeared student profiles!")
  console.log("✅ Distribution: 30% PAID, 25% UNPAID, 45% OVERDUE (defaulters)")
}

main()
  .catch(console.error)
  .finally(() => pool.end())
