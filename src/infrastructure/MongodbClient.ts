import { Filter, MongoClient } from "mongodb";
import { PokemonDocument } from "./Document/PokemonDocument";

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

    const queryResult = await collection.find(filter).next();

    return queryResult;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
};
