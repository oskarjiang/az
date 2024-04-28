import { MongoClient } from "mongodb";
import { uriDocker, dbName, collectionName } from "../constants";

const url =
  "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json?_sm_au_=iVV5F7R6VsVpqJM6pGsWvKttvN1NG";

export const FillDatabase = async () => {
  try {
    console.log("Fetching data...");
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log("Data fetched successfully");

    console.log(`Connecting to MongoDB at ${uriDocker}...`);
    const client = new MongoClient(uriDocker);
    await client.connect();
    console.log(`Connected successfully`);

    console.log(`Inserting data into ${dbName} ${collectionName}...`);
    const db = client.db(dbName);

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);
    if (collectionNames.includes(collectionName)) {
      await client.close();
      console.log(`${collectionName} already exists`);
      return;
    }

    const collection = db.collection(collectionName);
    await collection.insertMany(jsonData.pokemon);
    console.log("Data inserted into MongoDB successfully");

    console.log("Closing connection...");
    await client.close();
    console.log("Closing closed");
  } catch (error) {
    console.error("Error:", error);
  }
};
