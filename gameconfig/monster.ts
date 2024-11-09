import { BaseEnemy, Enemy } from "../models/monsters"

interface MonsterConfiguration {
  name: string
  healthMulti: number
  imagePath: string
}

class BaseMonster implements BaseEnemy {
  level = 0
  get baseHealth(): number {
    return Math.pow(1.1, this.level) + 9
  }

  constructor(zoneNumber: number, stageNumber: number) {
    this.level = zoneNumber * stageNumber
    if (stageNumber === 30) this.level *= 20
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
    this.health = Math.floor(this.baseHealth * this.healthMulti * stageNumber)
    this.goldValue = Math.floor((this.baseHealth / 3) * (this.healthMulti * 1.5))
  }
}

const MONSTER_VARIATIONS: MonsterConfiguration[] = [
  { name: "Slime", healthMulti: 1, imagePath: "/monsters/ph-slime.png" },
  { name: "Worm", healthMulti: 1.05, imagePath: "/monsters/ph-worm.png" },
  { name: "Cacodemon", healthMulti: 1.1, imagePath: "/monsters/ph-cacodemon.png" },
  { name: "Yeti", healthMulti: 1.2, imagePath: "/monsters/ph-yeti.png" },
]

export function getRandomMonster(zoneNumber = 1, stageNumber = 1): Monster {
  const randomMonster = MONSTER_VARIATIONS[Math.floor(Math.random() * MONSTER_VARIATIONS.length)]
  return new Monster(randomMonster, zoneNumber, stageNumber)
}
