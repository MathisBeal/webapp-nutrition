import { prisma } from '../../db/connection';
import { compare } from 'bcrypt';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Veuillez remplir tous les champs.',
      });
    }

    const user = await prisma.users.findUnique({
      where: { mail: email },
    });

    if (!user || !(await compare(password, user.password))) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect.',
      });
    }

    // Créer la session utilisateur
    const userSession = {
      userId: user.ID_user,
      email: user.mail,
    };

    await setUserSession(event, userSession);

    return {
      success: true,
      message: 'Connexion réussie.',
    };
  } catch (error) {
    return sendError(event, error as Error);
  }
});
