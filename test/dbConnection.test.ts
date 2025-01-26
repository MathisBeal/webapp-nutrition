import { check_connectDB } from '../server/db/connection'

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    const connection = await check_connectDB()
    expect(connection).toBeDefined()
    connection.$disconnect()
  })
})
