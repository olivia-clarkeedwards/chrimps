import clsx from "clsx/lite"
import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectKillCount } from "../../redux/statsSlice"

export default function ZoneVisualiser() {
  const stages = Array.from({ length: 30 }, (cur, acc) => acc + 1)

  const stage = ((useAppSelector(selectKillCount) + 1) % 30) as number
  const currentStage = stage || 30

  return (
    <div className="flex items-end opacity-100">
      <div className="flex w-[20rem] md:w-[40rem] lg:w-[40rem] mb-1 md:m-2 flex-wrap-reverse content-start border-2 border-gray-300 box-content z-10">
        {stages.map((stageNumber) => (
          <div
            key={stageNumber}
            className={clsx(
              "relative h-8 w-16 border-2 border-gray-300 flex items-center justify-center",
              stageNumber < currentStage && "bg-islam text-yellow-400 text-sm",
              stageNumber === currentStage && stageNumber !== 30 && "text-base text-gray-500 bg-yellow-400",
              stageNumber > currentStage && stageNumber !== 30 && "bg-gray-800 text-sm",
              stageNumber === 30 && stageNumber !== currentStage && "bg-red-600 text-sm",
              stageNumber === 30 && stageNumber === currentStage && "text-base text-gray-500 bg-orange-400",
            )}>
            {stageNumber}
          </div>
        ))}
      </div>
    </div>
  )
}
