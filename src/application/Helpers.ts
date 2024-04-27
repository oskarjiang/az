import { PokemonDocument } from "../infrastructure/Documents/PokemonDocument";
import { getByNum } from "../infrastructure/PokemonRepository";

export const pickRandomItemInArray = (array: any[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getPrevEvolutions = async (pokemon: PokemonDocument) => {
  const prevEvolutions = [];
  if (pokemon.prev_evolution) {
    for (let index = 0; index < pokemon.prev_evolution.length; index++) {
      const previousEvolution = await getByNum(
        pokemon.prev_evolution[index].num
      );
      prevEvolutions.push(previousEvolution);
    }
  }
  return prevEvolutions;
};

export const getNextEvolutions = async (pokemon: PokemonDocument) => {
  const nextEvolutions = [];
  if (pokemon.next_evolution) {
    for (let index = 0; index < pokemon.next_evolution.length; index++) {
      const nextEvolution = await getByNum(pokemon.next_evolution[index].num);
      nextEvolutions.push(nextEvolution);
    }
  }
  return nextEvolutions;
};
