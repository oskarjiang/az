import express from "express";
import {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  getPokemonsByType,
  getSuggestedPokemonById,
} from "../application/PokemonService";
import { isElement } from "../domain/Types";
const app = express();
const port = 3000;

app.get("/", async (_req, res) => {
  res.send(await getAllPokemons());
});

app.get("/getById/:id", async (req, res) => {
  res.send(await getPokemonById(parseInt(req.params.id)));
});

app.get("/getByType/:type/:sortingCriteria?", async (req, res) => {
  if (!isElement(req.params.type)) {
    res.sendStatus(400);
    return;
  }
  res.send(await getPokemonsByType(req.params.type));
});

app.get("/getByName/:name", async (req, res) => {
  res.send(await getPokemonByName(req.params.name));
});

app.get("/getSuggested/:id", async (req, res) => {
  res.send(await getSuggestedPokemonById(parseInt(req.params.id)));
});

app.post("/addPokemon/", (req, res) => {
  // Add pokemon
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
