import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const allEvents = await prisma.event.findMany()
  console.log(allEvents)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

