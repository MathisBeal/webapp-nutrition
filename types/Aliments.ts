export interface LinkedRecipe {
  ID_plat: number;
  description: string;
  images: string | null;
  duree: string;
  nom_categorie: string;
}

export interface AlimentData {
  ID_aliment: number;
  nom: string;
  quantite_base: number;
  unite: string;
  image: string;
  calories: string;
  proteines: string;
  glucides: string;
  lipides: string;
}
