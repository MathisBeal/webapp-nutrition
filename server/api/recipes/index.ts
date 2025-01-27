import {pool} from '../../db/connection';

export default defineEventHandler(async () => {
  const [rows] = await pool.query('SELECT * FROM Plats\n' +
    'INNER JOIN Ingredients_Recettes ON Plats.ID_plat = Ingredients_Recettes.ID_plat\n' +
    'INNER JOIN Aliments ON Ingredients_Recettes.ID_aliment = Aliments.ID_aliment');

  return rows;
});
