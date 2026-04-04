// ═══════════════════════════════════════════════════════════════
//  Database Seed Script
//
//  Creates:
//  - 1 SUPER_ADMIN: superadmin@system.com / SuperAdmin@123
//  - 1 Tenant: GCUF
//  - 1 ADMIN:  admin@gcuf.edu.pk / Admin@12345
//  - 1 VC:     vc@gcuf.edu.pk / VC@123456
//  - 2 Departments: CS, Biology
//  - 2 Programs: BSCS, BSBio
//  - 1 Academic Session: 2024-2028
//
//  Run: npx tsx prisma/seed.ts
// ═══════════════════════════════════════════════════════════════

import bcrypt from "bcryptjs"
import { PrismaClient } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"

// Load env manually for seed script
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const BCRYPT_ROUNDS = 12

async function main(): Promise<void> {
  console.log("🌱 Seeding database...\n")

  // ── 1. SUPER_ADMIN (no tenantId) ────────────────────────────
  const superAdminHash = await bcrypt.hash("admin123", BCRYPT_ROUNDS)

  const superAdmin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: null as unknown as string, email: "noman@gmail.com" } },
    update: {},
    create: {
      email: "noman@gmail.com",
      passwordHash: superAdminHash,
      name: "Noman (Super Admin)",
      role: "SUPER_ADMIN",
      // tenantId deliberately null — SUPER_ADMIN belongs to no university
      isFirstLogin: false, // Let you log in immediately without forced password reset
      isActive: true,
    },
  })
  console.log(`✅ SUPER_ADMIN: ${superAdmin.email} (password: admin123)`)

  // ── 2. GCUF Tenant ──────────────────────────────────────────
  const gcuf = await prisma.tenant.upsert({
    where: { slug: "gcuf" },
    update: {},
    create: {
      name: "Government College University Faisalabad",
      shortName: "GCUF",
      slug: "gcuf",
      domain: "fees.gcuf.edu.pk",
      primaryColor: "#d4a843",
      accentColor: "#0a0e1a",
      plan: "FREE",
      maxStudents: 500,
      isActive: true,
    },
  })
  console.log(`✅ Tenant: ${gcuf.name} (slug: ${gcuf.slug})`)

  // ── 3. ADMIN for GCUF ──────────────────────────────────────
  const adminHash = await bcrypt.hash("Admin@12345", BCRYPT_ROUNDS)

  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: gcuf.id, email: "admin@gcuf.edu.pk" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      email: "admin@gcuf.edu.pk",
      passwordHash: adminHash,
      name: "Ahmed Khan",
      role: "ADMIN",
      isFirstLogin: true,
      isActive: true,
    },
  })
  console.log(`✅ ADMIN: ${admin.email} (password: Admin@12345)`)

  // ── 4. VC for GCUF ─────────────────────────────────────────
  const vcHash = await bcrypt.hash("VC@123456", BCRYPT_ROUNDS)

  const vc = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: gcuf.id, email: "vc@gcuf.edu.pk" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      email: "vc@gcuf.edu.pk",
      passwordHash: vcHash,
      name: "Prof. Dr. Muhammad Iqbal",
      role: "VC",
      isFirstLogin: true,
      isActive: true,
    },
  })
  console.log(`✅ VC: ${vc.email} (password: VC@123456)`)

  // ── 5. Departments ──────────────────────────────────────────
  const csDept = await prisma.department.upsert({
    where: { tenantId_code: { tenantId: gcuf.id, code: "CS" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      name: "Computer Science",
      code: "CS",
      isActive: true,
    },
  })

  const bioDept = await prisma.department.upsert({
    where: { tenantId_code: { tenantId: gcuf.id, code: "BIO" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      name: "Biology",
      code: "BIO",
      isActive: true,
    },
  })
  console.log(`✅ Departments: ${csDept.name}, ${bioDept.name}`)

  // ── 6. Programs ─────────────────────────────────────────────
  const bscs = await prisma.program.upsert({
    where: { tenantId_code: { tenantId: gcuf.id, code: "BSCS" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      departmentId: csDept.id,
      name: "BS Computer Science",
      code: "BSCS",
      degreeType: "BS",
      durationYears: 4,
      totalSemesters: 8,
      isActive: true,
    },
  })

  const bsBio = await prisma.program.upsert({
    where: { tenantId_code: { tenantId: gcuf.id, code: "BSBio" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      departmentId: bioDept.id,
      name: "BS Biology",
      code: "BSBio",
      degreeType: "BS",
      durationYears: 4,
      totalSemesters: 8,
      isActive: true,
    },
  })
  console.log(`✅ Programs: ${bscs.name}, ${bsBio.name}`)

  // ── 7. Academic Session ─────────────────────────────────────
  const session = await prisma.academicSession.upsert({
    where: { tenantId_name: { tenantId: gcuf.id, name: "2024-2028" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      name: "2024-2028",
      startYear: 2024,
      endYear: 2028,
      isCurrent: true,
    },
  })
  console.log(`✅ Session: ${session.name} (current: ${session.isCurrent})`)

  // ── 8. HOD for CS Department ────────────────────────────────
  const hodHash = await bcrypt.hash("HOD@123456", BCRYPT_ROUNDS)

  const hod = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: gcuf.id, email: "hod@gcuf.edu.pk" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      email: "hod@gcuf.edu.pk",
      passwordHash: hodHash,
      name: "Dr. Fatima Noor",
      role: "HOD",
      hodDepartmentId: csDept.id,
      isFirstLogin: true,
      isActive: true,
    },
  })
  console.log(`✅ HOD: ${hod.email} (password: HOD@123456) — dept: CS`)

  // ── 9. Test Student ─────────────────────────────────────────
  const studentHash = await bcrypt.hash("Student@123", BCRYPT_ROUNDS)

  const studentUser = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: gcuf.id, email: "student@gcuf.edu.pk" } },
    update: {},
    create: {
      tenantId: gcuf.id,
      email: "student@gcuf.edu.pk",
      passwordHash: studentHash,
      name: "Muhammad Ali",
      role: "STUDENT",
      isFirstLogin: false, // So we can test without forced password change
      isActive: true,
    },
  })

  await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      tenantId: gcuf.id,
      userId: studentUser.id,
      studentId: "GCUF-2024-CS-0001",
      sessionId: session.id,
      departmentId: csDept.id,
      programId: bscs.id,
      currentSemester: 2,
      enrollmentStatus: "ACTIVE",
    },
  })
  console.log(`✅ STUDENT: ${studentUser.email} (password: Student@123)`)

  console.log("\n🎉 Seed completed successfully!\n")
  console.log("╚══════════════════════════════════════════════════════╝")
  console.log("╔══════════════════════════════════════════════════════╗")
  console.log("║  Login Credentials                                  ║")
  console.log("╠══════════════════════════════════════════════════════╣")
  console.log("║  SUPER_ADMIN  noman@gmail.com         admin123      ║")
  console.log("║  ADMIN        admin@gcuf.edu.pk       Admin@12345   ║")
  console.log("║  VC           vc@gcuf.edu.pk          VC@123456     ║")
  console.log("║  HOD          hod@gcuf.edu.pk         HOD@123456    ║")
  console.log("║  STUDENT      student@gcuf.edu.pk     Student@123   ║")
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
