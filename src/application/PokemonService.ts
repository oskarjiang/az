import Fuse from "fuse.js";
import { Element, isElement } from "../domain/Types";
import {
  add,
  addNextEvolution,
  addPrevEvolution,
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
import { PokemonDocument } from "../infrastructure/Documents/PokemonDocument";

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

export const addPokemon = async (newPokemon: PokemonDocument) => {
  await add(newPokemon);

  if (newPokemon.prev_evolution) {
    for (let index = 0; index < newPokemon.prev_evolution.length; index++) {
      const prevEvolutionNum = newPokemon.prev_evolution[index].num;
      const prevEvolution = await getByNum(prevEvolutionNum);
      await addNextEvolution(prevEvolution.id, {
        num: newPokemon.num,
        name: newPokemon.name,
      });
    }
  }

  if (newPokemon.next_evolution) {
    for (let index = 0; index < newPokemon.next_evolution.length; index++) {
      const nextEvolutionNum = newPokemon.next_evolution[index].num;
      const nextEvolution = await getByNum(nextEvolutionNum);
      await addPrevEvolution(nextEvolution.id, {
        num: newPokemon.num,
        name: newPokemon.name,
      });
    }
  }
};
