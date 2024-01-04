import axios from "axios";

export async function getSinglePokemon(name) {
  try {
    const response = await axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
