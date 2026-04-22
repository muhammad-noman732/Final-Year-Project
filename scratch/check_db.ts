import { PrismaClient } from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function check() {
  const tenants = await prisma.tenant.findMany();
  const depts = await prisma.department.findMany();
  const progs = await prisma.program.findMany();
  const sessions = await prisma.academicSession.findMany();
  const feeStructures = await prisma.feeStructure.findMany();
  const students = await prisma.student.findMany({
    include: { user: true }
  });

  console.log("Tenants:", JSON.stringify(tenants, null, 2));
  console.log("Departments:", JSON.stringify(depts, null, 2));
  console.log("Programs:", JSON.stringify(progs, null, 2));
  console.log("Sessions:", JSON.stringify(sessions, null, 2));
  console.log("Fee Structures:", JSON.stringify(feeStructures, null, 2));
  console.log("Students:", JSON.stringify(students.map(s => ({ id: s.id, roll: s.studentId, email: s.user.email })), null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
