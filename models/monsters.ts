export interface BaseEnemy {
  level: number
  baseHealth: number
}

export interface Enemy extends BaseEnemy {
  name: string
  healthMulti: number
  health: number
  goldValue: number
  image: string
}

export interface MonsterConfiguration {
  name: string
  healthMulti: number
  imagePath: string
}
