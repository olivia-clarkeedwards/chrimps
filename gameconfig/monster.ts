import e from "express"
import { BaseEnemy, Enemy, MonsterType, BaseMonsterConfig, EnemyState } from "../models/monsters"
import { ZONE_CONFIG } from "./zone"

const MONSTER_CONFIG: BaseMonsterConfig = {
  health: {
    base: 10,
    growth: 1.1,
    smoothing: 6,
  },
  gold: {
    healthDivisor: 4,
    healthMultiBonus: 1.5,
  },
  regularSpawnChance: 0.97,
  // attack etc.
}

const MONSTER_VARIATIONS: MonsterType[] = [
  { name: "Slime", kind: "regular", healthMulti: 1, imagePath: "/monsters/ph-slime.png" },
  { name: "Worm", kind: "regular", healthMulti: 1.05, imagePath: "/monsters/ph-worm.png" },
  { name: "Cacodemon", kind: "regular", healthMulti: 1.1, imagePath: "/monsters/ph-cacodemon.png" },
  { name: "Yeti", kind: "regular", healthMulti: 1.2, imagePath: "/monsters/ph-yeti.png" },
]

const BOSS_VARIATIONS: MonsterType[] = [
  { name: "Tooth", kind: "boss", healthMulti: 2, imagePath: "/monsters/ph-boss-tooth.png" },
]
const SPECIAL_VARIATIONS: MonsterType[] = [
  {
    name: "Treasure Goblin",
    kind: "special",
    healthMulti: 0.5,
    goldMulti: 20,
    imagePath: "/monsters/ph-treasure-monster.webp",
  },
]
class BaseMonster implements BaseEnemy {
  level = 0
  basehealth = 0
  get baseHealth(): number {
    const { base, growth, smoothing } = MONSTER_CONFIG.health
    return base * Math.sqrt(this.level) * Math.pow(growth, this.level / smoothing)
  }

  constructor(zoneNumber: number, stageNumber: number, isBoss: boolean) {
    this.level = (zoneNumber - 1) * ZONE_CONFIG.length + stageNumber
    if (isBoss) this.level += 20
  }
}

class Monster extends BaseMonster implements Enemy {
  name
  kind
  health
  image
  goldValue

  constructor(config: MonsterType, zoneNumber: number, stageNumber: number, isBoss: boolean) {
    super(zoneNumber, stageNumber, isBoss)
    this.name = config.name
    this.kind = config.kind
    const healthMulti = config.healthMulti
    this.health = Math.floor(this.baseHealth * healthMulti)
    this.image = config.imagePath
    const goldMulti = (config.goldMulti ??= 1)
    const { healthDivisor, healthMultiBonus } = MONSTER_CONFIG.gold
    this.goldValue = Math.floor((this.baseHealth / healthDivisor) * (healthMulti * healthMultiBonus) * goldMulti)
  }
}

export function getRandomMonster(zoneNumber = 1, stageNumber = 1, isBoss = false, specialMonsterBonus = 0): EnemyState {
  let randomMonster: MonsterType
  if (isBoss) {
    randomMonster = BOSS_VARIATIONS[Math.floor(Math.random() * BOSS_VARIATIONS.length)]
  } else {
    const randomValue = Math.random()
    const regularSpawnChance = MONSTER_CONFIG.regularSpawnChance * Math.pow(0.99, specialMonsterBonus)
    randomMonster =
      regularSpawnChance > randomValue
        ? MONSTER_VARIATIONS[Math.floor(Math.random() * MONSTER_VARIATIONS.length)]
        : SPECIAL_VARIATIONS[Math.floor(Math.random() * SPECIAL_VARIATIONS.length)]
  }
  const newMonster = serializableMonster(new Monster(randomMonster, zoneNumber, stageNumber, isBoss))
  return newMonster
}

export function getMonster(monsterName: string, zoneNumber = 1, stageNumber = 1, isBoss = false): EnemyState {
  const allMonsters = MONSTER_VARIATIONS.concat(BOSS_VARIATIONS, SPECIAL_VARIATIONS)
  for (const monster of allMonsters) {
    if (monster.name === monsterName) return serializableMonster(new Monster(monster, zoneNumber, stageNumber, isBoss))
  }
  throw new Error(`Monster not found: ${monsterName}`)
}

function serializableMonster(monster: Monster): EnemyState {
  const serializable = {
    name: monster.name,
    kind: monster.kind,
    level: monster.level,
    health: monster.health,
    goldValue: monster.goldValue,
    image: monster.image,
  }
  return serializable
}
