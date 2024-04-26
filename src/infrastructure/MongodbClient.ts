import { Filter, MongoClient } from "mongodb";
import { PokemonDocument } from "./Documents/PokemonDocument";

export const queryMongo = async (
  uri: string,
  dbName: string,
  collectionName: string,
  filter: Filter<PokemonDocument> = {}
) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection<PokemonDocument>(collectionName);

    const queryResult = await collection.find(filter).toArray();

    return queryResult;
  } catch (error) {
    console.error("Error:", error);
    return [];
  } finally {
    await client.close();
  }
};
