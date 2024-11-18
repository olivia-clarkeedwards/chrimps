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

export interface MonsterConfig {
  name: string
  healthMulti: number
  imagePath: string
}

type HealthConfig = {
  base: number
  growth: number
  smoothing: number
}

type GoldConfig = {
  healthDivisor: number
  healthMultiBonus: number
}
export interface BaseMonsterConfig {
  health: HealthConfig
  gold: GoldConfig
}
