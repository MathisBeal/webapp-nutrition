import { prisma } from '../db/connection';

export default defineEventHandler(async (event) => {
  try {
    // Récupérer tous les champs 'nom' de la table Restriction_Types
    const restrictions = await prisma.restriction_Types.findMany({
      select: {
        nom: true, // On récupère uniquement les noms
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
