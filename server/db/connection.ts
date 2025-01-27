import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const check_connectDB = async () => {
  try {
    await prisma.$connect()
    console.log('Prisma connected to MySQL')
    return prisma;
    await prisma.$connect()
    console.log('Prisma connected to MySQL')
    return prisma;
  } catch (err) {
    console.error('Prisma connection error:', err)
    console.error('Prisma connection error:', err)
    process.exit(1)
  }
}

export { prisma, check_connectDB }
export { prisma, check_connectDB }
