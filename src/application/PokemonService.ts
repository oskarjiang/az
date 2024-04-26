import { getAll } from "../infrastructure/PokemonRepository";

export const getAllPokemons = async () => {
  return await getAll();
};
