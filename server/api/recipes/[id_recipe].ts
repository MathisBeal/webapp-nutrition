import {pool} from '../../db/connection';

export default defineEventHandler(async (route) => {

  const params = route.context.params;

  if (params && params.id_recipe) {
    console.log("YEET")
    console.log(params.id_recipe)
    console.log(typeof params.id_recipe)
    const [rows] = await pool.query('SELECT * FROM Plats INNER JOIN Ingredients_Recettes ON Plats.ID_plat = Ingredients_Recettes.ID_plat INNER JOIN Aliments ON Ingredients_Recettes.ID_aliment = Aliments.ID_aliment WHERE Plats.ID_plat = ?', [params.id_recipe]);
    return rows;
  } else {
    throw new Error("Recipe ID not found in params")
  }
});
