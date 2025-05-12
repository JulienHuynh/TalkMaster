import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: 'hugo@example.com',
            password: 'secret',
            firstName: 'Hugo',
            lastName: 'Dev'
        }
    })

    const allUsers = await prisma.user.findMany()
    console.dir(allUsers, { depth: null })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })