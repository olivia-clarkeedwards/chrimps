import { Enemy } from "./monsters"
export interface BaseZone {
  zoneLength?: number
  zoneNumber: number
  monsters: Enemy[]
}

export interface ZoneConfig {
  length: number
}
