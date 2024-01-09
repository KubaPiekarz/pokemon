<template>
  <div
    class="h-screen overflow-auto bg-lightGray relative rounded-md scrollbar-thin px-8 sm:h-[95vh]"
  >
    <img
      :src="pokemonWithDetails?.sprites.other['official-artwork'].front_default"
      class="m-auto rounded-md shadow-md h-64 sm:h-96"
    />
    <div class="title flex items-center justify-center gap-2 my-4">
      <h3 class="text-2xl font-bold uppercase">
        {{ pokemonWithDetails.name }}
      </h3>
      <div
        class="favIcon cursor-pointer"
        @click="setFavouritePokemons(pokemonWithDetails)"
      >
        <BsStarFill v-if="isInFavourites" class="text-yellow" />
        <AkStar v-else class="text-gray" />
      </div>
    </div>

    <div class=" justify-around overflow-auto  block sm:flex-row sm:flex">
      <div class="pokemonStats mb-4">
        <h4 class="text-lg font-bold mb-2">Stats:</h4>
        <div
          v-for="(stat, index) in pokemonWithDetails?.stats"
          :key="index"
          class="singleType bg-primary px-4 py-2 rounded-md mb-4 text-light dark:bg-primaryDark"
        >
          {{ stat.stat.name }}: {{ stat.base_stat }}
        </div>
      </div>
      <div class="textContainer">
        <div class="pokemonTypes mb-4">
          <h4 class="text-lg font-bold mb-2">Types:</h4>
          <div
            v-for="type in pokemonWithDetails?.types"
            :key="type.slot"
            @click="goToType(type.type.name)"
            class="singleType bg-purple cursor-pointer colored-rectangle animate-pulse px-4 py-2 rounded-md mb-4 text-light"
          >
            {{ type.type.name }}
          </div>
        </div>
        <div class="pokemonAbilities mb-4">
          <h4 class="text-lg font-bold mt-4 mb-2">Abilities:</h4>
          <div
            v-for="(ability, index) in pokemonWithDetails?.abilities"
            :key="index"
            class="singleType bg-purple px-4 py-2 rounded-md mb-4 text-light"
          >
            {{ ability.ability.name }}
          </div>
        </div>
      </div>
    </div>

    <div
      @click="$emit('closePopup')"
      class="closeIcon cursor-pointer mt-4 absolute top-0 right-5"
    >
      <ByClose class="text-gray" />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { ByClose, AkStar, BsStarFill } from "@kalimahapps/vue-icons";
import { store } from "@/router";
export default {
  name: "PokemonDetails",
  components: {
    ByClose,
    AkStar,
    BsStarFill,
  },
  props: {
    pokemonWithDetails: Object,
  },
  setup(props) {
    const router = useRouter();
    const favouritePokemons = computed(() => store.getters.favouritePokemons);

    const goToType = (name) => {
      router.push({ name: "TypeDetails", params: { name: name } });
    };

    const setFavouritePokemons = (pokemon) => {
      store.commit("setFavouritePokemons", { favouritePokemon: pokemon });
    };
    const isInFavourites = computed(() => {
      return favouritePokemons?.value?.some(
        (pokemon) => pokemon.id === props.pokemonWithDetails.id
      );
    });

    return {
      goToType,
      setFavouritePokemons,
      favouritePokemons,
      isInFavourites,
    };
  },
};
</script>

<style scoped>
.colored-rectangle {
  box-shadow: 0 0 7px #3490dc;
  animation: glow 1s infinite;
}

@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 7px #3490dc;
  }
  50% {
    box-shadow: 0 0 12px #3490dc;
  }
}

.scrollbar-thin::-webkit-scrollbar {
  width: 5px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgb(59 130 246);
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}
</style>
