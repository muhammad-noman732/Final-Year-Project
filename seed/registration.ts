/**
 * seed/registration.ts
 * Seeds ImportBatch + Applicant records for the GCUF tenant.
 * Run: npm run seed:registration
 */
import { PrismaClient } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const TENANT_SLUG = "gcuf"

// ─── Static applicant pools ───────────────────────────────────────────────────

const firstNames = [
  "Ali", "Ayesha", "Usman", "Fatima", "Bilal", "Sana", "Zain", "Hira",
  "Omar", "Nida", "Hamza", "Rabia", "Saad", "Iqra", "Kashif", "Maham",
  "Talha", "Areeba", "Muneeb", "Anam", "Taimoor", "Maryam", "Daniyal", "Laiba",
  "Huzaifa", "Kiran", "Tayyab", "Ammar", "Sadia", "Nimra", "Farhan", "Shahzaib",
]

const lastNames = [
  "Khan", "Tariq", "Raza", "Noor", "Ahmed", "Aslam", "Malik", "Jamil",
  "Farooq", "Qasim", "Ali", "Yaseen", "Hassan", "Muneer", "Mehmood", "Khalid",
  "Qureshi", "Yousaf", "Rafique", "Nawaz", "Haider", "Bashir", "Sarwar", "Abbasi",
  "Latif", "Siddiqui", "Majid", "Shafiq", "Akram", "Hanif", "Mughal", "Ashraf",
]

const cities = [
  "Faisalabad", "Lahore", "Islamabad", "Multan", "Karachi",
  "Rawalpindi", "Gujranwala", "Sialkot", "Chiniot", "Sargodha",
]

const genders = ["Male", "Female"]

/** Programs available for GCUF registration intake */
const intakeBatches: Array<{
  program: string
  department: string
  session: string
  count: number
  adminUserId?: string
}> = [
  { program: "BSCS",      department: "CS",       session: "2024-2028", count: 40 },
  { program: "BSSE",      department: "CS",       session: "2024-2028", count: 25 },
  { program: "BSBIO",     department: "Biology",  session: "2024-2028", count: 30 },
  { program: "BSPHY",     department: "Physics",  session: "2024-2028", count: 20 },
  { program: "BSMATH",    department: "Math",     session: "2024-2028", count: 20 },
  { program: "BSCHEM",    department: "Chemistry",session: "2024-2028", count: 18 },
  { program: "BSSTAT",    department: "Statistics",session: "2024-2028", count: 15 },
  { program: "BSECON",    department: "Economics",session: "2024-2028", count: 15 },
  { program: "BSENG",     department: "English",  session: "2024-2028", count: 12 },
  { program: "BBA",       department: "Management",session: "2024-2028", count: 20 },
  { program: "BSCS",      department: "CS",       session: "2025-2029", count: 35 },
  { program: "BSSE",      department: "CS",       session: "2025-2029", count: 20 },
  { program: "BSBIO",     department: "Biology",  session: "2025-2029", count: 25 },
]

function pick<T>(items: T[], index: number): T {
  return items[index % items.length]
}

/** Pseudo-random float in [min, max] seeded by index for determinism */
function seededFloat(min: number, max: number, seed: number): number {
  const pseudo = ((seed * 9301 + 49297) % 233280) / 233280
  return Math.round((min + pseudo * (max - min)) * 10) / 10
}

function meritScore(matric: number, fsc: number): number {
  return Math.round((matric * 0.4 + fsc * 0.6) * 10) / 10
}

async function clearRegistrationData(tenantId: string): Promise<void> {
  console.log("  🗑  Clearing existing applicants & import batches for GCUF…")
  await prisma.applicant.deleteMany({ where: { tenantId } })
  await prisma.importBatch.deleteMany({ where: { tenantId } })
}

async function main(): Promise<void> {
  console.log("🌱 Seeding GCUF Registration data…")

  // ── 1. Resolve tenant ────────────────────────────────────────────────────────
  const tenant = await prisma.tenant.findUnique({ where: { slug: TENANT_SLUG } })
  if (!tenant) {
    throw new Error(
      `Tenant "${TENANT_SLUG}" not found. Run "npm run seed" first to create the GCUF tenant.`
    )
  }

  // ── 2. Resolve admin user to use as importedBy ────────────────────────────────
  const adminUser = await prisma.user.findFirst({
    where: { tenantId: tenant.id, role: "ADMIN" },
    select: { id: true, email: true },
  })
  if (!adminUser) {
    throw new Error("No ADMIN user found for GCUF tenant. Run the main seed first.")
  }

  console.log(`  Tenant : ${tenant.name} (${tenant.id})`)
  console.log(`  Admin  : ${adminUser.email}`)

  // ── 3. Clear old registration data ───────────────────────────────────────────
  await clearRegistrationData(tenant.id)

  // ── 4. Seed each intake batch ─────────────────────────────────────────────────
  let totalApplicants = 0
  let globalIndex = 0

  for (const batch of intakeBatches) {
    const batchFileName = `${batch.program}_${batch.session}_intake.csv`

    const importBatch = await prisma.importBatch.create({
      data: {
        tenantId: tenant.id,
        fileName: batchFileName,
        totalCount: batch.count,
        program: batch.program,
        session: batch.session,
        importedBy: adminUser.id,
        importedAt: new Date(
          Date.now() - ((intakeBatches.indexOf(batch) + 1) * 3 * 24 * 60 * 60 * 1000)
        ),
      },
    })

    const applicantRows = []
    for (let i = 0; i < batch.count; i++) {
      const idx = globalIndex + i
      const firstName = pick(firstNames, idx)
      const lastName = pick(lastNames, idx * 3 + 7)
      const fullName = `${firstName} ${lastName}`
      const gender = pick(genders, idx)

      // Spread marks realistically: top programs get slightly higher applicants
      const baseMatric = batch.program === "BSCS" || batch.program === "BSMATH" ? 72 : 65
      const baseFsc   = batch.program === "BSCS" || batch.program === "BSMATH" ? 70 : 63

      const matricPercent = seededFloat(baseMatric, 97.5, idx * 7 + 3)
      const fscPercent    = seededFloat(baseFsc,    98.0, idx * 13 + 5)
      const merit         = meritScore(matricPercent, fscPercent)

      applicantRows.push({
        tenantId: tenant.id,
        importBatchId: importBatch.id,
        fullName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${idx + 1}@gmail.com`,
        phone: `030${String(Math.abs((idx * 9301 + 49297) % 100000000)).padStart(8, "0")}`,
        program: batch.program,
        department: batch.department,
        session: batch.session,
        matricPercent,
        fscPercent,
        meritScore: merit,
        gender,
        city: pick(cities, idx * 2 + 1),
        importedAt: importBatch.importedAt,
      })
    }

    await prisma.applicant.createMany({ data: applicantRows })
    console.log(`  ✓  ${batch.count.toString().padStart(3)} applicants → ${batchFileName}`)
    totalApplicants += batch.count
    globalIndex += batch.count
  }

  // ── 5. Summary ────────────────────────────────────────────────────────────────
  console.log("\n✅ Registration seed complete.")
  console.log(`   Import batches : ${intakeBatches.length}`)
  console.log(`   Total applicants: ${totalApplicants}`)
  console.log(`   Sessions covered: 2024-2028, 2025-2029`)
  console.log(`   Programs covered: ${[...new Set(intakeBatches.map(b => b.program))].join(", ")}`)
}

main()
  .catch((error) => {
    console.error("❌ Registration seed failed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
