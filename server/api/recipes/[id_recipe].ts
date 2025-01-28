import {prisma} from '../../db/connection';

export default defineEventHandler(async (route) => {

  const params = route.context.params;

  if (params && params.id_recipe) {
    // console.log(typeof params.id_recipe, ":", params.id_recipe);

    const id_recipe = Number.parseInt(params.id_recipe);

    const recipe_info = await prisma.plats.findUnique({
      where: {
        ID_plat: id_recipe,
      }
    })

    const ingredients = await prisma.ingredients_Recettes.findMany({
      where: {
        ID_plat: id_recipe,
      },
      include: {
        Aliments: true,
      }
    })

    return {recipe_info, ingredients};

  } else {
    throw new Error("Recipe ID not found in params")
  }
});
