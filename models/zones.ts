import { MonsterConfig } from "./monsters"
export interface BaseZone {
  zoneLength: number
  zoneNumber: number
  Monsters: MonsterConfig[]
}

export interface ZoneConfig {
  length: 30
}
