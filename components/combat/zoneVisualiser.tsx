import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectStage, selectZoneLength } from "../../redux/zoneSlice"
import clsx from "clsx/lite"

export default function ZoneVisualiser() {
  const zoneLength = useAppSelector(selectZoneLength)
  const stages = Array.from({ length: zoneLength }, (cur, acc) => acc + 1)

  const currentStage = useAppSelector(selectStage)

  return (
    <div className="flex items-end opacity-100">
      <div className="flex w-[20rem] md:w-[40rem] lg:w-[40rem] mb-1 md:m-2 flex-wrap-reverse content-start border-2 border-gray-300 box-content z-10">
        {stages.map((stageNumber) => (
          <div
            key={stageNumber}
            className={clsx(
              "relative h-8 w-16 border-2 border-gray-300 flex items-center justify-center",
              stageNumber < currentStage && "bg-islam text-yellow-400 text-sm",
              stageNumber === currentStage && stageNumber !== zoneLength && "text-base text-gray-500 bg-yellow-400",
              stageNumber > currentStage && stageNumber !== zoneLength && "bg-gray-800 text-sm",
              stageNumber === zoneLength && stageNumber !== currentStage && "bg-red-600 text-sm",
              stageNumber === zoneLength && stageNumber === currentStage && "text-base text-gray-500 bg-orange-400",
            )}>
            {stageNumber}
          </div>
        ))}
      </div>
    </div>
  )
}
