<template>
  <div class="pokemonList p-4 flex flex-col items-center" ref="target">
    <div class="flex gap-4 mb-4">
      <button
        @click="selectAll"
        class="px-4 py-2 bg-primary text-light rounded-md"
      >
        All
      </button>
      <button
        @click="selectFavourite"
        class="px-4 py-2 bg-secondary text-light rounded-md"
        :class="{
          'opacity-75': !favouritePokemons?.length,
          'cursor-default': !favouritePokemons?.length,
        }"
      >
        Favourite Pokemons
      </button>
    </div>
    <div class="flex items-center justify-end mb-4 relative gap-2">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search Pokemon"
        class="border border-lightGray p-2 rounded-md bg-light dark:bg-lightGray dark:border-darkGray dark:text-darkGray"
      />
      <button
        @click="searchPokemon"
        class="px-4 py-2 bg-purple text-light rounded-md"
        :class="{ 'opacity-75': !searchTerm, 'cursor-default': !searchTerm }"
      >
        Search
      </button>

      <div
        v-if="searchError"
        class="text-error ml-4 absolute left-0 top-full sm:left-full sm:w-full sm:top-auto"
      >
        Pokemon with name <i class="text-primary">{{ searchTerm }}</i> not
        found. Please try again.
      </div>
    </div>
    <div class="flex flex-wrap gap-4 justify-center">
      <div
        v-for="pokemon in pokemonsToDisplay"
        :key="pokemon.id"
        @click="openDetails(pokemon)"
        class="cursor-pointer"
      >
        <SinglePokemon :pokemon="pokemon" />
      </div>
    </div>
    <button
      @click="getMorePokemons"
      v-show="showAll"
      class="mt-4 px-4 py-2 bg-purple text-light rounded-md"
    >
      Get More Pokemons
    </button>
  </div>
  <Teleport to="body">
    <Transition
      name="fade"
      class="cursor-pointer bg-gray/75"
    >
      <div
        v-if="showPokemonDetails"
        class="modal-mask fixed inset-0 block sm:flex sm:flex-center sm:justify-center"
      >
        <div
          class="modal-container cursor-default m-auto"
          ref="modalContainer"
          @click.stop
        >
          <PokemonDetails
            :pokemonWithDetails="pokemonWithDetails"
            @closePopup="closePopup"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import SinglePokemon from "./SinglePokemon.vue";
import { onMounted, ref, computed } from "vue";
import PokemonDetails from "./PokemonDetails.vue";
import { GET_POKEMONS } from "../store/types/pokemons.type";
import { useStore } from "vuex";
import { getSinglePokemon } from "../api/getSinglePokemon";
import { onClickOutside } from "@vueuse/core";

export default {
  name: "PokemonList",
  components: {
    SinglePokemon,
    PokemonDetails,
  },
  props: {
    msg: String,
  },
  setup() {
    const showPokemonDetails = ref(false);
    const pokemonsList = ref();
    const pokemonWithDetails = ref();
    const store = useStore();
    const pokemons = computed(() => store.getters.pokemons);
    const allPokemons = ref(pokemons.value);
    const showAll = ref(true);
    const favouritePokemons = computed(() => store.getters.favouritePokemons);
    const searchTerm = ref("");
    const pokemonsToDisplay = computed(() =>
      showAll.value ? allPokemons.value : favouritePokemons.value
    );
    const searchError = ref(false);
    const openDetails = (pokemon) => {
      showPokemonDetails.value = true;
      pokemonWithDetails.value = pokemon;
    };

    const closePopup = () => {
      showPokemonDetails.value = false;
    };

    const offset = ref(0);
    const getMorePokemons = () => {
      offset.value += 20;
      store.dispatch(GET_POKEMONS, offset.value).then((pokemon) => {
        allPokemons.value = allPokemons.value.concat(pokemon);
      });
    };

    const selectAll = () => {
      showAll.value = true;
    };

    const selectFavourite = () => {
      if (favouritePokemons.value?.length) {
        showAll.value = false;
      }
    };

    const searchPokemon = async () => {
      if (searchTerm.value) {
        const pokemon = await getSinglePokemon(searchTerm.value.toLowerCase());
        if (pokemon) {
          pokemonWithDetails.value = pokemon;
          showPokemonDetails.value = true;
        } else {
          searchError.value = true;
          setTimeout(() => {
            searchError.value = false;
          }, 3000);
        }
      } else {
        return;
      }
    };

    const target = ref(null);
    const modalContainer = ref(null);

    onClickOutside([target], (event) => {
      if (modalContainer.value && modalContainer.value.contains(event.target)) {
        return;
      }

      showPokemonDetails.value = false;
    });

    onMounted(async () => {
      if (!pokemons?.value?.length) {
        await store.dispatch(GET_POKEMONS, offset.value).then((pokemons) => {
          allPokemons.value = pokemons;
        });
      }
    });

    return {
      openDetails,
      pokemonsList,
      pokemons,
      showPokemonDetails,
      pokemonWithDetails,
      closePopup,
      getMorePokemons,
      allPokemons,
      selectAll,
      selectFavourite,
      showAll,
      favouritePokemons,
      pokemonsToDisplay,
      searchTerm,
      searchPokemon,
      searchError,
      target,
      modalContainer,
    };
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
