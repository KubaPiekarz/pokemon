<template>
  <div id="app" class="bg-light text-darkGray min-h-screen dark:bg-darkGray dark:text-light">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { computed, watch } from "vue";
import { store } from "@/router";


export default {
  name: "App",
  components: {
    Header,
  },setup(){
    const darkMode = computed(() => store.getters.darkMode);
    document.body.classList.toggle('dark', darkMode.value);

    watch(darkMode, (newDarkMode) => {
      document.body.classList.toggle('dark', newDarkMode);
    });

  }
};
</script>

<style>
#app {
  font-family: "Josefin Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
