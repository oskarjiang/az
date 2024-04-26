import { queryMongo } from "./MongodbClient";
import { PokemonDto } from "./Dto/PokemonDto";

const uri = "mongodb://localhost:27017";
const dbName = "az";
const collectionName = "pokemons";

export const getAll = async (): Promise<PokemonDto[]> => {
  const result = await queryMongo(uri, dbName, collectionName);
  return result?.pokemon ?? [];
};
