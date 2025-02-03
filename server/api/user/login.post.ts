import { prisma } from '~/server/db/connection';
import { compare } from 'bcrypt';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(4, { message: "Le mot de passe doit contenir au moins 4 caractères." }),
});

export default defineEventHandler(async (event) => {
  try {
    // Validation des données d'entrée avec zod
    const { email, password } = await readValidatedBody(event, (data) => loginSchema.parse(data));

    // Chercher l'utilisateur dans la base de données par email
    const user = await prisma.users.findUnique({
      where: { mail: email },
    });

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
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
    // Gestion des erreurs : vérifier si c'est une erreur de validation Zod
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: error.errors[0].message, // Prendre le premier message d'erreur
      });
    }

    // Relever une erreur générique
    return sendError(event, error as Error);
  }
});
