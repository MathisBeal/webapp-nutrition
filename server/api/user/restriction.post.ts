import { PrismaClient } from '@prisma/client';
import { readValidatedBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { restrictions } = await readValidatedBody(event, (body) => {
      if (!body.restrictions || !Array.isArray(body.restrictions)) {
        throw createError({ statusCode: 400, message: "Les restrictions doivent être une liste." });
      }
      return body;
    });

    console.log("Restrictions reçues du frontend:", restrictions);
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
    return {
      success: false,
      message: "Une erreur est survenue lors de la récupération des IDs des restrictions.",
    };
  }
});
