import { ref } from 'vue';

// Déclarez l'état en dehors de la fonction
const userData = ref({
  nom: null as string | null,
  prenom: null as string | null,
  mail: null as string | null,
  password: null as string | null,
  age: null as number | null,
  sexe: null as string | null,
  taille: null as number | null,
  poids: null as number | null,
  imc: null as number | null,
});

// Exportez la fonction pour accéder à l'état partagé
export const useUserData = () => {
  return { userData };
};
