import { defineEventHandler, readBody } from 'h3';
import type { H3Event } from 'h3';
import { prisma } from '../db/connection';

export default defineEventHandler(async (event: H3Event) => {
    const { ID_user, ID_item, type, action } = await readBody(event);

    if (!ID_user || !ID_item || !type) {
        throw createError({ statusCode: 400, message: "Données invalides." });
    }

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
