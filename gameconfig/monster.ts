import { Monster } from "../models/monsters";

export const monster: Monster = {
  monsterLevel: 1,
  monsterHealth: () => Math.floor(Math.pow(1.2, monster.monsterLevel) + 9),
};
