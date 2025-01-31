import { prisma } from '~/server/db/connection';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
});

export default defineEventHandler(async (event) => {
  try {
    // Validation du corps de la requête avec Zod
    const { email } = await readValidatedBody(event, (data) => emailSchema.parse(data));

    // Vérifier si l'email existe dans la base de données
    const existingUser = await prisma.users.findUnique({
      where: { mail: email },
    });

    // Retourner une réponse
    return existingUser
      ? { exists: true, message: "Cet e-mail est déjà utilisé." }
      : { exists: false, message: "Cet e-mail est disponible." };

  } catch (error) {
    console.error("Erreur lors de la vérification de l'e-mail :", error);

    // Gérer proprement les erreurs de validation Zod
    if (error instanceof z.ZodError) {
      throw createError({ statusCode: 400, statusMessage: error.errors[0].message });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Erreur serveur lors de la vérification de l'e-mail.",
    });
  }
});
