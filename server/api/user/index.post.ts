import { prisma } from '~/server/db/connection';
import { cryptPassword } from '~/utils/cryptPassword';

export default defineEventHandler(async (event) => {
  // Récupérer les données du corps de la requête
  const body = await readBody(event);
  const { nom, prenom, mail, password, age, taille, poids, sexe, imc } = body;

  // Validation des champs
  if (!nom || !prenom || !mail || !password || !age || !taille || !poids || !sexe || !imc) {
    throw createError({
      statusCode: 400,
      message: 'Veuillez remplir tous les champs.',
    });
  }

  try {
    // Vérifier si l'utilisateur existe déjà avec le mail unique
    const existingUser = await prisma.users.findUnique({
      where: { mail },
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Il semblerait que vous avez déjà un compte.',
      });
    }

    // Hasher le mot de passe
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

    // Répondre avec l'utilisateur créé (sans renvoyer le mot de passe)
    return {
      message: 'Utilisateur créé avec succès.',
      user: {
        ID_user: user.ID_user,
        nom: user.nom,
        prenom: user.prenom,
        mail: user.mail,
      },
    };
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur :', error);

    // Relever une erreur générique côté client
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la création de l’utilisateur.',
    });
  }
});
