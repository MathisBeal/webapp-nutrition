import { defineEventHandler, createError } from "h3";
import { prisma } from "../db/connection";
import type { Plats } from "@prisma/client";
import getUserSession from "../api/auth/session";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session) {
    throw createError({ statusCode: 401, message: "Non connecté." });
  }

  const userRestrictions = await prisma.users_restrictions.findMany({
    where: { ID_user: session.userId as any },
    select: { ID_restriction: true },
  });
  const restrictionIds = userRestrictions.map((r) => r.ID_restriction);

  const plats = await prisma.plats.findMany({
    where:
      restrictionIds.length > 0
        ? {
            Ingredients_Recettes: {
              none: {
                Aliments: {
                  Restrictions_aliments: {
                    some: {
                      ID_restriction: { in: restrictionIds },
                    },
                  },
                },
              },
            },
          }
        : {},
    select: {
      ID_plat: true,
      duree: true,
      description: true,
      etapes: true,
      images: true,
      ID_categorie: true,
      Plats_Categories: {
        select: {
          nom: true,
        },
      },
    },
  });

  const result = plats.map((plat) => ({
    ...plat,
    nom_categorie: plat.Plats_Categories?.nom || null,
    Plats_Categories: undefined,
  }));

  return result as Array<
    Omit<Plats, "Plats_Categories"> & { nom_categorie: string | null }
  >;
});
