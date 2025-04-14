import { H3Event, readValidatedBody, createError } from 'h3';
import { z } from 'zod';
import { prisma } from '../db/connection';

// Définition du schéma de validation avec zod
const favorisSchema = z.object({
  ID_user: z.number().int().positive(),  // Un ID utilisateur valide
  ID_item: z.number().int().positive(),  // Un ID d'élément valide
  type: z.enum(['plat', 'aliment']),     // Doit être soit "plat" soit "aliment"
  action: z.enum(['add', 'remove']),     // Action valide ("add" ou "remove")
});

// Fonction de validation compatible avec readValidatedBody
const validateFavoris = (data: unknown) => favorisSchema.parse(data);

export default defineEventHandler(async (event: H3Event) => {
  // Lire et valider le corps de la requête
  const { ID_user, ID_item, type, action } = await readValidatedBody(event, validateFavoris);

  try {
    if (action === "add") {
      await prisma.users_Favoris.create({
        data: {
          ID_user,
          ID_plat: type === 'plat' ? ID_item : null,
          ID_aliment: type === 'aliment' ? ID_item : null,
        },
      });
    } else if (action === "remove") {
      await prisma.users_Favoris.deleteMany({
        where: {
          ID_user,
          ID_plat: type === 'plat' ? ID_item : undefined,
          ID_aliment: type === 'aliment' ? ID_item : undefined,
        },
      });
    }

    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 500, message: "Erreur lors de la mise à jour des favoris." });
  }
});
