import { defineEventHandler, getQuery } from 'h3';
import { prisma } from '../db/connection';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await prisma.users_Alimentations.create({
    data: {
      ID_user: body.ID_user,
      ID_plat: body.ID_plat,
      ID_aliment: body.ID_aliment,
      ID_moment: body.ID_moment,
      Quantite: body.Quantite || 1,
      date: new Date(),
    },
  });
});
