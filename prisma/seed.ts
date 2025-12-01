import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.note.createMany({
    data: [
      { title: 'Welcome', content: 'This is your first note.' },
      { title: 'Second note', content: 'Edit or delete me from the app.' }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
