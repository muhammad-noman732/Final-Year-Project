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
    
    // Distribute strictly across 3 financial archetypes:
    // Archetype 0: Timely payers (Low Risk) -> 60%
    // Archetype 1: Moderate procrastinators (Medium Risk) -> 25%
    // Archetype 2: Chronic late payers / Defaulters (High Risk) -> 15%
    
    let archetype = 0
    if (i % 7 === 0) archetype = 2 // Chronic late (High Risk)
    else if (i % 4 === 0) archetype = 1 // Procrastinator (Medium Risk)

    // Reset Student Metadata to null
    await prisma.student.update({
      where: { id: student.id },
      data: { metadata: null }
    })

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
      let status = FeeStatus.PAID // Default prior semesters to PAID

      // Create a student-specific random shift (0 to 14 days) to smear payments naturally
      const randomShift = (i * 3 + sem * 7) % 15
      
      let dueDate = new Date(today.getTime())
      let createdAt = new Date(today.getTime())

      if (sem < currentSem) {
        // Prior Semesters: Chronologically in the past
        // We use a 45-day semester interval with a random shift to spread payments over the last 60 days
        const semesterOffset = currentSem - sem
        const totalOffsetDays = semesterOffset * 45 + randomShift
        
        dueDate.setTime(today.getTime() - totalOffsetDays * 24 * 60 * 60 * 1000)
        createdAt.setTime(dueDate.getTime() - 20 * 24 * 60 * 60 * 1000)

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
        // Current Semester: Due 12 days ago with random shift
        const currentOffsetDays = 12 + (i % 6)
        dueDate.setTime(today.getTime() - currentOffsetDays * 24 * 60 * 60 * 1000)
        createdAt.setTime(dueDate.getTime() - 25 * 24 * 60 * 60 * 1000)

        if (archetype === 0) {
          // Low Risk: Already paid on time
          delayDays = 3
          lateFee = 0
          status = FeeStatus.PAID
        } else if (archetype === 1) {
          // Medium Risk: Paid late with late fee
          delayDays = 15 // Paid after due date
          lateFee = 500
          status = FeeStatus.PAID
        } else {
          // High Risk / Defaulters: Unpaid and Overdue!
          delayDays = 0
          lateFee = 1500
          status = FeeStatus.OVERDUE
        }
      } else {
        // Future Semesters (assigned early by mistake or pre-generated)
        const semesterOffset = sem - currentSem
        dueDate.setTime(today.getTime() + (semesterOffset * 45 + randomShift) * 24 * 60 * 60 * 1000)
        createdAt.setTime(dueDate.getTime() - 20 * 24 * 60 * 60 * 1000)
        status = FeeStatus.UNPAID
        lateFee = 0
        delayDays = 0
      }

      // Calculate paidAt based on delayDays
      const paidAt = status === FeeStatus.PAID
        ? new Date(createdAt.getTime() + delayDays * 24 * 60 * 60 * 1000)
        : null

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
  console.log("🟢 60% Low Risk Archetypes (Smeared daily payment flow)")
  console.log("🟡 25% Medium Risk Archetypes (Smeared late daily payments)")
  console.log("🔴 15% High Risk Archetypes (Currently overdue)")
}

main()
  .catch(console.error)
  .finally(() => pool.end())
