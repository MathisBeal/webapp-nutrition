import {prisma} from '../../../db/connection';

export default defineEventHandler(async (route) => {

  const params = route.context.params;

  if (params && params.id_aliment) {
    const id_aliment = Number.parseInt(params.id_aliment);

    const linked_recipes = await prisma.ingredients_Recettes.findMany({
      where: {ID_aliment: id_aliment},
      select: {
        ID_plat: true,
        Plats: {
          select: {
            duree: true,
            description: true,
            images: true,
            Plats_Categories: {
              select: {
                nom: true,
              }
            }
          },
        }
      }
    });

    return linked_recipes;

  } else {
    throw new Error("Aliment ID not found in params")
  }
});
