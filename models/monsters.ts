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
  goldMulti?: number
  imagePath: string
}

interface HealthConfig {
  base: number
  growth: number
  smoothing: number
}

interface GoldConfig {
  healthDivisor: number
  healthMultiBonus: number
}

export interface BaseMonsterConfig {
  health: HealthConfig
  gold: GoldConfig
}
