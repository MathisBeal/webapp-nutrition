import { prisma } from '~/server/db/connection';
import { cryptPassword } from '~/utils/cryptPassword';
import { z } from 'zod';

const userSchema = z.object({
  nom: z.string().min(1, { message: "Le nom est requis." }),
  prenom: z.string().min(1, { message: "Le prénom est requis." }),
  mail: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(4, { message: "Le mot de passe doit contenir au moins 4 caractères." }),
  age: z.number().int().positive(),
  taille: z.number().positive(),
  poids: z.number().positive(),
  sexe: z.enum(['Homme', 'Femme', 'Autre']),
  imc: z.number().positive(),
});

export default defineEventHandler(async (event) => {
  try {
    // Validation du corps de la requête avec Zod
    const { nom, prenom, mail, password, age, taille, poids, sexe, imc } = await readValidatedBody(event, (data) => userSchema.parse(data));

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

    // Gestion des erreurs de validation Zod
    if (error instanceof z.ZodError) {
      throw createError({ statusCode: 400, message: error.errors[0].message });
    }

    // Erreur générique serveur
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la création de l’utilisateur.',
    });
  }
});
