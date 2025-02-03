import { PrismaClient } from '@prisma/client';
import { readValidatedBody } from 'h3';
import { z } from 'zod';

const prisma = new PrismaClient();

const restrictionSchema = z.object({
  restrictions: z.array(z.string()).nonempty({ message: "La liste des restrictions ne peut pas être vide." }),
});

export default defineEventHandler(async (event) => {
  try {
    // Validation du corps de la requête avec Zod
    const { restrictions } = await readValidatedBody(event, (body) => restrictionSchema.parse(body));

    console.log("Restrictions reçues du frontend:", restrictions);

    // Recherche des restrictions en base de données
    const restrictionIds = await prisma.restriction_Types.findMany({
      where: { nom: { in: restrictions } },
      select: { ID_restriction: true },
    });

    console.log("Restrictions trouvées dans la base de données:", restrictionIds);

    return {
      success: true,
      data: restrictionIds.map((r) => r.ID_restriction),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des IDs des restrictions :", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message, // Retourne le premier message d'erreur de validation
      };
    }

    return {
      success: false,
      message: "Une erreur est survenue lors de la récupération des IDs des restrictions.",
    };
  }
});
