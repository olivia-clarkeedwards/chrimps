import { Enemy } from "../models/monsters"
import { BaseZone, ZoneConfig } from "../models/zones"
import { getRandomMonster } from "./monster"

export const ZONE_CONFIG: ZoneConfig = {
  length: 30,
}
export class zone implements BaseZone {
  zoneLength = ZONE_CONFIG.length
  zoneNumber = 1
  Monsters = [] as Enemy[]

  constructor(currentZoneNumber: number, zoneLength?: number) {
    const length = (zoneLength ??= this.zoneLength)
    for (let i = 0; i < length; i++) {
      this.Monsters.push(getRandomMonster(currentZoneNumber, i + 1))
    }
  }
}
