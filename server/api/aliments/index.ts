import {prisma} from '../../db/connection';

export default defineEventHandler(async () => {
  return prisma.aliments.findMany();
});
