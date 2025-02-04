import type {AlimentData} from "~/types/Aliments.ts";

export interface Recipe {
  ingredients: Ingredients[];
  recipe_info: {
    ID_categorie: number;
    ID_plat: number;
    description: string;
    duree: string;
    etapes: string;
    images: string;
  }
}

export interface Ingredients {
  ID_aliment: number;
  ID_plat: number;
  multiplicateur_quantite: string;
  Aliments: AlimentData;
}
