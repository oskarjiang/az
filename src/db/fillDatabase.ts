import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "az";
const collectionName = "pokemons";
const url =
  "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json?_sm_au_=iVV5F7R6VsVpqJM6pGsWvKttvN1NG";

const FillDatabase = async () => {
  try {
    console.log("Fetching data...");
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log("Data fetched successfully");

    console.log(`Connecting to MongoDB at ${uri}...`);
    const client = new MongoClient(uri);
    await client.connect();
    console.log(`Connected successfully`);

    console.log(`Inserting data into ${dbName} ${collectionName}...`);
    const db = client.db(dbName);
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

FillDatabase();
