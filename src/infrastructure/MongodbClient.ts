import { Filter, MongoClient } from "mongodb";
import { PokemonDocument } from "./Documents/PokemonDocument";
import { getSort } from "./Helper";

export const query = async (
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
  } catch {
    return [];
  } finally {
    await client.close();
  }
};

export const insert = async (
  uri: string,
  dbName: string,
  collectionName: string,
  pokemon: PokemonDocument
) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection<PokemonDocument>(collectionName);

    const result = await collection.insertOne(pokemon);

    return result;
  } catch (error) {
    throw new Error("Error when adding to database");
  } finally {
    await client.close();
  }
};
