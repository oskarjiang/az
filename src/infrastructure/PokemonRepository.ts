import { Element } from "../domain/Types";
import { PokemonDocument } from "./Documents/PokemonDocument";
import { insert, query } from "./MongodbClient";

const uri = "mongodb://localhost:27017";
const dbName = "az";
const collectionName = "pokemons";

export const getAll = async () => {
  return await query(uri, dbName, collectionName);
};

export const getById = async (id: number) => {
  return (
    await query(uri, dbName, collectionName, {
      id,
    })
  )[0];
};

export const getByNum = async (num: string) => {
  return (
    await query(uri, dbName, collectionName, {
      num,
    })
  )[0];
};

export const getByType = async (type: Element, sortOn?: string) => {
  return await query(
    uri,
    dbName,
    collectionName,
    {
      type,
    },
    sortOn
  );
};

export const getByTypeWithoutWeaknesses = async (
  type: Element,
  weaknesses: Element[]
) => {
  return await query(uri, dbName, collectionName, {
    type,
    weaknesses: { $nin: weaknesses },
  });
};

export const add = async (pokemon: PokemonDocument) => {
  return await insert(uri, dbName, collectionName, pokemon);
};

export const addPrevEvolution = async (
  pokemonId: number,
  newPrevEvolution: { num: string; name: string }
) => {
  await addPrevEvolution(pokemonId, newPrevEvolution);
};

export const addNextEvolution = async (
  pokemonId: number,
  newNextEvolution: { num: string; name: string }
) => {
  await addNextEvolution(pokemonId, newNextEvolution);
};
