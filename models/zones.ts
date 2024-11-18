import { Enemy } from "./monsters"
export interface BaseZone {
  zoneLength: number
  zoneNumber: number
  Monsters: Enemy[]
}

export interface ZoneConfig {
  length: 30
}
