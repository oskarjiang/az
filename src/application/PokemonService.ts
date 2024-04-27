import { Element, isElement } from "../domain/Types";
import {
  getAll,
  getById,
  getByName,
  getByType,
  getByTypeWithoutWeaknesses,
} from "../infrastructure/PokemonRepository";
import { pickRandomItemInArray } from "./Helpers";

export const getAllPokemons = async () => {
  return await getAll();
};

export const getPokemonById = async (id: number) => {
  return await getById(id);
};

export const getPokemonByName = async (name: string) => {
  return await getByName(name);
};

export const getPokemonsByType = async (type: string, sortOn: string) => {
  if (!isElement(type)) {
    throw new Error(`${type} is not an Element`);
  }
  return await getByType(type, sortOn);
};

export const getSuggestedPokemonById = async (id: number) => {
  const providedPokemon = await getPokemonById(id);

  const suggestedPokemon = await getByTypeWithoutWeaknesses(
    pickRandomItemInArray(providedPokemon.weaknesses) as Element,
    providedPokemon.type as Element[]
  );
  return pickRandomItemInArray(suggestedPokemon);
};
