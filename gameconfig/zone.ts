import { BaseZone, ZoneConfig } from "../models/zones"

export const ZONE_CONFIG: ZoneConfig = {
  length: 30,
}
export class zone implements BaseZone {
  zoneLength = ZONE_CONFIG.length
  zoneNumber = 1
  Monsters = []
}
