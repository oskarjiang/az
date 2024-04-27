import express from "express";
import {
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  getPokemonsByType,
  getSuggestedPokemonById,
} from "../application/PokemonService";
const app = express();
const port = 3000;

app.get("/", async (_req, res) => {
  res.send(await getAllPokemons());
});

app.get("/getById/:id", async (req, res) => {
  res.send(await getPokemonById(parseInt(req.params.id)));
});

app.get("/getByType/:type/:sortOn", async (req, res) => {
  res.send(await getPokemonsByType(req.params.type, req.params.sortOn));
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
