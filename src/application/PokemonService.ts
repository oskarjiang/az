import { Element } from "../domain/Types";
import {
  getAll,
  getById,
  getByName,
  getByType,
} from "../infrastructure/PokemonRepository";

export const getAllPokemons = async () => {
  return await getAll();
};

export const getPokemonById = async (id: number) => {
  return await getById(id);
};

export const getPokemonByName = async (name: string) => {
  return await getByName(name);
};

export const getPokemonsByType = async (type: Element) => {
  return await getByType(type);
};
