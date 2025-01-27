import { defineEventHandler } from 'h3';
import { prisma } from '../db/connection';

export default defineEventHandler(async () => {
  const aliments = await prisma.aliments.findMany();

  return aliments;
});
