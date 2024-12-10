import React from "react"
import { useAppSelector } from "../../redux/hooks"
import {
  selectStage,
  selectCurrentZoneLength,
  selectZoneMonsters,
  selectFarmStage,
  selectFarmZoneMonsters,
  selectFarmZoneLength,
  selectZoneInView,
  selectFarmZoneNumber,
} from "../../redux/zoneSlice"
import clsx from "clsx/lite"
import { BossIcon, CookieEnjoyerIcon, MoneybagIcon } from "../svg/stageIcons"

export default function ZoneMap() {
  const isFarmZone = useAppSelector(selectZoneInView) === useAppSelector(selectFarmZoneNumber)
  const farmZoneMonsters = useAppSelector(selectFarmZoneMonsters)
  const zoneLength = isFarmZone ? useAppSelector(selectFarmZoneLength) : useAppSelector(selectCurrentZoneLength)
  const stages = Array.from({ length: zoneLength }, (cur, acc) => acc + 1)

  const currentStage = isFarmZone && farmZoneMonsters ? useAppSelector(selectFarmStage) : useAppSelector(selectStage)
  const monsters =
    isFarmZone && farmZoneMonsters ? useAppSelector(selectFarmZoneMonsters) : useAppSelector(selectZoneMonsters)
  if (!monsters) throw "Failed to retrieve monsters for zone"

  const getIcon = (stageNumber: number): JSX.Element | undefined => {
    const monster = monsters[stageNumber]
    switch (monster.kind) {
      case "rare":
        if (monster.name === "Treasure Goblin") return MoneybagIcon()
        break
      case "boss":
        return BossIcon()
      default:
        return undefined
    }
  }

  return (
    <div className="grid grid-cols-10 gap-1 w-full h-30 scale-x-[-1]">
      {stages.reverse().map((stageIndex) => (
        <div
          key={stageIndex}
          className={clsx(
            "flex relative h-8 w-full border-2 border-gray-300 items-center justify-center rounded-md",
            stageIndex < currentStage && "bg-islam",
            stageIndex === currentStage && stageIndex !== zoneLength && "bg-yellow-500",

            stageIndex > currentStage && stageIndex !== zoneLength && "bg-gray-800",
            !isFarmZone && stageIndex === zoneLength && stageIndex !== currentStage && "bg-red-600",
            !isFarmZone && stageIndex === zoneLength && stageIndex === currentStage && "bg-orange-400",
            isFarmZone && farmZoneMonsters && stageIndex === zoneLength && "bg-gray-800",
            isFarmZone &&
              farmZoneMonsters &&
              stageIndex === currentStage &&
              stageIndex === zoneLength &&
              "bg-yellow-500",
          )}>
          <div className="flex bg-gradient-to-tr from-white/30 to-blue-700/20 w-full h-full items-center justify-center">
            <div className="w-7 fill-white">{getIcon(stageIndex - 1)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
