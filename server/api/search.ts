import {defineEventHandler, getQuery} from 'h3';
import {prisma} from '../db/connection';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search as string | undefined;
  const userId = query.userId ? Number(query.userId) : null;

  const plats = await prisma.plats.findMany({
    where: search
      ? {
        OR: [
          {description: {contains: search}},
          {Plats_Categories: {nom: {contains: search}}},
        ],
      }
      : undefined,
    select: {
      ID_plat: true,
      duree: true,
      description: true,
      ID_categorie: true,
      images: true,
      Plats_Categories: {
        select: {
          nom: true,
        },
      },
    },
  });

  console.log(plats);


  const aliments = await prisma.aliments.findMany({
    where: search
      ? {
        nom: {contains: search},
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


  const favoris = userId
    ? await prisma.users_Favoris.findMany({
      where: {ID_user: Number(userId)},
      select: {ID_plat: true, ID_aliment: true},
    })
    : [];

  const favoriIds = new Set(favoris.map(fav => fav.ID_plat || fav.ID_aliment));

  const combinedResults = [
    ...plats.map((plat) => ({
      type: 'plat',
      ID_plat: plat.ID_plat,
      ID: plat.ID_plat,
      description: plat.description || 'Description non disponible',
      nom_categorie: plat.Plats_Categories?.nom || 'Catégorie inconnue',
      duree: plat.duree || 'Non spécifiée',
      images: plat.images,
      isFavori: favoriIds.has(plat.ID_plat),
    })),
    ...aliments.map((aliment) => ({
      type: 'aliment',
      ID_aliment: aliment.ID_aliment,
      ID: aliment.ID_aliment,
      nom: aliment.nom,
      quantite_base: aliment.quantite_base,
      calories: aliment.calories,
      glucides: aliment.glucides,
      lipides: aliment.lipides,
      proteines: aliment.proteines,
      image: aliment.image || '/assets/img/aliment.png',
      isFavori: favoriIds.has(aliment.ID_aliment),
    })),
  ];


  return combinedResults;
});
