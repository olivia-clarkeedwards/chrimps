import clsx from "clsx/lite"
import React, { useEffect } from "react"
import { selectZoneNumber } from "../../../../redux/zoneSlice"
import { useAppSelector } from "../../../../redux/hooks"

export default function ZoneVisualiser() {
  const stages = Array.from({ length: 30 }, (cur, acc) => acc + 1)

  const currentStage = useAppSelector(selectZoneNumber)

  return (
    <div className="flex absolute bottom-0 w-[40rem] m-2 flex-wrap-reverse content-start border-2 border-gray-300 box-content">
      {stages.map((stageNumber) => (
        <div
          key={stageNumber}
          className="relative h-8 w-16 border-2 border-gray-300 flex items-center justify-center text-sm">
          <div
            className={clsx("absolute w-full h-full border-2", stageNumber === currentStage && "border-yellow-400")}
          />
          {stageNumber}
        </div>
      ))}
    </div>
  )
}
