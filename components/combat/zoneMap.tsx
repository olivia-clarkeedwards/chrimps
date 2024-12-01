import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectStage, selectZoneLength, selectZoneMonsters } from "../../redux/zoneSlice"
import clsx from "clsx/lite"
import { BossIcon, CookieEnjoyerIcon, MoneybagIcon } from "../svg/stageIcons"

export default function ZoneMap() {
  const zoneLength = useAppSelector(selectZoneLength)
  const stages = Array.from({ length: zoneLength }, (cur, acc) => acc + 1)

  const currentStage = useAppSelector(selectStage)
  const monsters = useAppSelector(selectZoneMonsters)

  const getIcon = (stageNumber: number): JSX.Element | undefined => {
    const monster = monsters[stageNumber]
    switch (monster.kind) {
      case "special":
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
              stageIndex === currentStage && stageIndex !== zoneLength && " bg-yellow-500",
              stageIndex > currentStage && stageIndex !== zoneLength && "bg-gray-800",
              stageIndex === zoneLength && stageIndex !== currentStage && "bg-red-600",
              stageIndex === zoneLength && stageIndex === currentStage && "bg-orange-400",
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
