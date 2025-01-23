import mysql from 'mysql2/promise'

const config = useRuntimeConfig()

// Objet à utiliser pour accéder à la DB
const pool = mysql.createPool({
      host: config.DB_HOST,
      port: Number(config.DB_PORT),
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      charset: 'utf8mb4',
    });

// Fonction pour vérifier la connexion à la DB
const check_connectDB = async () => {
  try {
    const connection = await pool.getConnection()
    console.log('MySQL connected')
    return connection
  } catch (err) {
    console.error('MySQL connection error:', err)
    process.exit(1)
  }
}

export {check_connectDB, pool}
