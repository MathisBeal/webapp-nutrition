import { defineEventHandler } from 'h3';
import { createPool } from 'mysql2/promise';

export default defineEventHandler(async () => {

  const pool = createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
  });

  const [rows] = await pool.query('SELECT * FROM aliment');

  return rows;
});
