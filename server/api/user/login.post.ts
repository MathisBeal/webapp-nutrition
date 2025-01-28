import { prisma } from '../../db/connection';
import { compare } from 'bcrypt';
import { createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    console.log('body', body);

    // Vérification des champs
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Veuillez remplir tous les champs.',
      });
    }

    // Recherche de l'utilisateur dans la base de données
    const user = await prisma.users.findUnique({
      where: { mail: email },
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect.',
      });
    }

    // Vérification du mot de passe
    const isPasswordValid = await compare(password, user.password);
    console.log('password', password);
    console.log('user password', user.password);
    console.log('isPasswordValid', isPasswordValid);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Email ou mot de passe incorrect.',
      });
    }

    // Connexion réussie
    return {
      success: true,
      message: 'Connexion réussie.',
    };
  } catch (error: unknown) {
    // Gestion des erreurs inconnues
    if (!(error instanceof Error)) {
      error = createError({
        statusCode: 500,
        message: 'Erreur interne du serveur.',
      });
    }
    return sendError(event, error as Error);
  }
});
