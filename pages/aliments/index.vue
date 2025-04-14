<template>
  <div>
    <NuxtLink
      v-for="(aliment, index) in aliments"
      :to="{ name: 'aliments-id_aliment', params: {id_aliment: aliments[index].ID_aliment} } "
      class="aliment">
      <p>
        {{ aliment.nom }}
      </p>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const aliments = await $fetch("/api/aliments");
</script>

<style scoped>
div {
  margin: 5em 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.aliment {
  width: 40%;
  padding: 0.4em;
  margin: 0.4em auto;
  border-radius: 1vh;
  box-shadow: 0.2vh 0.2vh 0.2vh rgba(0, 0, 0, 0.7);
  background: #f3f3f3;
  font-size: 1.5em;
  align-items: center;
  align-content: center;
  color: initial;
  text-decoration: none;
}

.aliment:hover {
  box-shadow: 0.2vh 0.2vh 0.2vh rgba(0, 0, 0, 0.9);
  background: #e6e6e6;
}

p {
  margin: 0;
}
</style>
