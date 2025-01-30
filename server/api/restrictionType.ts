import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Récupérer tous les champs 'nom' de la table Restriction_Types
    const restrictions = await prisma.restriction_Types.findMany({
      select: {
        nom: true,
      },
    });
    return {
      success: true,
      data: restrictions.map((restriction) => restriction.nom),
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des noms :', error);
    return {
      success: false,
      message: 'Une erreur est survenue lors de la récupération des données.',
    };
  }
});
