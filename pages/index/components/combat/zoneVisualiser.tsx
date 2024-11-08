import clsx from "clsx/lite"
import React, { useEffect } from "react"
import { selectZoneNumber } from "../../../../redux/zoneSlice"
import { useAppSelector } from "../../../../redux/hooks"

export default function ZoneVisualiser() {
  const stages = Array.from({ length: 30 }, (cur, acc) => acc + 1)

  const currentStage = useAppSelector(selectZoneNumber)

  return (
    <div className="flex items-end">
      <div className="flex w-[20rem] md:w-[40rem] lg:w-[40rem] md:m-2 flex-wrap-reverse content-start border-2 border-gray-300 box-content">
        {stages.map((stageNumber) => (
          <div
            key={stageNumber}
            className={clsx(
              "relative h-8 w-16 border-2 border-gray-300 flex items-center justify-center",
              stageNumber === currentStage ? "text-base text-gray-500 bg-yellow-400" : "bg-gray-500 text-sm",
            )}>
            {stageNumber}
          </div>
        ))}
      </div>
    </div>
  )
}
