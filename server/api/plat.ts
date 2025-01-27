import { defineEventHandler } from 'h3';
import { pool } from '../db/connection';

export default defineEventHandler(async () => {
  const [rows] = await pool.query(`
    SELECT Plats.*, Plats_Categories.nom AS nom_categorie
    FROM Plats
    JOIN Plats_Categories ON Plats.ID_categorie = Plats_Categories.ID_categorie
  `); 

  return rows;
});
