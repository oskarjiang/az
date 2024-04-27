import { Sort } from "mongodb";

export const getSort = (sortableProperty: string): Sort => {
  switch (sortableProperty) {
    case "id":
      return { id: 1 };
    case "num":
      return { num: 1 };
    case "name":
      return { name: 1 };
    case "height":
      return { height: 1 };
    case "weight":
      return { weight: 1 };
    case "candy_count":
      return { candy_count: 1 };
    case "egg":
      return { egg: 1 };
    case "spawn_chance":
      return { spawn_chance: 1 };
    case "avg_spawns":
      return { avg_spawns: 1 };
    case "spawn_time":
      return { spawn_time: 1 };
    default:
      return {};
  }
};
