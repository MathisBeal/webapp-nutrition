import { defineEventHandler, readValidatedBody } from 'h3';
import { prisma } from '../db/connection';
import { z } from 'zod';

const validationSchema = z.object({
  ID_user: z.number(),
  ID_plat: z.number().nullable(),
  ID_aliment: z.number().nullable(),
  ID_moment: z.number(),
  Quantite: z.number().optional(),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (data) => validationSchema.parse(data));

  return await prisma.users_Alimentations.create({
    data: {
      ID_user: body.ID_user,
      ID_plat: body.ID_plat ?? null,
      ID_aliment: body.ID_aliment,
      ID_moment: body.ID_moment,
      Quantite: body.Quantite || 1,
      date: new Date(),
    },
  });
});
