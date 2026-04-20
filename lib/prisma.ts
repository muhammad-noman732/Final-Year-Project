
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient;
    pgPool: Pool;
};

if (!globalForPrisma.pgPool) {
    globalForPrisma.pgPool = new Pool({
        connectionString: process.env.DATABASE_URL!,
    });
}

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: new PrismaPg(globalForPrisma.pgPool),
        log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;