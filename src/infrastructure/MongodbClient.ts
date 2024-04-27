import { Filter, MongoClient } from "mongodb";
import { PokemonDocument } from "./Documents/PokemonDocument";
import { getSort } from "./Helper";

export const queryMongo = async (
  uri: string,
  dbName: string,
  collectionName: string,
  filter: Filter<PokemonDocument> = {},
  sortOn?: string
) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection<PokemonDocument>(collectionName);

    const queryResult = await collection
      .find(filter)
      .sort(getSort(sortOn ?? ""))
      .toArray();

    return queryResult;
  } catch (error) {
    console.error("Error:", error);
    return [];
  } finally {
    await client.close();
  }
};
