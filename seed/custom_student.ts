import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding custom student: student@gmail.com");

  const tenant = await prisma.tenant.findUnique({ where: { slug: "gcuf" } });
  if (!tenant) throw new Error("GCUF tenant not found. Please run main seed first.");

  const department = await prisma.department.findFirst({
    where: { tenantId: tenant.id, code: "CS" },
  });
  if (!department) throw new Error("CS department not found");

  const program = await prisma.program.findFirst({
    where: { tenantId: tenant.id, departmentId: department.id, code: "BSCS-CS" },
  });
  if (!program) throw new Error("BSCS program not found");

  const session = await prisma.academicSession.findFirst({
    where: { tenantId: tenant.id, isCurrent: true },
  });
  if (!session) throw new Error("Current session not found");

  const passwordHash = await bcrypt.hash("Noman@123", 12);
  const email = "student@gmail.com";

  // Create or update user
  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, isActive: true, role: "STUDENT", tenantId: tenant.id },
    create: {
      email,
      name: "Custom Student",
      passwordHash,
      role: "STUDENT",
      tenantId: tenant.id,
      isActive: true,
      isFirstLogin: false,
    },
  });

  // Create or update student record
  const student = await prisma.student.upsert({
    where: { userId: user.id },
    update: {
      currentSemester: 1,
      totalFeeDue: 40000,
    },
    create: {
      userId: user.id,
      tenantId: tenant.id,
      studentId: "GCUF-CUSTOM-001",
      sessionId: session.id,
      departmentId: department.id,
      programId: program.id,
      currentSemester: 1,
      totalFeeDue: 40000,
      feeStatus: "UNPAID",
    },
  });

  // Ensure fee structure exists for this combination
  let feeStructure = await prisma.feeStructure.findUnique({
    where: {
      tenantId_programId_semester_sessionYear: {
        tenantId: tenant.id,
        programId: program.id,
        semester: 1,
        sessionYear: new Date().getFullYear(),
      },
    },
  });

  if (!feeStructure) {
    feeStructure = await prisma.feeStructure.create({
      data: {
        tenantId: tenant.id,
        programId: program.id,
        semester: 1,
        sessionYear: new Date().getFullYear(),
        tuitionFee: 40000,
        totalFee: 40000,
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isActive: true,
      },
    });
  }

  // Assign fee
  await prisma.feeAssignment.upsert({
    where: {
      studentId_feeStructureId: {
        studentId: student.id,
        feeStructureId: feeStructure.id,
      },
    },
    update: {
      amountDue: 40000,
      status: "UNPAID",
    },
    create: {
      tenantId: tenant.id,
      studentId: student.id,
      feeStructureId: feeStructure.id,
      amountDue: 40000,
      status: "UNPAID",
      dueDate: feeStructure.dueDate,
    },
  });

  console.log("✅ Successfully seeded student@gmail.com with 40000 fee assignment");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
