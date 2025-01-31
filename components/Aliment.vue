<script lang="ts" setup>
import lazyLoad from "~/utils/lazyLoadImg.ts";

const props = defineProps<{
  aliment: any;
  favoris: Set<number>;
  toggleFavori: (item: any) => void;
}>();

const router = useRouter();

function navigate() {
  router.push("/aliments/" + props.aliment.ID_aliment);
}

const imgSrc = lazyLoad("/img/placeholders/aliment.jpg", props.aliment.image);

</script>

<template>
  <div class="result-item" @click="navigate">
    <img :src="imgSrc" alt="Image" class="result-image"/>
    <div class="result-text">
      <h2>
        {{ aliment.nom }}
      </h2>
      <p>
        Calories : {{ aliment.calories }} kcal<br/>
        Glucides : {{ aliment.glucides }} g<br/>
        Lipides : {{ aliment.lipides }} g<br/>
        Protéines : {{ aliment.proteines }} g
      </p>
    </div>
    <div class="favori-icon" @click.stop="toggleFavori(aliment)">
      <IconStar v-if="favoris.has(aliment.ID)" class="star-icon filled"/>
      <IconStarOff v-else class="star-icon empty"/>
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
