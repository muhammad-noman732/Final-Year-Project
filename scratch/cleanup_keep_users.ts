import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/app/generated/prisma/client"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const keepEmails = [
    "noman.dev200@gmail.com",
    "noman@gmail.com",
    "noman@gmail.com",
    "muhammadnomanbaghoor@gmail.com",
    "iasknoman156@gmail.com",
  ]

  const keepUsers = await prisma.user.findMany({
    where: {
      OR: keepEmails.map((email) => ({
        email: { equals: email, mode: "insensitive" },
      })),
    },
    select: {
      id: true,
      email: true,
      role: true,
      tenantId: true,
    },
  })

  if (keepUsers.length === 0) {
    throw new Error("No matching users found for the keep list. Aborting cleanup.")
  }

  const keepUserIds = keepUsers.map((user) => user.id)
  const keepTenantIds = Array.from(
    new Set(keepUsers.map((user) => user.tenantId).filter((id): id is string => Boolean(id))),
  )

  await prisma.$transaction([
    prisma.payment.deleteMany({}),
    prisma.feeAssignment.deleteMany({}),
    prisma.feeStructure.deleteMany({}),
    prisma.student.deleteMany({}),
    prisma.program.deleteMany({}),
    prisma.department.deleteMany({}),
    prisma.academicSession.deleteMany({}),
    prisma.notification.deleteMany({}),
    prisma.emailLog.deleteMany({}),
    prisma.auditLog.deleteMany({}),
    prisma.subscription.deleteMany({}),
    prisma.webhookEvent.deleteMany({}),

    prisma.refreshToken.deleteMany({
      where: { userId: { notIn: keepUserIds } },
    }),
    prisma.passwordResetToken.deleteMany({
      where: { userId: { notIn: keepUserIds } },
    }),
    prisma.user.deleteMany({
      where: { id: { notIn: keepUserIds } },
    }),
    prisma.tenant.deleteMany({
      where: keepTenantIds.length > 0
        ? { id: { notIn: keepTenantIds } }
        : undefined,
    }),
  ])

  const [remainingUsers, tenants, students, payments, assignments] = await Promise.all([
    prisma.user.findMany({
      orderBy: { email: "asc" },
      select: { email: true, role: true, tenantId: true },
    }),
    prisma.tenant.count(),
    prisma.student.count(),
    prisma.payment.count(),
    prisma.feeAssignment.count(),
  ])

  console.log("Cleanup done.")
  console.log({
    keptUsers: remainingUsers,
    tenants,
    students,
    payments,
    assignments,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
