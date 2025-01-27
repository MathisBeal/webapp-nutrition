import { PrismaClient } from '@prisma/client'

const config = useRuntimeConfig()

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.DATABASE_URL,
    },
  },
})

const check_connectDB = async () => {
  try {
    await prisma.$connect()
    console.log('Prisma connected to MySQL')
    return prisma;
  } catch (err) {
    console.error('Prisma connection error:', err)
    process.exit(1)
  }
}

export { prisma, check_connectDB }
