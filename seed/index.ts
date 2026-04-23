import bcrypt from "bcryptjs"
import { PrismaClient, FeeStatus, PaymentStatus, PaymentMethod } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const BCRYPT_ROUNDS = 12
const TENANT_SLUG = "gcuf"
const STUDENT_TARGET = 100
const ADMIN_EMAILS = ["muhammadnomanbaghoor@gmail.com", "iasknoman156@gmail.com"]
const VC_EMAIL = "noman.dev200@gmail.com"
const COMMON_PASSWORD = "Noman@123"

const firstNames = [
  "Areeba", "Hamza", "Maham", "Talha", "Sahar", "Usman", "Iqra", "Ammar",
  "Muneeb", "Anam", "Hassan", "Laiba", "Huzaifa", "Kiran", "Tayyab", "Sana",
  "Nimra", "Farhan", "Maryam", "Daniyal", "Sadia", "Taimoor", "Ayesha", "Shahzaib",
]
const lastNames = [
  "Khalid", "Qureshi", "Yousaf", "Rafique", "Aslam", "Nawaz", "Haider", "Raza",
  "Bashir", "Sarwar", "Abbasi", "Latif", "Siddiqui", "Farooq", "Majid", "Shafiq",
  "Akram", "Hanif", "Mughal", "Ashraf", "Khan", "Hussain", "Malik", "Ansari",
]

function pick<T>(items: T[], index: number): T {
  return items[index % items.length]
}

function startOfDay(value: Date): Date {
  const d = new Date(value)
  d.setHours(0, 0, 0, 0)
  return d
}

async function ensureSuperAdmin(): Promise<void> {
  const superAdminEmail = "noman@gmail.com"
  const superAdminHash = await bcrypt.hash(COMMON_PASSWORD, BCRYPT_ROUNDS)

  const existing = await prisma.user.findFirst({
    where: { email: superAdminEmail, tenantId: null },
  })

  if (!existing) {
    await prisma.user.create({
      data: {
        email: superAdminEmail,
        passwordHash: superAdminHash,
        name: "Noman (Super Admin)",
        role: "SUPER_ADMIN",
        isFirstLogin: false,
        isActive: true,
      },
    })
  } else {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        passwordHash: superAdminHash,
        isFirstLogin: false,
        isActive: true,
        role: "SUPER_ADMIN",
      },
    })
  }
}

async function clearTenantData(tenantId: string): Promise<void> {
  await prisma.$transaction([
    prisma.webhookEvent.deleteMany({ where: { tenantId } }),
    prisma.payment.deleteMany({ where: { tenantId } }),
    prisma.feeAssignment.deleteMany({ where: { tenantId } }),
    prisma.feeStructure.deleteMany({ where: { tenantId } }),
    prisma.student.deleteMany({ where: { tenantId } }),
    prisma.user.deleteMany({
      where: {
        tenantId,
        role: { not: "SUPER_ADMIN" },
        email: {
          notIn: [VC_EMAIL, ...ADMIN_EMAILS],
        },
      },
    }),
    prisma.program.deleteMany({ where: { tenantId } }),
    prisma.department.deleteMany({ where: { tenantId } }),
    prisma.academicSession.deleteMany({ where: { tenantId } }),
  ])
}

async function main(): Promise<void> {
  console.log("🌱 Seeding complete university dataset...")
  await ensureSuperAdmin()

  const tenant = await prisma.tenant.upsert({
    where: { slug: TENANT_SLUG },
    update: {
      name: "Government College University Faisalabad",
      shortName: "GCUF",
      isActive: true,
      domain: "fees.gcuf.edu.pk",
    },
    create: {
      name: "Government College University Faisalabad",
      shortName: "GCUF",
      slug: TENANT_SLUG,
      domain: "fees.gcuf.edu.pk",
      primaryColor: "#d4a843",
      accentColor: "#0a0e1a",
      isActive: true,
    },
  })

  await clearTenantData(tenant.id)

  const adminPasswordHash = await bcrypt.hash(COMMON_PASSWORD, BCRYPT_ROUNDS)
  const vcPasswordHash = await bcrypt.hash(COMMON_PASSWORD, BCRYPT_ROUNDS)
  const hodPasswordHash = await bcrypt.hash(COMMON_PASSWORD, BCRYPT_ROUNDS)
  const studentPasswordHash = await bcrypt.hash(COMMON_PASSWORD, BCRYPT_ROUNDS)

  for (const [index, email] of ADMIN_EMAILS.entries()) {
    await prisma.user.upsert({
      where: { email },
      update: {
        tenantId: tenant.id,
        name: index === 0 ? "Registrar Admin" : "Admin User",
        passwordHash: adminPasswordHash,
        role: "ADMIN",
        isFirstLogin: false,
        isActive: true,
      },
      create: {
        tenantId: tenant.id,
        name: index === 0 ? "Registrar Admin" : "Admin User",
        email,
        passwordHash: adminPasswordHash,
        role: "ADMIN",
        isFirstLogin: false,
        isActive: true,
      },
    })
  }

  await prisma.user.upsert({
    where: { email: VC_EMAIL },
    update: {
      tenantId: tenant.id,
      name: "Vice Chancellor",
      passwordHash: vcPasswordHash,
      role: "VC",
      isFirstLogin: false,
      isActive: true,
    },
    create: {
      tenantId: tenant.id,
      name: "Vice Chancellor",
      email: VC_EMAIL,
      passwordHash: vcPasswordHash,
      role: "VC",
      isFirstLogin: false,
      isActive: true,
    },
  })

  const departments = await prisma.department.createManyAndReturn({
    data: [
      { tenantId: tenant.id, name: "Computer Science", code: "CS", isActive: true },
      { tenantId: tenant.id, name: "Biology", code: "BIO", isActive: true },
      { tenantId: tenant.id, name: "Physics", code: "PHY", isActive: true },
      { tenantId: tenant.id, name: "Mathematics", code: "MATH", isActive: true },
      { tenantId: tenant.id, name: "Chemistry", code: "CHEM", isActive: true },
      { tenantId: tenant.id, name: "Statistics", code: "STAT", isActive: true },
      { tenantId: tenant.id, name: "Economics", code: "ECON", isActive: true },
      { tenantId: tenant.id, name: "Commerce", code: "COMM", isActive: true },
      { tenantId: tenant.id, name: "English", code: "ENG", isActive: true },
      { tenantId: tenant.id, name: "Management Sciences", code: "MGT", isActive: true },
    ],
  })

  for (const department of departments) {
    await prisma.user.create({
      data: {
        tenantId: tenant.id,
        name: `${department.name} HOD`,
        email: `hod.${department.code.toLowerCase()}@gcuf.edu.pk`,
        passwordHash: hodPasswordHash,
        role: "HOD",
        hodDepartmentId: department.id,
        isFirstLogin: false,
        isActive: true,
      },
    })
  }

  const sessions = await prisma.academicSession.createManyAndReturn({
    data: [
      { tenantId: tenant.id, name: "2021-2025", startYear: 2021, endYear: 2025, isCurrent: false },
      { tenantId: tenant.id, name: "2022-2026", startYear: 2022, endYear: 2026, isCurrent: false },
      { tenantId: tenant.id, name: "2023-2027", startYear: 2023, endYear: 2027, isCurrent: false },
      { tenantId: tenant.id, name: "2024-2028", startYear: 2024, endYear: 2028, isCurrent: true },
      { tenantId: tenant.id, name: "2025-2029", startYear: 2025, endYear: 2029, isCurrent: false },
      { tenantId: tenant.id, name: "2026-2030", startYear: 2026, endYear: 2030, isCurrent: false },
    ],
  })

  const programTemplates: Record<string, Array<{ code: string; name: string; degreeType: string }>> = {
    CS: [
      { code: "BSCS", name: "BS Computer Science", degreeType: "BS" },
      { code: "BSSE", name: "BS Software Engineering", degreeType: "BS" },
    ],
    BIO: [
      { code: "BSBIO", name: "BS Biology", degreeType: "BS" },
      { code: "MSBIO", name: "MS Biology", degreeType: "MS" },
    ],
    PHY: [
      { code: "BSPHY", name: "BS Physics", degreeType: "BS" },
      { code: "MSPHY", name: "MS Physics", degreeType: "MS" },
    ],
    MATH: [
      { code: "BSMATH", name: "BS Mathematics", degreeType: "BS" },
      { code: "MSMATH", name: "MS Mathematics", degreeType: "MS" },
    ],
    CHEM: [
      { code: "BSCHEM", name: "BS Chemistry", degreeType: "BS" },
      { code: "MSCHEM", name: "MS Chemistry", degreeType: "MS" },
    ],
    STAT: [
      { code: "BSSTAT", name: "BS Statistics", degreeType: "BS" },
      { code: "MSSTAT", name: "MS Statistics", degreeType: "MS" },
    ],
    ECON: [
      { code: "BSECON", name: "BS Economics", degreeType: "BS" },
      { code: "MSECON", name: "MS Economics", degreeType: "MS" },
    ],
    COMM: [
      { code: "BCOM", name: "B.Com", degreeType: "BS" },
      { code: "MCOM", name: "M.Com", degreeType: "MS" },
    ],
    ENG: [
      { code: "BSENG", name: "BS English", degreeType: "BS" },
      { code: "MSENG", name: "MS English", degreeType: "MS" },
    ],
    MGT: [
      { code: "BBA", name: "BBA", degreeType: "BS" },
      { code: "MBA", name: "MBA", degreeType: "MS" },
    ],
  }

  const programRows: Array<{
    tenantId: string
    departmentId: string
    name: string
    code: string
    degreeType: string
    durationYears: number
    totalSemesters: number
    isActive: boolean
  }> = []

  for (const department of departments) {
    const templates = programTemplates[department.code] ?? []
    for (const template of templates) {
      programRows.push({
        tenantId: tenant.id,
        departmentId: department.id,
        name: template.name,
        code: `${template.code}-${department.code}`,
        degreeType: template.degreeType,
        durationYears: 4,
        totalSemesters: 8,
        isActive: true,
      })
    }
  }

  const programs = await prisma.program.createManyAndReturn({
    data: programRows,
  })

  const feeStructures = []
  const sessionYears = [2025, 2026, 2027]
  for (const program of programs) {
    for (const sessionYear of sessionYears) {
      for (let semester = 1; semester <= 8; semester += 1) {
        const tuitionFee = 42000 + semester * 1800 + (sessionYear - 2025) * 1200
        const labFee = semester % 2 === 0 ? 3000 : 1500
        const libraryFee = 1200
        const sportsFee = 1000
        const registrationFee = 2200
        const examinationFee = 2600
        const otherFee = 800
        const totalFee = tuitionFee + labFee + libraryFee + sportsFee + registrationFee + examinationFee + otherFee

        feeStructures.push({
          tenantId: tenant.id,
          programId: program.id,
          semester,
          sessionYear,
          tuitionFee,
          labFee,
          libraryFee,
          sportsFee,
          registrationFee,
          examinationFee,
          otherFee,
          totalFee,
          dueDate: new Date(sessionYear, (semester + 1) % 12, 15),
          lateFee: 250 + (sessionYear - 2025) * 50,
          isActive: true,
        })
      }
    }
  }

  await prisma.feeStructure.createMany({ data: feeStructures })

  const structureMap = new Map<string, { id: string; totalFee: number; dueDate: Date; sessionYear: number }>()
  const structureRows = await prisma.feeStructure.findMany({
    where: { tenantId: tenant.id, sessionYear: { in: sessionYears } },
    select: {
      id: true,
      programId: true,
      semester: true,
      totalFee: true,
      dueDate: true,
      sessionYear: true,
    },
  })
  for (const row of structureRows) {
    structureMap.set(`${row.programId}:${row.semester}:${row.sessionYear}`, {
      id: row.id,
      totalFee: row.totalFee,
      dueDate: row.dueDate,
      sessionYear: row.sessionYear,
    })
  }
  const departmentIndexById = new Map(departments.map((department, index) => [department.id, index]))

  const studentUsers = []
  const studentRows = []
  for (let index = 0; index < STUDENT_TARGET; index += 1) {
    const firstName = pick(firstNames, index)
    const lastName = pick(lastNames, index * 3)
    const fullName = `${firstName} ${lastName}`
    const rollNo = `GCUF-2026-${String(index + 1).padStart(4, "0")}`
    const userId = `seed-user-${index}`
    const studentId = `seed-student-${index}`

    const department = pick(departments, index)
    const departmentPrograms = programs.filter((program) => program.departmentId === department.id)
    const program = pick(departmentPrograms, index * 2)
    const session = pick(sessions, index * 5)
    const currentSemester = (index % 8) + 1

    studentUsers.push({
      id: userId,
      tenantId: tenant.id,
      name: fullName,
      email: `student${String(index + 1).padStart(4, "0")}@gcuf.edu.pk`,
      phone: `0300${String(1000000 + index)}`,
      role: "STUDENT" as const,
      passwordHash: studentPasswordHash,
      isFirstLogin: false,
      isActive: true,
    })

    studentRows.push({
      id: studentId,
      tenantId: tenant.id,
      userId,
      studentId: rollNo,
      cnic: `33100-${String(1000000 + index).padStart(7, "0")}-${index % 9}`,
      sessionId: session.id,
      departmentId: department.id,
      programId: program.id,
      currentSemester,
      enrollmentStatus: "ACTIVE" as const,
    })
  }

  await prisma.user.createMany({ data: studentUsers })
  await prisma.student.createMany({ data: studentRows })

  const students = await prisma.student.findMany({
    where: { tenantId: tenant.id },
    select: {
      id: true,
      userId: true,
      departmentId: true,
      programId: true,
      currentSemester: true,
    },
  })

  const feeAssignments = []
  const payments = []
  const today = startOfDay(new Date())
  const statusCycleByBucket = new Map<string, number>()

  let receiptCounter = 1
  let assignmentCounter = 1
  for (let index = 0; index < students.length; index += 1) {
    const student = students[index]
    const semestersForStudent = [
      student.currentSemester,
      Math.max(1, student.currentSemester - 1),
      Math.max(1, student.currentSemester - 2),
    ]

    for (let offset = 0; offset < semestersForStudent.length; offset += 1) {
      if (offset === 2 && index % 3 !== 0) continue

      const semester = semestersForStudent[offset]
      const sessionYear = sessionYears[(index + offset) % sessionYears.length]
      const structure = structureMap.get(`${student.programId}:${semester}:${sessionYear}`)
      if (!structure) continue

      const departmentIndex = departmentIndexById.get(student.departmentId) ?? 0
      const bucketKey = `${student.departmentId}:${semester}`
      const bucketCount = statusCycleByBucket.get(bucketKey) ?? 0
      statusCycleByBucket.set(bucketKey, bucketCount + 1)
      const statusBucket = (bucketCount + departmentIndex + sessionYear + offset) % 5
      const assignmentId = `seed-assignment-${assignmentCounter}`
      assignmentCounter += 1
      const isPaid = statusBucket === 0 || statusBucket === 1
      const isPartial = statusBucket === 2
      const isOverdue = statusBucket === 4
      const amountDue = structure.totalFee
      const amountPaid = isPaid
        ? amountDue
        : isPartial
          ? Math.floor(amountDue * (0.35 + ((index + semester + offset) % 25) / 100))
          : 0

      const assignmentStatus = isPaid
        ? FeeStatus.PAID
        : isPartial
          ? FeeStatus.PARTIAL
          : isOverdue
            ? FeeStatus.OVERDUE
            : FeeStatus.UNPAID

      const randomDayOffset = (index * 3 + offset * 11) % 120
      const paidAt = isPaid
        ? new Date(today.getTime() - randomDayOffset * 24 * 60 * 60 * 1000 + (index % 19) * 60 * 60 * 1000)
        : null

      const dueDate = isOverdue
        ? new Date(today.getTime() - (7 + ((index + offset) % 45)) * 24 * 60 * 60 * 1000)
        : structure.dueDate

      feeAssignments.push({
        id: assignmentId,
        tenantId: tenant.id,
        studentId: student.id,
        feeStructureId: structure.id,
        amountDue,
        amountPaid,
        lateFeeApplied: isOverdue ? 1200 + offset * 200 : 0,
        discountApplied: (index + offset) % 41 === 0 ? 1000 : 0,
        status: assignmentStatus,
        dueDate,
        challanNumber: `CH-${String(assignmentCounter).padStart(6, "0")}`,
        paidAt,
      })

      if (isPaid || isPartial) {
        const isCompleted = isPaid || (isPartial && (index + offset) % 2 === 0)
        const paymentAmount = isPaid ? amountDue : Math.max(amountPaid, 1000)
        const paymentStatus = isCompleted ? PaymentStatus.COMPLETED : PaymentStatus.FAILED

        payments.push({
          tenantId: tenant.id,
          studentId: student.id,
          feeAssignmentId: assignmentId,
          amount: paymentAmount,
          method: PaymentMethod.STRIPE_CARD,
          status: paymentStatus,
          stripePaymentIntentId: `pi_seed_${index}_${offset}`,
          stripeResponse: { seeded: true, index, offset, simulatedStatus: paymentStatus, sessionYear },
          receiptNumber: `GCUF-2026-${String(receiptCounter).padStart(5, "0")}`,
          paidAt: isCompleted ? paidAt ?? new Date(today.getTime() - (index % 15) * 60 * 60 * 1000) : null,
          createdAt: new Date(today.getTime() - randomDayOffset * 24 * 60 * 60 * 1000),
        })
        receiptCounter += 1
      }
    }
  }

  await prisma.feeAssignment.createMany({ data: feeAssignments })
  await prisma.payment.createMany({ data: payments })

  const studentSnapshotMap = new Map<string, { totalFeeDue: number; totalFeePaid: number; feeStatus: FeeStatus }>()
  for (const assignment of feeAssignments) {
    const current = studentSnapshotMap.get(assignment.studentId) ?? {
      totalFeeDue: 0,
      totalFeePaid: 0,
      feeStatus: FeeStatus.PAID,
    }
    current.totalFeeDue += assignment.amountDue
    current.totalFeePaid += assignment.amountPaid

    if (assignment.status === FeeStatus.OVERDUE) current.feeStatus = FeeStatus.OVERDUE
    else if (assignment.status === FeeStatus.PARTIAL && current.feeStatus !== FeeStatus.OVERDUE) current.feeStatus = FeeStatus.PARTIAL
    else if (assignment.status === FeeStatus.UNPAID && current.feeStatus === FeeStatus.PAID) current.feeStatus = FeeStatus.UNPAID

    studentSnapshotMap.set(assignment.studentId, current)
  }

  for (const [studentId, snapshot] of studentSnapshotMap) {
    await prisma.student.update({
      where: { id: studentId },
      data: snapshot,
    })
  }

  const snapshotRows = Array.from(studentSnapshotMap.values())
  const paidCount = snapshotRows.filter((item) => item.feeStatus === FeeStatus.PAID).length
  const defaultersCount = snapshotRows.filter((item) => item.feeStatus === FeeStatus.OVERDUE).length

  console.log("\n✅ Seed completed.")
  console.log(`Tenant: ${tenant.name}`)
  console.log(`Departments: ${departments.length}`)
  console.log(`Programs: ${programs.length}`)
  console.log(`Sessions: ${sessions.length}`)
  console.log(`Students: ${students.length}`)
  console.log(`Fee assignments: ${feeAssignments.length}`)
  console.log(`Payments: ${payments.length}`)
  console.log(`Paid students: ${paidCount}`)
  console.log(`Defaulters: ${defaultersCount}`)
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
