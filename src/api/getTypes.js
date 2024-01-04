import axios from 'axios';

export async function getTypes(name) {
  try {
    const response = await axios({
      method: 'get',
      url: `https://pokeapi.co/api/v2/type/${name}`,
    });

    return response.data;

  } catch (error) {
    console.error(error);
  }
}
