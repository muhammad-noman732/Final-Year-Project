import { PrismaClient } from "./app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'student@gmail.com' }
  });
  if (user && user.tenantId) {
    await prisma.student.updateMany({
      where: { userId: user.id },
      data: { tenantId: user.tenantId }
    });
    
    const student = await prisma.student.findUnique({ where: { userId: user.id }});
    
    if (student) {
      await prisma.feeAssignment.updateMany({
        where: { studentId: student.id },
        data: { tenantId: user.tenantId }
      });
      await prisma.payment.updateMany({
        where: { studentId: student.id },
        data: { tenantId: user.tenantId }
      });
    }
    console.log("Fixed tenant mismatch for student@gmail.com");
  }
}

main().finally(() => prisma.$disconnect());
