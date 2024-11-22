import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectStage, selectZoneLength, selectZoneMonsters } from "../../redux/zoneSlice"
import clsx from "clsx/lite"
import { ClickMultiIcon1 } from "../svg/click-icons"

export default function ZoneVisualiser() {
  const zoneLength = useAppSelector(selectZoneLength)
  const stages = Array.from({ length: zoneLength }, (cur, acc) => acc + 1)

  const currentStage = useAppSelector(selectStage)
  const monsters = useAppSelector(selectZoneMonsters)
  console.log(monsters)

  const getIcon = (stageNumber: number): JSX.Element | undefined => {
    switch (monsters[stageNumber].name) {
      case "Treasure Goblin":
        return ClickMultiIcon1()
        break
      default:
        return undefined
    }
  }

  return (
    <div className="flex items-end opacity-100">
      <div className="flex w-[20rem] md:w-[40rem] lg:w-[40rem] mb-1 md:m-2 flex-wrap-reverse content-start border-2 border-gray-300 box-content z-10">
        {stages.map((stageIndex) => (
          <div
            key={stageIndex}
            className={clsx(
              "relative h-8 w-16 border-2 border-gray-300 flex items-center justify-center",
              stageIndex < currentStage && "bg-islam text-yellow-400 text-sm",
              stageIndex === currentStage && stageIndex !== zoneLength && "text-base text-gray-500 bg-yellow-400",
              stageIndex > currentStage && stageIndex !== zoneLength && "bg-gray-800 text-sm",
              stageIndex === zoneLength && stageIndex !== currentStage && "bg-red-600 text-sm",
              stageIndex === zoneLength && stageIndex === currentStage && "text-base text-gray-500 bg-orange-400",
            )}>
            {getIcon(stageIndex - 1)}
          </div>
        ))}
      </div>
    </div>
  )
}
