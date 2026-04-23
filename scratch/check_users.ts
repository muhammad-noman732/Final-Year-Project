import bcrypt from "bcryptjs"
import { PrismaClient, Role } from "../app/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const emailsToCheck = ["noman.dev", "muhammadnomanbaghoor@gmail.com"]
  
  console.log("--- Checking for users ---")
  for (const email of emailsToCheck) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: email, mode: 'insensitive' } },
          { email: { startsWith: email, mode: 'insensitive' } }
        ]
      }
    })
    if (user) {
      console.log(`Found user: ${user.email} (Role: ${user.role})`)
    } else {
      console.log(`User not found: ${email}`)
    }
  }
  
  const tenant = await prisma.tenant.findUnique({
    where: { slug: "gcuf" }
  })
  
  if (tenant) {
    console.log(`Found tenant: ${tenant.name} (${tenant.slug})`)
  } else {
    console.log("Tenant 'gcuf' not found")
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
