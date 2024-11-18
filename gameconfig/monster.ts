import { BaseEnemy, Enemy, MonsterType, BaseMonsterConfig } from "../models/monsters"

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
  healthMulti
  image
  health
  goldValue

  constructor(config: MonsterType, zoneNumber: number, stageNumber: number) {
    super(zoneNumber, stageNumber)
    this.name = config.name
    this.healthMulti = config.healthMulti
    this.image = config.imagePath
    this.health = Math.floor(this.baseHealth * this.healthMulti)
    const goldMulti = (config.goldMulti ??= 1)
    const { healthDivisor, healthMultiBonus } = MONSTER_CONFIG.gold
    this.goldValue = Math.floor((this.baseHealth / healthDivisor) * (this.healthMulti * healthMultiBonus) * goldMulti)
  }
}

export function getRandomMonster(zoneNumber = 1, stageNumber = 1): Enemy {
  const randomMonster =
    stageNumber !== 30
      ? MONSTER_VARIATIONS[Math.floor(Math.random() * MONSTER_VARIATIONS.length)]
      : BOSS_VARIATIONS[Math.floor(Math.random() * BOSS_VARIATIONS.length)]
  return new Monster(randomMonster, zoneNumber, stageNumber)
}
