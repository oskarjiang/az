import { queryMongo } from "./MongodbClient";

const uri = "mongodb://localhost:27017";
const dbName = "az";
const collectionName = "pokemons";

export const getAll = async () => {
  return await queryMongo(uri, dbName, collectionName);
};

export const getById = async (id: number) => {
  return await queryMongo(uri, dbName, collectionName, {
    id,
  });
};

export const getByName = async (name: string) => {
  return await queryMongo(uri, dbName, collectionName, {
    name,
  });
};
