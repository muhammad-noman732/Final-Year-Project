import { PrismaPg } from "@prisma/adapter-pg"
import { FeeStatus, PrismaClient } from "@/app/generated/prisma/client"
import "dotenv/config"

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

async function main() {
  const tenant = await prisma.tenant.findUnique({ where: { slug: "gcuf" }, select: { id: true } })
  if (!tenant) throw new Error("gcuf tenant not found")

  const rows = await prisma.feeAssignment.findMany({
    where: { tenantId: tenant.id },
    select: {
      status: true,
      studentId: true,
      student: { select: { department: { select: { code: true } } } },
      feeStructure: { select: { semester: true } },
    },
  })

  const statusByDeptSemester = new Map<string, Record<FeeStatus, number>>()

  for (const row of rows) {
    const key = `${row.student.department.code}-S${row.feeStructure.semester}`
    const current = statusByDeptSemester.get(key) ?? {
      PAID: 0,
      PARTIAL: 0,
      UNPAID: 0,
      OVERDUE: 0,
      WAIVED: 0,
    }
    current[row.status] += 1
    statusByDeptSemester.set(key, current)
  }

  const summary = Array.from(statusByDeptSemester.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(0, 30)
    .map(([key, value]) => ({ key, ...value }))

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { equals: "muhammadnomanbaghoor@gmail.com", mode: "insensitive" } },
        { email: { equals: "noman.dev200@gmail.com", mode: "insensitive" } },
        { email: { equals: "noman@gmail.com", mode: "insensitive" } },
        { email: { equals: "iasknoman156@gmail.com", mode: "insensitive" } },
      ],
    },
    select: { email: true, role: true, tenantId: true },
    orderBy: { email: "asc" },
  })

  console.log("Users kept/check:", users)
  console.log("Sample department-semester status matrix (first 30):")
  console.table(summary)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => prisma.$disconnect())
