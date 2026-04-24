import { PrismaClient } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🧹 Starting Database Cleanup...")

  // 1. Delete all transactional, intelligence, and log data
  console.log("Deleting Payments and WebhookEvents...")
  await prisma.webhookEvent.deleteMany({})
  await prisma.payment.deleteMany({})

  console.log("Deleting Fee Assignments and Structures...")
  await prisma.feeAssignment.deleteMany({})
  await prisma.feeStructure.deleteMany({})

  console.log("Deleting Logs and Insights...")
  await prisma.activityLog.deleteMany({})
  await prisma.insight.deleteMany({})
  await prisma.emailLog.deleteMany({})
  await prisma.notification.deleteMany({})
  await prisma.auditLog.deleteMany({})

  // 2. Delete unwanted users
  // We ONLY want to keep these three emails. 
  // Because of Cascade deletion, deleting unwanted users will automatically delete their Student profiles!
  const emailsToKeep = [
    "noman.dev200@gmail.com", // VC
    "muhammadnomanbaghoor@gmail.com", // Admin
    "kinginam740@gmail.com", // Student
  ]

  console.log(`Deleting all users except: ${emailsToKeep.join(", ")}...`)
  const deletedUsers = await prisma.user.deleteMany({
    where: {
      email: {
        notIn: emailsToKeep,
      },
    },
  })
  console.log(`Deleted ${deletedUsers.count} unwanted users.`)

  // 3. Reset the remaining student's fee info to zero
  console.log("Resetting remaining student records to UNPAID and 0 balances...")
  await prisma.student.updateMany({
    data: {
      feeStatus: "UNPAID",
      totalFeeDue: 0,
      totalFeePaid: 0,
      riskLevel: "LOW",
      latePaymentCount: 0,
      lastPaymentDate: null,
    },
  })

  console.log("✅ Cleanup complete! Only Departments, Programs, Sessions, and the 3 specific users remain.")
}

main()
  .catch((e) => {
    console.error("❌ Cleanup failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
