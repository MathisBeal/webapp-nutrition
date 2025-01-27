import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Récupérer les données du corps de la requête
  const body = await readBody(event);
  const { nom, prenom, mail, password, age, taille, poids, sexe, imc } = body;

  // Log des données reçues
  console.log("Données reçues dans le backend : ", body);

  // Validation des champs
  if (!nom || !prenom || !mail || !password || !age || !taille || !poids || !sexe || !imc) {
    console.error("Erreur de validation : Données manquantes");
    throw createError({
      statusCode: 400,
      message: 'Veuillez remplir tous les champs.',
    });
  }

  try {
    // // Vérifier si l'utilisateur existe déjà avec le mail unique
    // const existingUser = await prisma.users.findUnique({
    //   where: { mail },
    // });

    // if (existingUser) {
    //   console.error("L'utilisateur existe déjà : ", existingUser);
    //   throw createError({
    //     statusCode: 400,
    //     message: 'Email déjà utilisé.',
    //   });
    // }

    // Hacher le mot de passe
    console.log("Hachage du mot de passe...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = await prisma.users.create({
      data: {
        nom,
        prenom,
        mail,
        password: hashedPassword, // Stocker le mot de passe haché
        age,
        taille,
        poids,
        sexe,
        imc,
      },
    });

    // Log de l'utilisateur créé
    console.log("Utilisateur créé : ", user);

    return {
      message: 'Utilisateur créé avec succès.',
      user: {
        ID_user: user.ID_user,
        nom: user.nom,
        prenom: user.prenom,
        mail: user.mail, // Ne pas renvoyer le mot de passe
      },
    };
  } catch (error) {
    console.error("Erreur lors de la création de l’utilisateur : ", error);
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la création de l’utilisateur.',
    });
  }
});
