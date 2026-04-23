import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/app/generated/prisma/client"
import "dotenv/config"

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

async function main() {
  const users = await prisma.user.findMany({
    where: {
      email: {
        in: ["muhammadnomanbaghoor@gmail.com", "iasknoman156@gmail.com", "noman.dev200@gmail.com"],
      },
    },
    select: { email: true, role: true, tenantId: true },
    orderBy: { email: "asc" },
  })

  const tenantStudentCounts = await prisma.student.groupBy({
    by: ["tenantId"],
    _count: { _all: true },
  })

  console.log("Scoped users:", users)
  console.log("Student counts by tenant:", tenantStudentCounts)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => prisma.$disconnect())
