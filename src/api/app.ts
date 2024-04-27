import express from "express";
import {
  getPokemonById,
  getPokemonByName,
  getPokemonsByType,
  getSuggestedPokemonById,
} from "../application/PokemonService";
import { check, validationResult } from "express-validator";
import { isElement } from "../domain/Types";
import { add } from "../infrastructure/PokemonRepository";
const app = express();
const port = 3000;

app.get("/getById/:id", check("id").isNumeric(), async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).send("Id is not a number");
  }
  res.send(await getPokemonById(parseInt(req.params?.id)));
});

app.get(
  "/getByType/:type/:sortOn",
  check("type").custom(isElement),
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).send("Invalid type");
    }
    res.send(await getPokemonsByType(req.params?.type, req.params?.sortOn));
  }
);

app.get(
  "/getByName/:name",
  check("name").isLength({ min: 3 }),
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).send("Name must be at least three characters");
    }
    res.send(await getPokemonByName(req.params?.name));
  }
);

app.get("/getSuggested/:id", async (req, res) => {
  res.send(await getSuggestedPokemonById(parseInt(req.params.id)));
});

app.post("/addPokemon/", async (req, res) => {
  try {
    await add(req.body);
    res.status(200);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
