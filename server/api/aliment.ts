import { defineEventHandler } from 'h3';
import { pool } from '../db/connection';

export default defineEventHandler(async () => {
  const [rows] = await pool.query('SELECT * FROM aliment');

  return rows;
});
