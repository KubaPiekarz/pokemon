<template>
  <div>
    <header class="bg-blue-500 p-4 text-white flex justify-between" ref="target">
      <div
        class="flex items-center justify-center cursor-pointer"
        @click="goTo('PokemonList')"
      >
        <img src="@/assets/img/logo.png" alt="Logo" class="w-20 sm:w-40" />
      </div>
      <nav class="flex items-center justify-evenly mt-2 gap-5">
        {{ router.currentRoute.name }}
        <p @click="goTo('PokemonList')" class="cursor-pointer hover:underline">
          Pokemons
        </p>
        <div
          class="relative"
        >
          <span class="cursor-pointer hover:underline" @click="toggleDropdown">Types</span>
          <div
            v-if="isDropdownVisible"
            class="dropdown-content absolute bg-blue-500 text-white py-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
          >
            <div
              v-for="type in allTypes"
              :key="type.name"
              @click="() => goTo('TypeDetails', type.name)"
              class="cursor-pointer hover:bg-white hover:text-blue-500 px-4 py-2 z-10"
            >
              {{ type.name }}
            </div>
          </div>
        </div>
        <p
          class="cursor-pointer hover:underline"
          @click="() => goTo('AboutAuthor')"
        >
          About author
        </p>
      </nav>
    </header>
  </div>
</template>

<script>
import { store } from "@/router";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { GET_TYPES } from "../store/types/pokemons.type";
import { onClickOutside } from "@vueuse/core";

export default {
  name: "App",
  setup() {
    const storeAllTypes = computed(() => store.getters.types);
    const allTypes = ref(storeAllTypes.value);
    const isDropdownVisible = ref(false);
    const router = useRouter();

    const goTo = (routeName, typeName) => {
      router.push({ name: routeName, params: { name: typeName } });
      toggleDropdown(false);
    };
    
    const toggleDropdown = () => {
      isDropdownVisible.value =! isDropdownVisible.value;
    };

    const target = ref(null);

		onClickOutside(target, () => {
      isDropdownVisible.value = false
    })

    onMounted(async () => {
      if (!allTypes.value?.length) {
        await store.dispatch(GET_TYPES).then((types) => {
          allTypes.value = types;
        });
      }
    });


    return { allTypes, isDropdownVisible, toggleDropdown, goTo, router, target };
  },
};
</script>

<style scoped>
.scrollbar-thin {
  z-index: 2;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>
