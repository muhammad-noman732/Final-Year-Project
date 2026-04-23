import { PrismaClient } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const tenant = await prisma.tenant.findUnique({ where: { slug: "gcuf" } })
  if (!tenant) {
    console.log("Tenant not found")
    return
  }

  const session = await prisma.academicSession.findFirst({ where: { tenantId: tenant.id, isCurrent: true } })
  const department = await prisma.department.findFirst({ where: { tenantId: tenant.id } })
  const program = await prisma.program.findFirst({ where: { tenantId: tenant.id } })

  console.log("Session ID:", session?.id)
  console.log("Department ID:", department?.id)
  console.log("Program ID:", program?.id)
}

main().catch(console.error).finally(async () => await prisma.$disconnect())
