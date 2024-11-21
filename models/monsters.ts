export interface BaseEnemy {
  level: number
  baseHealth: number
}

export interface Enemy {
  name: string
  health: number
  goldValue: number
  image: string
}

export interface MonsterType {
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
  regularSpawnChance: number
}

export interface EnemyState extends Enemy {
  level: number
}
