import bcrypt from "bcryptjs"
import { PrismaClient, Role } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const BCRYPT_ROUNDS = 12
const PASSWORD = "Noman@123"

async function main() {
  const tenant = await prisma.tenant.findUnique({ where: { slug: "gcuf" } })
  if (!tenant) {
    console.log("Tenant 'gcuf' not found")
    return
  }

  const passwordHash = await bcrypt.hash(PASSWORD, BCRYPT_ROUNDS)
  const tenantId = tenant.id

  // 1. Admin
  const adminEmail = "muhammadnomanbaghoor@gmail.com"
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: "ADMIN",
      isActive: true,
      isFirstLogin: false,
    },
    create: {
      tenantId,
      email: adminEmail,
      name: "Noman Admin",
      passwordHash,
      role: "ADMIN",
      isActive: true,
      isFirstLogin: false,
    }
  })
  console.log(`Admin created/updated: ${adminEmail}`)

  // 2. VC
  const vcEmail = "noman.dev200@gmail.com"
  await prisma.user.upsert({
    where: { email: vcEmail },
    update: {
      passwordHash,
      role: "VC",
      isActive: true,
      isFirstLogin: false,
    },
    create: {
      tenantId,
      email: vcEmail,
      name: "Noman VC",
      passwordHash,
      role: "VC",
      isActive: true,
      isFirstLogin: false,
    }
  })
  console.log(`VC created/updated: ${vcEmail}`)

  // 3. Student
  const studentEmail = "kinginam740@gmail.com"
  const studentUser = await prisma.user.upsert({
    where: { email: studentEmail },
    update: {
      passwordHash,
      role: "STUDENT",
      isActive: true,
      isFirstLogin: false,
    },
    create: {
      tenantId,
      email: studentEmail,
      name: "King Inam",
      passwordHash,
      role: "STUDENT",
      isActive: true,
      isFirstLogin: false,
    }
  })

  // Create Student profile if not exists
  const sessionId = "cmoa7ip5i000qg4w2p8lbh6cg"
  const departmentId = "cmoa7imuh0004g4w2r2ls4r1q"
  const programId = "cmoa7ipp1000tg4w2s1sj87m0"

  const existingStudent = await prisma.student.findUnique({
    where: { userId: studentUser.id }
  })

  if (!existingStudent) {
    await prisma.student.create({
      data: {
        tenantId,
        userId: studentUser.id,
        studentId: "GCUF-2024-ST-9999",
        sessionId,
        departmentId,
        programId,
        currentSemester: 1,
        enrollmentStatus: "ACTIVE",
      }
    })
    console.log(`Student profile created for: ${studentEmail}`)
  } else {
    console.log(`Student profile already exists for: ${studentEmail}`)
  }

  console.log("✅ Data seeding successful!")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
