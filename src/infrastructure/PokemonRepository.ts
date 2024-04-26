import { queryMongo } from "./MongodbClient";
import { PokemonDocument } from "./Document/PokemonDocument";

const uri = "mongodb://localhost:27017";
const dbName = "az";
const collectionName = "pokemons";

export const getAll = async (): Promise<PokemonDocument[]> => {
  const result = await queryMongo(uri, dbName, collectionName);
  return result ?? [];
};

export const getByName = async (name: string): Promise<PokemonDocument[]> => {
  return (
    (await queryMongo(uri, dbName, collectionName, {
      name,
    })) ?? []
  );
};
