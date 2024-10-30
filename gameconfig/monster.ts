import { BaseEnemy, Enemy } from "../models/monsters"
import { BaseZone } from "../models/zones"
import { zone } from "./zone"

class BaseMonster implements BaseEnemy {
  level = 0
  get baseHealth(): number {
    return Math.pow(1.2, this.level) + 9
  }

  constructor(zone: BaseZone) {
    this.level = zone.zoneNumber
  }
}

class Monster extends BaseMonster implements Enemy {
  name
  healthMulti
  image
  health
  goldValue

  constructor(name: string, zone: BaseZone, healthMulti: number, imagePath: string) {
    super(zone)
    this.name = name
    this.healthMulti = healthMulti
    this.image = imagePath
    this.health = Math.floor(this.baseHealth * this.healthMulti)
    this.goldValue = Math.floor((this.baseHealth / 10) * (this.healthMulti * 1.5))
  }

  static spawnSlime(zone: BaseZone): Monster {
    return new Monster("Slime", zone, 1, "/ph-slime.png")
  }
  static spawnWorm(zone: BaseZone): Monster {
    return new Monster("Worm", zone, 1.05, "/ph-worm.png")
  }
  static spawnCacodemon(zone: BaseZone): Monster {
    return new Monster("Cacodemon", zone, 1.1, "/ph-cacodemon.png")
  }
  static spawnYeti(zone: BaseZone): Monster {
    return new Monster("Yeti", zone, 1.2, "/ph-yeti.png")
  }
}

export const monsters = [
  (zone: BaseZone) => Monster.spawnSlime(zone),
  (zone: BaseZone) => Monster.spawnWorm(zone),
  (zone: BaseZone) => Monster.spawnCacodemon(zone),
  (zone: BaseZone) => Monster.spawnYeti(zone),
]

export function getRandomMonster(zone: BaseZone): Monster {
  const randomIndex = Math.floor(Math.random() * monsters.length)
  return monsters[randomIndex](zone)
}
