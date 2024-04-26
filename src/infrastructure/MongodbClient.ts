import { MongoClient } from "mongodb";

export const queryMongo = async (
  uri: string,
  dbName: string,
  collectionName: string
) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const queryResult = await collection.find({}).toArray();

    console.log("Query Result:");
    console.log(queryResult);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
};
