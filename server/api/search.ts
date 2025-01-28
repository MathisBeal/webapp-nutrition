import { defineEventHandler, getQuery } from 'h3';
import { prisma } from '../db/connection';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search as string | undefined;

  const plats = await prisma.plats.findMany({
    where: search
      ? {
          OR: [
            { description: { contains: search } },
            { Plats_Categories: { nom: { contains: search } } },
          ],
        }
      : undefined,
    select: {
      ID_plat: true,
      duree: true,
      description: true,
      ID_categorie: true,
      Plats_Categories: {
        select: {
          nom: true,
        },
      },
    },
  });


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


  const combinedResults = [
    ...plats.map((plat) => ({
      type: 'plat',
      ID: plat.ID_plat,
      description: plat.description || 'Description non disponible',
      nom_categorie: plat.Plats_Categories?.nom || 'Catégorie inconnue',
      duree: plat.duree || 'Non spécifiée',
      image: '/assets/img/plat.png',
    })),
    ...aliments.map((aliment) => ({
      type: 'aliment',
      ID: aliment.ID_aliment,
      nom: aliment.nom,
      quantite_base: aliment.quantite_base,
      calories: aliment.calories,
      glucides: aliment.glucides,
      lipides: aliment.lipides,
      proteines: aliment.proteines,
      image: aliment.image || '/assets/img/aliment.png',
    })),
  ];


  return combinedResults;
});
