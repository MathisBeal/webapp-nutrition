import { prisma } from '~/server/db/connection';
import { useCryptage } from '~/composables/cryptage';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { nom, prenom, mail, password, age, taille, poids, sexe, imc, restrictionsIds } = body;

    console.log("Données reçues du frontend:", body);

    if (!nom || !prenom || !mail || !password || !age || !taille || !poids || !sexe || !imc) {
      throw createError({
        statusCode: 400,
        message: "Veuillez remplir tous les champs.",
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.users.findUnique({ where: { mail } });
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Il semblerait que vous avez déjà un compte.",
      });
    }

    // Hasher le mot de passe
    const { cryptPassword } = useCryptage();
    const hashedPassword = await cryptPassword(password);

    // Créer l'utilisateur
    const user = await prisma.users.create({
      data: {
        nom,
        prenom,
        mail,
        password: hashedPassword,
        age,
        taille,
        poids,
        sexe,
        imc,
      },
    });

    console.log("Utilisateur créé avec succès, ID:", user.ID_user);


    if (restrictionsIds && restrictionsIds.length > 0) {
      const userRestrictions = restrictionsIds.map((id) => ({
        ID_user: user.ID_user,
        ID_restriction: id,
      }));

      console.log("Données des restrictions à insérer:", userRestrictions);

      await prisma.users_restrictions.createMany({ data: userRestrictions });
      console.log("Restrictions insérées avec succès.");
    } else {
      console.warn("⚠️ Aucune restriction sélectionnée.");
    }

    return {
      message: "Utilisateur créé avec succès.",
      user: {
        ID_user: user.ID_user,
        nom: user.nom,
        prenom: user.prenom,
        mail: user.mail,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la création de l’utilisateur :", error);
    throw createError({
      statusCode: 500,
      message: "Erreur lors de la création de l’utilisateur.",
    });
  }
});
