import bcrypt from "bcryptjs"
import { PrismaClient, Role, EnrollmentStatus, FeeStatus } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const BCRYPT_ROUNDS = 12
const TENANT_NAME = "UniSync Global Academy"
const TENANT_SLUG = "unisync-global"
const TENANT_SHORT = "UGA"

async function main() {
  console.log("🌱 Seeding Universal Tenant...")

  // 1. Create or Update Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: TENANT_SLUG },
    update: {
      name: TENANT_NAME,
      shortName: TENANT_SHORT,
      isActive: true,
    },
    create: {
      name: TENANT_NAME,
      shortName: TENANT_SHORT,
      slug: TENANT_SLUG,
      isActive: true,
      primaryColor: "#0F172A",
      accentColor: "#3B82F6",
    },
  })

  const tenantId = tenant.id

  // 2. Define Users to Seed
  const usersToSeed = [
    {
      email: "admin@gmail.com",
      password: "admin@123",
      name: "UniSync Admin",
      role: Role.ADMIN,
    },
    {
      email: "vc@gmail.com",
      password: "uvc@123",
      name: "UniSync Vice Chancellor",
      role: Role.VC,
    },
    {
      email: "student@gmail.com",
      password: "student@123",
      name: "UniSync Student",
      role: Role.STUDENT,
    },
    {
      email: "hod@gmail.com",
      password: "hod@123",
      name: "UniSync HOD",
      role: Role.HOD,
    },
  ]

  // 3. Clean up existing users with these emails
  const emails = usersToSeed.map(u => u.email)
  console.log(`Cleaning up existing users: ${emails.join(", ")}`)
  
  // Find users first to handle relations
  const existingUsers = await prisma.user.findMany({
    where: { email: { in: emails } }
  })

  for (const user of existingUsers) {
    // Delete student record if exists
    await prisma.student.deleteMany({ where: { userId: user.id } })
    // Delete user
    await prisma.user.delete({ where: { id: user.id } })
  }

  // 4. Ensure basic structures exist for Student and HOD
  console.log("Setting up departments and programs...")
  
  const department = await prisma.department.upsert({
    where: { tenantId_code: { tenantId, code: "CS" } },
    update: {},
    create: {
      tenantId,
      name: "Computer Science",
      code: "CS",
    }
  })

  const program = await prisma.program.upsert({
    where: { tenantId_code: { tenantId, code: "BSCS-CS" } },
    update: {},
    create: {
      tenantId,
      departmentId: department.id,
      name: "BS Computer Science",
      code: "BSCS-CS",
      degreeType: "BS",
      durationYears: 4,
      totalSemesters: 8,
    }
  })

  const session = await prisma.academicSession.upsert({
    where: { tenantId_name: { tenantId, name: "2024-2028" } },
    update: {},
    create: {
      tenantId,
      name: "2024-2028",
      startYear: 2024,
      endYear: 2028,
      isCurrent: true,
    }
  })

  // 5. Create Users
  for (const userData of usersToSeed) {
    console.log(`Creating user: ${userData.email}`)
    const passwordHash = await bcrypt.hash(userData.password, BCRYPT_ROUNDS)
    
    const user = await prisma.user.create({
      data: {
        tenantId,
        email: userData.email,
        passwordHash,
        name: userData.name,
        role: userData.role,
        isActive: true,
        isFirstLogin: false,
        // Link HOD to department
        ...(userData.role === Role.HOD ? { hodDepartmentId: department.id } : {}),
      }
    })

    // If student, create Student record
    if (userData.role === Role.STUDENT) {
      await prisma.student.create({
        data: {
          tenantId,
          userId: user.id,
          studentId: "UNISYNC-STUDENT-001",
          sessionId: session.id,
          departmentId: department.id,
          programId: program.id,
          currentSemester: 1,
          enrollmentStatus: EnrollmentStatus.ACTIVE,
          feeStatus: FeeStatus.UNPAID,
          totalFeeDue: 50000,
        }
      })
    }
  }

  console.log("✅ Universal Tenant Seeded Successfully!")
  console.log(`Tenant: ${TENANT_NAME} (${TENANT_SLUG})`)
  console.log("Credentials:")
  usersToSeed.forEach(u => {
    console.log(`- ${u.role}: ${u.email} / ${u.password}`)
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
