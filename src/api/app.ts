import express from "express";
import {
  addPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonsByType,
  getSuggestedPokemonById,
} from "../application/PokemonService";
import { check, validationResult } from "express-validator";
import { isElement } from "../domain/Types";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { FillDatabase } from "../db/FillDatabase";

const app = express();
app.use(express.json());
const port = 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Pokemon: {
          type: "object",
          properties: {
            id: { type: "number", example: 152 },
            num: { type: "string", example: "152" },
            name: { type: "string", example: "MewOnePointFive" },
            img: { type: "string", example: "" },
            type: {
              type: "array",
              items: { type: "string" },
              example: ["Psychic"],
            },
            height: { type: "string", example: "0.7m" },
            weight: { type: "string", example: "6.9kg" },
            candy: { type: "string", example: "MewOnePointFive Candy" },
            candy_count: { type: "number", example: 25 },
            egg: { type: "string", example: "2km" },
            spawn_chance: { type: "number", example: 0.69 },
            avg_spawns: { type: "number", example: 69 },
            spawn_time: { type: "string", example: "20:00" },
            multipliers: { type: ["number", "null"], example: [1.58] },
            weaknesses: {
              type: "array",
              items: { type: "string" },
              example: ["Bug", "Ghost", "Dark"],
            },
            prev_evolution: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  num: { type: "string", example: "151" },
                  name: { type: "string", example: "Mew" },
                },
              },
              example: [{ num: "151", name: "Mew" }],
            },
            next_evolution: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  num: { type: "string", example: "150" },
                  name: { type: "string", example: "Mewtwo" },
                },
              },
              example: [{ num: "150", name: "Mewtwo" }],
            },
          },
        },
      },
    },
  },
  apis: ["./src/api/app.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /getById/{id}:
 *   get:
 *     summary: Get Pokemon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Pokemon
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid ID
 */
app.get("/getById/:id", check("id").isNumeric(), async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).send("Id is not a number");
  }
  res.send(await getPokemonById(parseInt(req.params?.id)));
});

/**
 * @swagger
 * /getByType/{type}/{sortOn}:
 *   get:
 *     summary: Get Pokemons by type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Type of the Pokemon
 *         schema:
 *           type: string
 *       - in: path
 *         name: sortOn
 *         required: true
 *         description: Attribute to sort on
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the Pokemons
 *       400:
 *         description: Invalid type provided
 */
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

/**
 * @swagger
 * /getByName/{name}:
 *   get:
 *     summary: Get a Pokemon by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the Pokemon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the Pokemon
 *       400:
 *         description: Name must be at least three characters
 */
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

/**
 * @swagger
 * /getSuggested/{id}:
 *   get:
 *     summary: Get suggested Pokemon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Pokemon
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the suggested Pokemon
 */
app.get("/getSuggested/:id", async (req, res) => {
  res.send(await getSuggestedPokemonById(parseInt(req.params.id)));
});

/**
 * @swagger
 * /addPokemon:
 *   post:
 *     summary: Add a new Pokemon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pokemon'
 *     responses:
 *       200:
 *         description: Successfully added the Pokemon
 *       400:
 *         description: Bad request
 */
app.post("/addPokemon", async (req, res) => {
  try {
    await addPokemon(req.body);
    res.status(200).send("Success");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  FillDatabase();
  return console.log(`Express is listening at http://localhost:${port}`);
});
