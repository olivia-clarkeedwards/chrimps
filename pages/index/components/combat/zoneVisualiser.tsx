import React from "react"

export default function ZoneVisualiser() {
  const stages = Array.from({ length: 30 }, (cur, acc) => acc + 1)

  return (
    <div className="flex absolute bottom-0 w-[40rem] m-2 flex-wrap-reverse content-start border-2 border-gray-300 box-content">
      {stages.map((stageNumber) => (
        <div key={stageNumber} className="h-8 w-16 border-2 border-gray-300 flex items-center justify-center text-sm">
          {stageNumber}
        </div>
      ))}
    </div>
  )
}
