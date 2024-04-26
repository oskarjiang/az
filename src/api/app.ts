import express from "express";
import { getAll } from "../infrastructure/PokemonRepository";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  await getAll();
  res.send("Hello World!");
});

app.get("/getById/:id", (req, res) => {
  // Return item and all evolutions
});

app.get("/getByType/:type/:sortingCriteria", (req, res) => {
  // Return all items of specified type
});

app.get("/getByName/:name", (req, res) => {
  // Return all items with name
});

app.get("/getSuggested/:id", (req, res) => {
  // Return an item which given item is strong against
});

app.post("/getSuggested/:id", (req, res) => {
  // Return an item which given item is strong against
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
