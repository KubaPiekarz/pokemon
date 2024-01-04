import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import PokemonList from "../components/PokemonList.vue";
import AboutAuthor from "../components/AboutAuthor.vue";
import TypeDetails from "../components/TypeDetails.vue";
import pokemons from "../store/modules/pokemons.module.js";

const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    pokemons,
  },
});

const baseRoutes = [
  { path: "/", name: "PokemonList", component: PokemonList },
  { path: "/type-:name", name: "TypeDetails", component: TypeDetails },
  { path: "/about-author", name: "AboutAuthor", component: AboutAuthor },
];

const routes = baseRoutes.concat();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { router, store };
