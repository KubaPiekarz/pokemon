import axios from "axios";
import { getItem, setItem } from "../../common/cookie.service.js";

import {
  GET_POKEMONS,
  SET_POKEMONS,
  GET_TYPES,
  SET_TYPES,
} from "../types/pokemons.type.js";

const state = {
  pokemons: [],
  favouritePokemons: [],
  types: [],
};

const getters = {
  pokemons: (state) =>
    state.pokemons.length ? state.pokemons : getItem("pokemons"),
  favouritePokemons: (state) =>
    state.favouritePokemons.length
      ? state.favouritePokemons
      : getItem("favouritePokemons"),
  types: (state) => (state.types.length ? state.types : getItem("types")),
};

const actions = {
  [GET_POKEMONS]: async ({ commit, state }, offset) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );
      const additionalPokemons = await Promise.all(
        response.data.results.map(async (item) => {
          const pokemonDetailsResponse = await axios.get(item.url);
          return pokemonDetailsResponse.data;
        })
      );

      const updatedPokemons = state.pokemons.length ? additionalPokemons : state.pokemons.concat(additionalPokemons);

      if (getItem("pokemons") === null) {
        commit(SET_POKEMONS, updatedPokemons);
      }
      return updatedPokemons;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  [GET_TYPES]: async ({ commit }) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type`);

      commit(SET_TYPES, { types: response.data.results });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

const mutations = {
  [SET_POKEMONS]: (state, pokemons) => {
    state.pokemons = pokemons;
    setItem("pokemons", pokemons);
  },

  [SET_TYPES]: (state, { types }) => {
    state.types = types;
    setItem("types", types);
  },
  setFavouritePokemons: (state, { favouritePokemon }) => {
    const existingIndex = state.favouritePokemons.findIndex(
      (pokemon) => pokemon.id === favouritePokemon.id
    );
    if (existingIndex !== -1) {
      state.favouritePokemons.splice(existingIndex, 1);
    } else {
      state.favouritePokemons.push(favouritePokemon);
    }
    setItem("favouritePokemons", state.favouritePokemons);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
