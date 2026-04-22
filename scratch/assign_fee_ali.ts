import { PrismaClient } from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function assign() {
  const studentRoll = "229876";
  const tenantId = "cmnlep68k0001vgw2g808qu0i"; // From check_db.ts: Univerity of agriculture Faisalabad

  console.log(`> Finding student with roll number: ${studentRoll}`);
  const student = await prisma.student.findFirst({
    where: { studentId: studentRoll, tenantId },
    include: { user: true }
  });

  if (!student) {
    console.error(`❌ Student with roll ${studentRoll} not found!`);
    return;
  }

  console.log(`> Found student: ${student.user.name} (${student.id})`);
  console.log(`> Ensuring student is ACTIVE (status: ${student.enrollmentStatus})`);

  if (student.enrollmentStatus !== "ACTIVE") {
    await prisma.student.update({
      where: { id: student.id },
      data: { enrollmentStatus: "ACTIVE" }
    });
    console.log(`> Updated enrollmentStatus to ACTIVE`);
  }

  console.log(`> Finding BSCS Semester 1 fee structure for tenant: ${tenantId}`);
  const feeStructure = await prisma.feeStructure.findFirst({
    where: {
      tenantId,
      program: { code: "BSCS" },
      semester: 1,
      isActive: true
    },
    orderBy: { createdAt: "desc" }
  });

  if (!feeStructure) {
    console.error(`❌ Fee structure for BSCS Semester 1 not found!`);
    return;
  }

  console.log(`> Found fee structure: ${feeStructure.id} (Total: ${feeStructure.totalFee})`);

  console.log(`> Checking if fee is already assigned...`);
  const existing = await prisma.feeAssignment.findUnique({
    where: {
      studentId_feeStructureId: {
        studentId: student.id,
        feeStructureId: feeStructure.id
      }
    }
  });

  if (existing) {
    console.log(`> Fee already assigned to ${student.user.name}. Skipping.`);
    return;
  }

  console.log(`> Assigning fee to ${student.user.name}...`);
  await prisma.feeAssignment.create({
    data: {
      tenantId,
      studentId: student.id,
      feeStructureId: feeStructure.id,
      amountDue: feeStructure.totalFee,
      amountPaid: 0,
      lateFeeApplied: 0,
      discountApplied: 0,
      status: "UNPAID",
      dueDate: feeStructure.dueDate
    }
  });

  console.log(`✅ Success! Fee assigned to ${student.user.name} (${studentRoll}).`);
}

assign()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
