import { PrismaClient } from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function fixStuckPayments() {
  const studentId = "cmo96tgf20004y0w24qe8tidw"; // ali

  console.log("> Finding all PENDING payments for ali...");
  const pendingPayments = await prisma.payment.findMany({
    where: {
      studentId,
      status: "PENDING",
      stripePaymentIntentId: { not: null },
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(`> Found ${pendingPayments.length} pending payment(s)`);

  for (const payment of pendingPayments) {
    console.log(`> Fulfilling payment ${payment.id} (PI: ${payment.stripePaymentIntentId})...`);
    
    // Mark payment as COMPLETED
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "COMPLETED",
        paidAt: new Date(),
      },
    });

    // Mark the fee assignment as PAID
    await prisma.feeAssignment.update({
      where: { id: payment.feeAssignmentId },
      data: {
        status: "PAID",
        amountPaid: payment.amount,
        paidAt: new Date(),
      },
    });

    console.log(`  ✅ Payment ${payment.id} marked COMPLETED, assignment marked PAID`);
  }

  console.log("\n🎉 Done! All stuck payments have been fulfilled.");
}

fixStuckPayments()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
