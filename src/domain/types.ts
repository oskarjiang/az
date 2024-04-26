export type Element =
  | "Grass"
  | "Poison"
  | "Water"
  | "Bug"
  | "Flying"
  | "Normal"
  | "Electric"
  | "Ground"
  | "Psychic"
  | "Fairy"
  | "Fighting"
  | "Rock"
  | "Ice"
  | "Ghost"
  | "Dragon"
  | "Dark";

export function isElement(element: string): element is Element {
  return [
    "Grass",
    "Poison",
    "Water",
    "Bug",
    "Flying",
    "Normal",
    "Electric",
    "Ground",
    "Psychic",
    "Fairy",
    "Fighting",
    "Rock",
    "Ice",
    "Ghost",
    "Dragon",
    "Dark",
  ].includes(element as Element);
}
