import connectDB from '../server/db/index'

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    const connection = await connectDB()
    expect(connection).toBeDefined()
    await connection.end()
  })
})
