import { BaseMonster, Monster } from "../models/monsters";

const monster: BaseMonster = {
  monsterLevel: 1,
  baseHealth: () => Math.floor(Math.pow(1.2, monster.monsterLevel) + 9),
};

export const slime: Monster = {
  healthMulti: 1,
  get monsterHealth() {
    return monster.baseHealth() * this.healthMulti;
  },
};

export const cacodemon: Monster = {
  healthMulti: 1.1,
  get monsterHealth() {
    return monster.baseHealth() * this.healthMulti;
  },
};

export const yeti: Monster = {
  healthMulti: 1.2,
  get monsterHealth() {
    return monster.baseHealth() * this.healthMulti;
  },
};

export const worm: Monster = {
  healthMulti: 1.05,
  get monsterHealth() {
    return monster.baseHealth() * this.healthMulti;
  },
};
