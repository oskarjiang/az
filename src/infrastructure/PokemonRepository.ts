import { Element } from "../domain/Types";
import { queryMongo } from "./MongodbClient";

const uri = "mongodb://localhost:27017";
const dbName = "az";
const collectionName = "pokemons";

export const getAll = async () => {
  return await queryMongo(uri, dbName, collectionName);
};

export const getById = async (id: number) => {
  return (
    await queryMongo(uri, dbName, collectionName, {
      id,
    })
  )[0];
};

export const getByNum = async (num: string) => {
  return await queryMongo(uri, dbName, collectionName, {
    num,
  });
};

export const getByName = async (name: string) => {
  return await queryMongo(uri, dbName, collectionName, {
    name,
  });
};

export const getByType = async (type: Element, sortOn?: string) => {
  return await queryMongo(
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
  return await queryMongo(uri, dbName, collectionName, {
    type,
    weaknesses: { $nin: weaknesses },
  });
};
