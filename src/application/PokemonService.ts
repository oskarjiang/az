import Fuse from "fuse.js";
import { Element, isElement } from "../domain/Types";
import {
  getAll,
  getById,
  getByNum,
  getByType,
  getByTypeWithoutWeaknesses,
} from "../infrastructure/PokemonRepository";
import {
  getNextEvolutions,
  getPrevEvolutions,
  pickRandomItemInArray,
} from "./Helpers";

export const getAllPokemons = async () => {
  return await getAll();
};

export const getPokemonById = async (id: number) => {
  const pokemons = [];

  const pokemonWithGivenId = await getById(id);
  pokemons.push(pokemonWithGivenId);

  return pokemons
    .concat(await getPrevEvolutions(pokemonWithGivenId))
    .concat(await getNextEvolutions(pokemonWithGivenId));
};

export const getPokemonByName = async (name: string) => {
  const allPokemons = await getAll();
  const fuse = new Fuse(allPokemons, { keys: ["name"] });
  return fuse.search(name).map((r) => r.item);
};

export const getPokemonsByType = async (type: string, sortOn: string) => {
  if (!isElement(type)) {
    throw new Error(`${type} is not an Element`);
  }
  return await getByType(type, sortOn);
};

export const getSuggestedPokemonById = async (id: number) => {
  const providedPokemon = await getById(id);

  const suggestedPokemon = await getByTypeWithoutWeaknesses(
    pickRandomItemInArray(providedPokemon.weaknesses) as Element,
    providedPokemon.type as Element[]
  );
  return pickRandomItemInArray(suggestedPokemon);
};
