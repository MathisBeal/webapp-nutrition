import { defineEventHandler, readBody, getQuery } from 'h3';
import type { H3Event } from 'h3';
import { prisma } from '../db/connection';

export default defineEventHandler(async (event: H3Event) => {
    const method = event.req.method;

    if (method === "POST") {
        return handlePostRequest(event);
    } 
    if (method === "GET") {
        return handleGetRequest(event);
    }

    throw createError({ statusCode: 405, message: "Méthode non autorisée." });
});

const handlePostRequest = async (event: H3Event) => {
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
};

const handleGetRequest = async (event: H3Event) => {
    const { userId, fullData } = getQuery(event);
    if (!userId) {
        throw createError({ statusCode: 400, message: "ID utilisateur manquant." });
    }

    try {
        const favoris = await prisma.users_Favoris.findMany({
            where: { ID_user: Number(userId) },
            select: { ID_plat: true, ID_aliment: true },
        });

        const idsPlats = favoris.filter(f => f.ID_plat).map(f => f.ID_plat as number);
        const idsAliments = favoris.filter(f => f.ID_aliment).map(f => f.ID_aliment as number);

        if (fullData) {
            const [plats, aliments] = await Promise.all([
                prisma.plats.findMany({ where: { ID_plat: { in: idsPlats } } }),
                prisma.aliments.findMany({ where: { ID_aliment: { in: idsAliments } } }),
            ]);

            return [
                ...plats.map(p => ({ ...p, type: 'plat', ID: p.ID_plat })), 
                ...aliments.map(a => ({ ...a, type: 'aliment', ID: a.ID_aliment }))
            ];
        }

        return favoris.map(fav => ({ ID_item: fav.ID_plat || fav.ID_aliment }));
    } catch (error) {
        throw createError({ statusCode: 500, message: "Erreur lors de la récupération des favoris." });
    }
};
