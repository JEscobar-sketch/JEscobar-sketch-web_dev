const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.note.count()
  if (count > 0) {
    console.log('seeding skipped — notes already exist')
    return
  }

  await prisma.note.createMany({
    data: [
      { title: 'Welcome', content: 'This is your first note.' },
      { title: 'Second note', content: 'Edit or delete me from the app.' }
    ]
  })

  console.log('seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
