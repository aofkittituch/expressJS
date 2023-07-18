<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <Navbar />
    </div>
  </header>
  <RouterView />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

html,
body {
  font-family: "Lato", sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50vh;
}
</style>
