export interface BaseEnemy {
  monsterLevel: number;
  health: number;
}

export interface Enemy extends BaseEnemy {
  healthMulti: number;
  monsterHealth: number;
  monsterImage: string;
}
