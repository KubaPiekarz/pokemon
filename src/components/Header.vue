<template>
  <div>
    <header class="bg-primary p-4 text-light flex justify-between dark:bg-primaryDark"  ref="target">
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
            class="dropdown-content absolute bg-primary text-light py-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-lightGray dark:bg-primaryDark"
          >
            <div
              v-for="type in allTypes"
              :key="type.name"
              @click="() => goTo('TypeDetails', type.name)"
              class="cursor-pointer hover:bg-light hover:text-primary px-4 py-2 z-10"
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
    <div class=" flex items-center justify-center gap-2 w-36 bottom-0 left-2/4 py-2 px-4 rounded-b-md ml-auto bg-primary dark:bg-primaryDark">
        <AkSunFill class="m-auto text-light" />
        <label class="switch">
          <input type="checkbox" v-model="darkModeRef" @change="toggleDarkMode()">
          <span class="slider round bg-light before:bg-primary before:dark:bg-primaryDark"></span>
        </label>
        <AkMoonFill class="m-auto text-light" />
      </div>
  </div>
</template>

<script>
import { store } from "@/router";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { GET_TYPES } from "../store/types/pokemons.type";
import { onClickOutside } from "@vueuse/core";
import { AkMoonFill, AkSunFill } from "@kalimahapps/vue-icons";

export default {
  name: "App",
  components:{
    AkMoonFill,
    AkSunFill
  },
  setup() {
    const storeAllTypes = computed(() => store.getters.types);
    const allTypes = ref(storeAllTypes.value);
    const isDropdownVisible = ref(false);
    const router = useRouter();
    const darkMode = computed(() => store.getters.darkMode);
    const darkModeRef = ref(darkMode.value)
    const goTo = (routeName, typeName) => {
      router.push({ name: routeName, params: { name: typeName } });
      isDropdownVisible.value = false
    };
    
    const toggleDropdown = () => {
      isDropdownVisible.value =! isDropdownVisible.value;
    };

    const toggleDarkMode = () => {
      store.commit('setDarkMode', !darkMode.value);
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


    return { allTypes, isDropdownVisible, toggleDropdown, goTo, router, target, toggleDarkMode, darkModeRef };
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

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider:before {
  background-color: #FAFAFA;
}
input:checked + .slider {
  background-color: rgb(71 85 105);
}

input:focus + .slider {
  box-shadow: 0 0 1px rgb(156 163 175);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>