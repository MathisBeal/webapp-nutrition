import { defineEventHandler, getQuery } from 'h3';
import { prisma } from '../db/connection';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search as string | undefined;

  const aliments = await prisma.aliments.findMany({
    where: search
      ? {
          nom: { contains: search },
        }
      : undefined,
    select: {
      ID_aliment: true,
      nom: true,
      quantite_base: true,
      calories: true,
      glucides: true,
      lipides: true,
      proteines: true,
      image: true,
    },
  });

  return aliments;
});
