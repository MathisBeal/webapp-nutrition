<script lang="ts" setup>
import { StarOff, Star } from 'lucide-vue-next';
import lazyLoad from "~/utils/lazyLoadImg.ts";

const router = useRouter()

const props = defineProps<{
  plat: any;
  favoris?: Set<number>;
  toggleFavori?: (item: any) => void;
}>();

function navigate() {
  router.push("/recipes/" + props.plat.ID_plat);
}

const imgSrc = lazyLoad("/img/placeholders/plat.png", props.plat.images);


</script>

<template>
  <div class="result-item" @click="navigate">
    <img :src="imgSrc" alt="Image" class="result-image">
    <div class="result-text">
      <h2>
        {{ plat.description || 'Description non disponible' }} - {{ plat.nom_categorie || 'Catégorie inconnue' }}
      </h2>
      <p>
        <img alt="Icône d'horloge" class="icon-horloge" src="/assets/img/horloge.png"/>
        Durée de préparation : {{ plat.duree || 'Non spécifiée' }}
      </p>
    </div>
    <div v-if="toggleFavori" class="favori-icon" @click.stop="toggleFavori(plat)">
      <Star v-if="favoris.has(plat.ID)" class="star-icon filled"/>
      <StarOff v-else class="star-icon empty"/>
    </div>
  </div>
</template>

<style scoped>

.result-item {
  display: flex;
  align-items: flex-start;
  gap: 1vw;
  padding: 2vh;
  border-radius: 1em;
  background-color: #fff;
  box-shadow: 0 0.4vh 0.6vh rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.result-item:hover {
  transform: scale(1.01);
  box-shadow: 0 0.6vh 1vh rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;
}

.result-item h2 {
  margin: 0;
  font-size: 1.2rem;
}

.result-item p {
  margin: 0.5vh 0 0;
  color: #555;
}

.result-image {
  width: 7vw;
  height: 7vw;
  object-fit: cover;
  border-radius: 0.5em;
}

.result-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5vh;
}

.result-text h2,
.result-text p {
  margin: 0;
  text-align: left;
  line-height: 1.2;
}

.result-text span {
  font-size: 0.9rem;
  color: #999;
}

.icon-horloge {
  width: 1vw;
  height: 1vw;
  object-fit: cover;
  border-radius: 0.5em;
}

.favori-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.star-icon {
  width: 1.5vw;
  height: 1.5vw;
  transition: transform 0.2s;
  color: #FFD700;
}

.star-icon.empty {
  color: #ccc;
}

.favori-icon:hover .star-icon {
  transform: scale(1.1);
}
</style>
