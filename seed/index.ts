import bcrypt from "bcryptjs"
import { PrismaClient } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const BCRYPT_ROUNDS = 12

async function main(): Promise<void> {
  console.log("🌱 Starting platform seeding process...\n")

  const superAdminEmail = "noman@gmail.com"
  const superAdminPassword = "admin123"

  console.log(`> Checking for existing Super Admin (${superAdminEmail})...`)

  // We use findFirst to avoid Prisma's null constraint bugs on upserts with null tenantId
  let superAdmin = await prisma.user.findFirst({
    where: {
      email: superAdminEmail,
      tenantId: null
    },
  })

  const superAdminHash = await bcrypt.hash(superAdminPassword, BCRYPT_ROUNDS)

  if (!superAdmin) {
    console.log("> Creating new Super Admin profile...")
    superAdmin = await prisma.user.create({
      data: {
        email: superAdminEmail,
        passwordHash: superAdminHash,
        name: "Noman (Super Admin)",
        role: "SUPER_ADMIN",
        isFirstLogin: false, // Prevents you from instantly being forced to change the password
        isActive: true,
      },
    })
  } else {
    console.log("> Updating existing Super Admin credentials...")
    superAdmin = await prisma.user.update({
      where: { id: superAdmin.id },
      data: {
        passwordHash: superAdminHash,
        isFirstLogin: false,
        name: "Noman (Super Admin)",
        role: "SUPER_ADMIN",
        isActive: true
      },
    })
  }

  console.log("\n🎉 Seed completed successfully!\n")
  console.log("╔══════════════════════════════════════════════════════╗")
  console.log("║  Platform Nexus (Super Admin) Credentials            ║")
  console.log("╠══════════════════════════════════════════════════════╣")
  console.log(`║  Email:    ${superAdmin.email.padEnd(30, ' ')}║`)
  console.log(`║  Pass:     ${superAdminPassword.padEnd(30, ' ')}║`)
  console.log("╚══════════════════════════════════════════════════════╝")
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
