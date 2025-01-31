import type {H3Event} from 'h3';
import {defineEventHandler, getQuery} from 'h3';
import {prisma} from '../db/connection';

export default defineEventHandler(async (event: H3Event) => {
  const {userId, fullData} = getQuery(event);

  if (!userId) {
    throw createError({statusCode: 400, message: "ID  manquant."});
  }

  try {
    const favoris = await prisma.users_Favoris.findMany({
      where: {ID_user: Number(userId)}, select: {ID_plat: true, ID_aliment: true},
    });

    console.log(favoris);

    const idsPlats = favoris.filter(f => f.ID_plat).map(f => f.ID_plat as number);
    const idsAliments = favoris.filter(f => f.ID_aliment).map(f => f.ID_aliment as number);

    if (fullData) {
      const [plats, aliments] = await Promise.all([prisma.plats.findMany({
        where: {ID_plat: {in: idsPlats}},
        include: {Plats_Categories: true}
      },), prisma.aliments.findMany({where: {ID_aliment: {in: idsAliments}}}),]);

      console.log(plats);
      console.log(aliments);

      return [...plats.map(p => ({...p, type: 'plat', ID: p.ID_plat, nom_categorie: p.Plats_Categories?.nom || 'Catégorie inconnue'})), ...aliments.map(a => ({
        ...a,
        type: 'aliment',
        ID: a.ID_aliment
      }))];
    }

    return favoris.map(fav => ({ID_item: fav.ID_plat || fav.ID_aliment}));
  } catch (error) {
    throw createError({statusCode: 500, message: "Erreur lors de la récupération des favoris."});
  }
});
