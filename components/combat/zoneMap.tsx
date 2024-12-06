import React from "react"
import { useAppSelector } from "../../redux/hooks"
import {
  selectStage,
  selectCurrentZoneLength,
  selectZoneMonsters,
  selectIsFarming,
  selectFarmStage,
  selectFarmZoneMonsters,
  selectFarmZoneLength,
} from "../../redux/zoneSlice"
import clsx from "clsx/lite"
import { BossIcon, CookieEnjoyerIcon, MoneybagIcon } from "../svg/stageIcons"

export default function ZoneMap() {
  const isFarming = useAppSelector(selectIsFarming)
  const zoneLength = isFarming ? useAppSelector(selectFarmZoneLength) : useAppSelector(selectCurrentZoneLength)
  const stages = Array.from({ length: zoneLength }, (cur, acc) => acc + 1)

  const currentStage = isFarming ? useAppSelector(selectFarmStage) : useAppSelector(selectStage)
  const monsters = isFarming ? useAppSelector(selectFarmZoneMonsters) : useAppSelector(selectZoneMonsters)
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
    <div className="flex basis-3/12 md:basis-2/12 items-end opacity-100">
      <div className="flex w-[20rem] md:w-[40rem] lg:w-[40rem] mb-1 md:m-2 flex-wrap-reverse content-start border-2 border-gray-300 box-content z-10">
        {stages.map((stageIndex) => (
          <div
            key={stageIndex}
            className={clsx(
              "flex relative h-8 w-16 border-2 border-gray-300 flex items-center justify-center",
              stageIndex < currentStage && "bg-islam",
              stageIndex === currentStage && stageIndex !== zoneLength && "bg-yellow-500",

              stageIndex > currentStage && stageIndex !== zoneLength && "bg-gray-800",
              !isFarming && stageIndex === zoneLength && stageIndex !== currentStage && "bg-red-600",
              !isFarming && stageIndex === zoneLength && stageIndex === currentStage && "bg-orange-400",
              isFarming && stageIndex === zoneLength && "bg-gray-800",
              isFarming && stageIndex === currentStage && stageIndex === zoneLength && "bg-yellow-500",
            )}>
            <div className="flex bg-gradient-to-tr from-white/30 to-blue-700/20 w-full h-full items-center justify-center">
              <div className="w-7 fill-white">{getIcon(stageIndex - 1)}</div>
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  )
}
