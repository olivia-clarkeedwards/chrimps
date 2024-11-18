import { BaseEnemy, Enemy, MonsterConfiguration } from "../models/monsters"

class BaseMonster implements BaseEnemy {
  level = 0
  get baseHealth(): number {
    const base = 10
    const growth = 1.1
    const smoothing = 6
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

  constructor(config: MonsterConfiguration, zoneNumber: number, stageNumber: number) {
    super(zoneNumber, stageNumber)
    this.name = config.name
    this.healthMulti = config.healthMulti
    this.image = config.imagePath
    this.health = Math.floor(this.baseHealth * this.healthMulti)
    this.goldValue = Math.floor((this.baseHealth / 4) * (this.healthMulti * 1.5))
  }
}

const MONSTER_VARIATIONS: MonsterConfiguration[] = [
  { name: "Slime", healthMulti: 1, imagePath: "/monsters/ph-slime.png" },
  { name: "Worm", healthMulti: 1.05, imagePath: "/monsters/ph-worm.png" },
  { name: "Cacodemon", healthMulti: 1.1, imagePath: "/monsters/ph-cacodemon.png" },
  { name: "Yeti", healthMulti: 1.2, imagePath: "/monsters/ph-yeti.png" },
]

const BOSS_VARIATIONS: MonsterConfiguration[] = [
  { name: "Tooth", healthMulti: 1, imagePath: "/monsters/ph-boss-tooth.png" },
]

export function getRandomMonster(zoneNumber = 1, stageNumber = 1): Monster {
  const randomMonster =
    stageNumber !== 30
      ? MONSTER_VARIATIONS[Math.floor(Math.random() * MONSTER_VARIATIONS.length)]
      : BOSS_VARIATIONS[Math.floor(Math.random() * BOSS_VARIATIONS.length)]
  return new Monster(randomMonster, zoneNumber, stageNumber)
}
