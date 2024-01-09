<template>
  <div
    class="shadow shadow-gray bg-lightGray p-4 rounded-md flex flex-col items-center justify-center w-48 text-light w-60 dark:bg-gray"
  >
    <img
      class="pokemon-img rounded-md mb-4"
      :src="pokemon?.sprites?.other['official-artwork'].front_default"
      alt="Pokemon Image"
    />
    <div
      class="bg-gray w-full rounded-b-md p-4 shadow shadow-darkGray dark:bg-darkGray"
    >
      <h3 class="text-xl uppercase text-center mb-2">{{ pokemon.name }}</h3>
      <div class="pokemon-types flex justify-center gap-4">
        <p class="text-sm">
          Height: <br />
          {{ pokemon.height }}
        </p>
        <p class="text-sm">
          Weight: <br />
          {{ pokemon.weight }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SinglePokemon",
  props: {
    pokemon: Object,
  },
  setup() {},
};
</script>

<style scoped></style>
