import {prisma} from '../../../db/connection';

export default defineEventHandler(async (route) => {

  const params = route.context.params;

  if (params && params.id_aliment) {
    if (useAppConfig().debug) {
      console.log(typeof params.id_recipe, ":", params.id_recipe);
    }

    const id_aliment = Number.parseInt(params.id_aliment);

    // const aliment_info = await prisma.aliments.findUnique({
    //   where: {
    //     ID_aliment: id_aliment,
    //   }
    // })
    //
    // return aliment_info;
    //
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
