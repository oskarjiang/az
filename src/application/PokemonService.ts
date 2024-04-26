import { getAll, getByName } from "../infrastructure/PokemonRepository";

export const getAllPokemons = async () => {
  return await getAll();
};

export const getPokemonByName = async (name: string) => {
  return await getByName(name);
};
