import { ObjectId, WithId } from "mongodb";
import { PokemonDocument } from "../infrastructure/Documents/PokemonDocument";
import { getByNum } from "../infrastructure/PokemonRepository";
import { getNextEvolutions, getPrevEvolutions } from "./Helpers";

jest.mock("../infrastructure/PokemonRepository", () => ({
  getByNum: jest.fn(),
}));

const Bulbasaur: WithId<PokemonDocument> = {
  _id: new ObjectId(),
  id: 1,
  num: "001",
  name: "Bulbasaur",
  img: "http://www.serebii.net/pokemongo/pokemon/001.png",
  type: ["Grass", "Poison"],
  height: "0.71 m",
  weight: "6.9 kg",
  candy: "Bulbasaur Candy",
  candy_count: 25,
  egg: "2 km",
  spawn_chance: 0.69,
  avg_spawns: 69,
  spawn_time: "20:00",
  multipliers: [1.58],
  weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  next_evolution: [
    {
      num: "002",
      name: "Ivysaur",
    },
    {
      num: "003",
      name: "Venusaur",
    },
  ],
};

const Ivysaur: WithId<PokemonDocument> = {
  _id: new ObjectId(),
  id: 2,
  num: "002",
  name: "Ivysaur",
  img: "http://www.serebii.net/pokemongo/pokemon/002.png",
  type: ["Grass", "Poison"],
  height: "0.99 m",
  weight: "13.0 kg",
  candy: "Bulbasaur Candy",
  candy_count: 100,
  egg: "Not in Eggs",
  spawn_chance: 0.042,
  avg_spawns: 4.2,
  spawn_time: "07:00",
  multipliers: [1.2, 1.6],
  weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  prev_evolution: [
    {
      num: "001",
      name: "Bulbasaur",
    },
  ],
  next_evolution: [
    {
      num: "003",
      name: "Venusaur",
    },
  ],
};

const Venusaur: WithId<PokemonDocument> = {
  _id: new ObjectId(),
  id: 3,
  num: "003",
  name: "Venusaur",
  img: "http://www.serebii.net/pokemongo/pokemon/003.png",
  type: ["Grass", "Poison"],
  height: "2.01 m",
  weight: "100.0 kg",
  candy: "Bulbasaur Candy",
  egg: "Not in Eggs",
  spawn_chance: 0.017,
  avg_spawns: 1.7,
  spawn_time: "11:30",
  multipliers: null,
  weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  prev_evolution: [
    {
      num: "001",
      name: "Bulbasaur",
    },
    {
      num: "002",
      name: "Ivysaur",
    },
  ],
};

describe("getPrevEvolutions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of previous evolutions when prev_evolution is present", async () => {
    (getByNum as jest.Mock).mockResolvedValueOnce(Bulbasaur);

    const result = await getPrevEvolutions(Ivysaur);

    expect(result.includes(Bulbasaur)).toBe(true);
    expect(result.includes(Venusaur)).toBe(false);
  });

  it("should return an array of next evolutions when next_evolution is present", async () => {
    (getByNum as jest.Mock).mockResolvedValueOnce(Venusaur);

    const result = await getPrevEvolutions(Ivysaur);

    expect(result.includes(Bulbasaur)).toBe(false);
    expect(result.includes(Venusaur)).toBe(true);
  });

  it("should return empty array of previous evolutions when prev_evolution is not present", async () => {
    const result = await getNextEvolutions(Venusaur);

    expect(result.length).toEqual(0);
  });

  it("should return empty array of next evolutions when next_evolution is not present", async () => {
    const result = await getNextEvolutions(Venusaur);

    expect(result.length).toEqual(0);
  });
});
