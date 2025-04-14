import { defineEventHandler, getQuery } from 'h3';
import type { H3Event } from 'h3';
import { prisma } from '../db/connection';
export default defineEventHandler(async () => {
  return await prisma.day_Sections.findMany();
});
