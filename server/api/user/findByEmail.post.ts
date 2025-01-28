import { prisma } from '~/server/db/connection';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Vérifier si l'email existe
    const existingUser = await prisma.users.findUnique({
      where: {
        mail: body.email,
      },
    });

    // Retourner une réponse
    if (existingUser) {
      return {
        exists: true,
        message: "Cet e-mail est déjà utilisé.",
      };
    } else {
      return {
        exists: false,
        message: "Cet e-mail est disponible.",
      };
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'e-mail :", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur serveur lors de la vérification de l'e-mail.",
    });
  }
});
