import express from "express";
import { getAllPokemons, getPokemonById } from "../application/PokemonService";
import { getByName } from "../infrastructure/PokemonRepository";
const app = express();
const port = 3000;

app.get("/", async (_req, res) => {
  res.send(await getAllPokemons());
});

app.get("/getById/:id", async (req, res) => {
  res.send(await getPokemonById(parseInt(req.params.id)));
});

app.get("/getByType/:type/:sortingCriteria", (req, res) => {
  // Return all items of specified type
});

app.get("/getByName/:name", async (req, res) => {
  res.send(await getByName(req.params.name));
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
