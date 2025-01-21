<template>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  background-color: #333;
  color: white;
  padding: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 1rem 0;
}

a {
  color: white;
  text-decoration: none;
}
</style>
