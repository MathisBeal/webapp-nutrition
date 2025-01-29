import {prisma} from '../../db/connection';

export default defineEventHandler(async (route) => {

  const params = route.context.params;

  if (params && params.id_aliment) {
    // console.log(typeof params.id_recipe, ":", params.id_recipe);

    const id_aliment = Number.parseInt(params.id_aliment);

    const aliment_info = await prisma.aliments.findUnique({
      where: {
        ID_aliment: id_aliment,
      }
    })

    return aliment_info;

  } else {
    throw new Error("Aliment ID not found in params")
  }
});
