import { PrismaClient } from "./app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.deleteMany({
    where: { email: 'student@gmail.com' }
  });
  console.log("Deleted student@gmail.com");
}

main().finally(() => prisma.$disconnect());
