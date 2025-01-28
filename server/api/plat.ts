import { defineEventHandler } from 'h3';
import { prisma } from '../db/connection';
import type { Plats } from '@prisma/client';

export default defineEventHandler(async () => {
  const plats = await prisma.plats.findMany({
    select: {
      ID_plat: true,
      duree: true,
      description: true,
      etapes: true,
      images: true,
      ID_categorie: true, 
      Plats_Categories: {
        select: {
          nom: true,
        },
      },
    },
  });

  const result = plats.map((plat) => ({
    ...plat,
    nom_categorie: plat.Plats_Categories?.nom || null,
    Plats_Categories: undefined, 
  }));

  return result as Array<Omit<Plats, 'Plats_Categories'> & { nom_categorie: string | null }>;
});
