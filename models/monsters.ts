export interface BaseEnemy {
  level: number;
  baseHealth: number;
}

export interface Enemy extends BaseEnemy {
  name: string;
  healthMulti: number;
  health: number;
  image: string;
}
