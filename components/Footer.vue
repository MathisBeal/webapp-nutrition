<script lang="ts" setup>
import {ChartColumnBig, House, Search} from 'lucide-vue-next'

const router = useRouter();

function goTo(address: string) {
  router.push(address);
}
</script>

<template>
  <footer>
    <House :size="32" color="#ffffff" @click="goTo('/home')"/>
    <Search :size="32" color="#ffffff" @click="goTo('/search')"/>
    <ChartColumnBig :size="32" color="#ffffff" @click="goTo('/stats')"/>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  background: #cccccc;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 7px;
  border-top: 1px solid rgba(96, 96, 96, 0.9);
  box-shadow: 0 -2px 7px rgba(96, 96, 96, 0.7);
}

a {
  margin: auto;
}

a:hover {
  text-decoration: none;
  border-radius: 25%;
  box-shadow: 0 0 5px rgba(40, 40, 40, 0.71);
}
</style>
