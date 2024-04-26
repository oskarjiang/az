import { queryMongo } from "./MongodbClient";

const uri = "mongodb://localhost:27017";
const dbName = "az";
const collectionName = "pokemons";

export const getAll = async () => {
  return await queryMongo(uri, dbName, collectionName);
};
