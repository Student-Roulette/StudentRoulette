import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.event.create({
      data: {
        title: "Social Coding grind sesh",
        description: "Have to get the 90 hrs/wk",
        author: {
          create: {
            email: "fufa0001@gmail.com",
            name: "Sasha Hydrie"
          }
        },
      }
  })

  const allEvents = await prisma.event.findMany({
    include: {
      author: true,
    },
  });

  console.dir(allEvents, { depth: null });
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

