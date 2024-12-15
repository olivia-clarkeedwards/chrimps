import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectZoneState } from "../../redux/zoneSlice"
import clsx from "clsx/lite"
import { BossIcon, CookieEnjoyerIcon, MoneybagIcon } from "../svg/stageIcons"

export default function ZoneMap() {
  const {
    currentZoneLength,
    zoneMonsters,
    stageNumber,
    farmZoneMonsters,
    farmZoneNumber,
    farmZoneLength,
    farmStageNumber,
    zoneInView,
  } = useAppSelector(selectZoneState)

  const isFarmZone = zoneInView === farmZoneNumber
  const zoneLength = isFarmZone ? farmZoneLength : currentZoneLength
  const stages = Array.from({ length: zoneLength }, (cur, acc) => acc + 1)

  const currentStage = isFarmZone && farmZoneMonsters ? farmStageNumber : stageNumber
  const monsters = isFarmZone && farmZoneMonsters ? farmZoneMonsters : zoneMonsters
  if (!monsters) throw new Error("Failed to retrieve monsters for zone")

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
    <div className="bg-gray-300 rounded grid grid-cols-10 w-full h-30 scale-x-[-1]">
      {stages.reverse().map((stageIndex) => (
        <div
          key={stageIndex}
          className={clsx(
            "flex relative h-8 w-full border-2 border-gray-300 items-center justify-center rounded",
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

function Sphere({ color, icon }: { color: string; icon?: JSX.Element }) {
  return (
    <div className="relative w-6 h-6 ">
      {color !== "grey" ? (
        <div
          className={`absolute hover:animate-spin top-0 left-0 w-6 h-6 bg-gradient-to-br rounded-full shadow-2xl overflow-clip
          ${color === "green" ? "from-green-400 to-green-900" : color === "yellow" ? "from-yellow-400 to-yellow-800" : color === "grey" ? "from-gray-400 to-gray-800" : color === "red" ? "from-red-400 to-red-800" : "from-orange-400 to-orange-800"}`}>
          <div className="absolute w-7 fill-white">{icon}</div>
        </div>
      ) : (
        <div className={`absolute flex items-center justify-center top-0 left-0 w-6 h-6 `}>
          <div className="w-7 fill-white">{icon}</div>
        </div>
      )}
    </div>
  )
}
