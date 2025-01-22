import mysql from 'mysql2/promise'

const config = useRuntimeConfig()

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.DB_HOST,
      port: Number(config.DB_PORT),
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
    })
    console.log('MySQL connected')
    return connection
  } catch (err) {
    console.error('MySQL connection error:', err)
    process.exit(1)
  }
}

export default connectDB
