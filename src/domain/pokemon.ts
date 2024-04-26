import { Element } from "./Types";

export type Pokemon = {
  id: number;
  num: string;
  name: string;
  type: Element[];
  heightInMeters: number;
  weightInKilos: number;
  candy_count?: number;
  eggDistanceInKm?: number;
  spawnChance: number;
  averageSpawns: number;
  spawnTimeInSeconds: number;
  weaknesses: Element[];
  next_evolution: { num: string; name: string }[];
};
