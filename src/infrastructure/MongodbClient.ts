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

    // Check if a Pokemon with the same ID already exists
    const existingPokemon = await collection.findOne({ id: pokemon.id });

    if (existingPokemon) {
      throw new Error(`Pokemon with ID ${pokemon.id} already exists`);
    }

    const result = await collection.insertOne(pokemon);

    return result;
  } catch (error) {
    throw new Error(`Error when adding to database ${error}`);
  } finally {
    await client.close();
  }
};

export const updatePrevEvolution = async (
  uri: string,
  dbName: string,
  collectionName: string,
  pokemonId: number,
  newPrevEvolution: { num: string; name: string }
) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection<PokemonDocument>(collectionName);

    const filter = { id: pokemonId };
    const update = { $push: { prev_evolution: newPrevEvolution } };

    const result = await collection.updateOne(filter, update);

    return result;
  } catch (error) {
    throw new Error(
      `Error when updating ${pokemonId} with ${newPrevEvolution}`
    );
  } finally {
    await client.close();
  }
};

export const updateNextEvolution = async (
  uri: string,
  dbName: string,
  collectionName: string,
  pokemonId: number,
  newNextEvolution: { num: string; name: string }
) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection<PokemonDocument>(collectionName);

    const filter = { id: pokemonId };
    const update = { $push: { next_evolution: newNextEvolution } };

    const result = await collection.updateOne(filter, update);

    return result;
  } catch (error) {
    throw new Error(
      `Error when updating ${pokemonId} with ${newNextEvolution}`
    );
  } finally {
    await client.close();
  }
};
