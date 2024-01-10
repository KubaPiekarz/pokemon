<template>

  <div v-if="isLoading" >
    <AnOutlinedLoading3Quarters class="text-primary text-9xl absolute top-1/2 left-1/2 loading-icon" />
  </div>
  <div class="type-details" v-else>
    <div v-if="ability?.damage_relations.double_damage_from?.length">
      <h1 class="text-3xl font-bold mt-6 uppercase">{{ ability?.name }}</h1>
      <div class="flex flex-wrap justify-center">
        <section
          class="w-full md:w-1/2 border-2 border-purple rounded-lg"
          v-if="
            showSection(
              'Double Damage From',
              ability?.damage_relations?.double_damage_from
            )
          "
        >
          <h2 class="text-lg font-bold mt-6">Double Damage From:</h2>
          <ul class="list-disc ml-6">
            <li
              v-for="type in ability?.damage_relations?.double_damage_from"
              :key="type.name"
            >
              {{ type.name }}
            </li>
          </ul>
        </section>

        <section
          class="w-full md:w-1/2 border-2 border-purple rounded-lg"
          v-if="
            showSection(
              'Double Damage To',
              ability?.damage_relations?.double_damage_to
            )
          "
        >
          <h2 class="text-lg font-bold mt-6">Double Damage To:</h2>
          <ul class="list-disc ml-6">
            <li
              v-for="type in ability?.damage_relations?.double_damage_to"
              :key="type.name"
            >
              {{ type.name }}
            </li>
          </ul>
        </section>

        <section
          class="w-full md:w-1/2 border-2 border-primary rounded-lg"
          v-if="
            showSection(
              'Half Damage From',
              ability?.damage_relations?.half_damage_from
            )
          "
        >
          <h2 class="text-lg font-bold mt-6">Half Damage From:</h2>
          <ul class="list-disc ml-6">
            <li
              v-for="type in ability?.damage_relations?.half_damage_from"
              :key="type.name"
            >
              {{ type.name }}
            </li>
          </ul>
        </section>

        <section
          class="w-full md:w-1/2 border-2 border-primary rounded-lg"
          v-if="
            showSection(
              'Half Damage To',
              ability?.damage_relations?.half_damage_to
            )
          "
        >
          <h2 class="text-lg font-bold mt-6">Half Damage To:</h2>
          <ul class="list-disc ml-6">
            <li
              v-for="type in ability?.damage_relations?.half_damage_to"
              :key="type.name"
            >
              {{ type.name }}
            </li>
          </ul>
        </section>

        <section
          class="w-full md:w-1/2 border-2 border-secondary rounded-lg"
          v-if="
            showSection(
              'No Damage From',
              ability?.damage_relations?.no_damage_from
            )
          "
        >
          <h2 class="text-lg font-bold mt-6">No Damage From:</h2>
          <ul class="list-disc ml-6">
            <li
              v-for="type in ability?.damage_relations?.no_damage_from"
              :key="type.name"
            >
              {{ type.name }}
            </li>
          </ul>
        </section>

        <section
          class="w-full md:w-1/2 border-2 border-secondary rounded-lg"
          v-if="
            showSection('No Damage To', ability?.damage_relations?.no_damage_to)
          "
        >
          <h2 class="text-lg font-bold mt-6">No Damage To:</h2>
          <ul class="list-disc ml-6">
            <li
              v-for="type in ability?.damage_relations?.no_damage_to"
              :key="type.name"
            >
              {{ type.name }}
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div v-else>nothing to display</div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getTypes } from "@/api/getTypes";
import { AnOutlinedLoading3Quarters } from "@kalimahapps/vue-icons";

export default {
  name: "TypeDetails",
  props: {},
  components: {
    AnOutlinedLoading3Quarters
  },
  setup() {
    const router = useRouter();
    const ability = ref(null);
    const isLoading = ref(false);

    const fetchData = () => {
      isLoading.value = true
      getTypes(router.currentRoute.value.params.name).then((pokemons) => {
        isLoading.value = false
        ability.value = pokemons
      });
    };

    onMounted(fetchData);

    watch(
      () => router.currentRoute.value.params.name,
      () => {
        fetchData();
      }
    );

    const showSection = (data) => {
      return data && data.length > 0;
    };

    return {
      ability,
      router,
      showSection,
      isLoading
    };
  },
};
</script>

<style scoped>
.type-details {
  max-width: 800px;
  margin: 0 auto;
}

section {
  padding: 20px;
  margin: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

@media (min-width: 768px) {
  .md\:w-1\/2 {
    width: calc(50% - 20px);
  }
}


.loading-icon {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
