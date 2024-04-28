import { uriDocker, dbName, collectionName } from "../constants";
import { Element } from "../domain/Types";
import { PokemonDocument } from "./Documents/PokemonDocument";
import {
  insert,
  query,
  updateNextEvolution,
  updatePrevEvolution,
} from "./MongodbClient";

export const getAll = async () => {
  return await query(uriDocker, dbName, collectionName);
};

export const getById = async (id: number) => {
  return (
    await query(uriDocker, dbName, collectionName, {
      id,
    })
  )[0];
};

export const getByNum = async (num: string) => {
  return (
    await query(uriDocker, dbName, collectionName, {
      num,
    })
  )[0];
};

export const getByType = async (type: Element, sortOn?: string) => {
  return await query(
    uriDocker,
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
  return await query(uriDocker, dbName, collectionName, {
    type,
    weaknesses: { $nin: weaknesses },
  });
};

export const add = async (pokemon: PokemonDocument) => {
  return await insert(uriDocker, dbName, collectionName, pokemon);
};

export const addPrevEvolution = async (
  pokemonId: number,
  newPrevEvolution: { num: string; name: string }
) => {
  await updatePrevEvolution(
    uriDocker,
    dbName,
    collectionName,
    pokemonId,
    newPrevEvolution
  );
};

export const addNextEvolution = async (
  pokemonId: number,
  newNextEvolution: { num: string; name: string }
) => {
  await updateNextEvolution(
    uriDocker,
    dbName,
    collectionName,
    pokemonId,
    newNextEvolution
  );
};
