export interface BaseMonster {
  monsterLevel: number;
  baseHealth: () => number;
}

export interface Monster {
  healthMulti: number;
  monsterHealth: number;
}
