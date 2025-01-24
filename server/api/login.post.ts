import { z } from 'zod'

//garantit la validité des données
const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  if (email === 'admin@admin.com' && password === 'iamtheadmin') {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        name: 'Romain MALOSSE',
        age: 21,
        email: 'romain.malosse43@icloud.com',
        role: 'admin',
        ddn: '26-01-2004'
      }
    })
    return {}
  }
  throw createError({
    statusCode: 401,
    message: 'T as tout cassé chef'
  })
})
