import { BaseEnemy, Enemy, MonsterType, BaseMonsterConfig, EnemyState } from "../models/monsters"

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
  // attack etc.
}

const MONSTER_VARIATIONS: MonsterType[] = [
  { name: "Slime", healthMulti: 1, imagePath: "/monsters/ph-slime.png" },
  { name: "Worm", healthMulti: 1.05, imagePath: "/monsters/ph-worm.png" },
  { name: "Cacodemon", healthMulti: 1.1, imagePath: "/monsters/ph-cacodemon.png" },
  { name: "Yeti", healthMulti: 1.2, imagePath: "/monsters/ph-yeti.png" },
]

const BOSS_VARIATIONS: MonsterType[] = [{ name: "Tooth", healthMulti: 2, imagePath: "/monsters/ph-boss-tooth.png" }]
const SPECIAL_VARIATIONS: MonsterType[] = [
  { name: "Treasure Goblin", healthMulti: 0.5, goldMulti: 20, imagePath: "/monsters/ph-treasure-monster.webp" },
]
class BaseMonster implements BaseEnemy {
  level = 0
  basehealth = 0
  get baseHealth(): number {
    const { base, growth, smoothing } = MONSTER_CONFIG.health
    return base * Math.sqrt(this.level) * Math.pow(growth, this.level / smoothing)
  }

  constructor(zoneNumber: number, stageNumber: number) {
    this.level = (zoneNumber - 1) * 30 + stageNumber
    if (stageNumber === 30) this.level += 20
  }
}

class Monster extends BaseMonster implements Enemy {
  name
  health
  image
  goldValue

  constructor(config: MonsterType, zoneNumber: number, stageNumber: number) {
    super(zoneNumber, stageNumber)
    this.name = config.name
    const healthMulti = config.healthMulti
    this.health = Math.floor(this.baseHealth * healthMulti)
    this.image = config.imagePath
    const goldMulti = (config.goldMulti ??= 1)
    const { healthDivisor, healthMultiBonus } = MONSTER_CONFIG.gold
    this.goldValue = Math.floor((this.baseHealth / healthDivisor) * (healthMulti * healthMultiBonus) * goldMulti)
  }
}

export function getRandomMonster(zoneNumber = 1, stageNumber = 1): EnemyState {
  // all logic to replace regular monster with a special monster - base * Math.pow(0.99, upgradeLvl)
  const randomMonster =
    stageNumber !== 30
      ? MONSTER_VARIATIONS[Math.floor(Math.random() * MONSTER_VARIATIONS.length)]
      : BOSS_VARIATIONS[Math.floor(Math.random() * BOSS_VARIATIONS.length)]
  const newMonster = serializableMonster(new Monster(randomMonster, zoneNumber, stageNumber))
  return newMonster
}

export function getMonster(monsterName: string, zoneNumber = 1, stageNumber = 1): EnemyState {
  const allMonsters = MONSTER_VARIATIONS.concat(BOSS_VARIATIONS, SPECIAL_VARIATIONS)
  for (const monster of allMonsters) {
    if (monster.name === monsterName) return serializableMonster(new Monster(monster, zoneNumber, stageNumber))
  }
  throw new Error(`Monster not found: ${monsterName}`)
}

function serializableMonster(monster: Monster): EnemyState {
  const serializable = {
    name: monster.name,
    level: monster.level,
    health: monster.health,
    goldValue: monster.goldValue,
    image: monster.image,
  }
  return serializable
}
