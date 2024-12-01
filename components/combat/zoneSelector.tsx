import React from "react"
import clsx from "clsx/lite"
import { useAppSelector } from "../../redux/hooks"
import { selectZoneNumber } from "../../redux/zoneSlice"

export default function ZoneSelector() {
  const currentZone = useAppSelector(selectZoneNumber)
  const selectedZones = Array.from({ length: 5 }, (cur, acc) => acc + 1)

  function handleZoneChange(e: React.MouseEvent<HTMLDivElement>) {
    const [elementName, delta] = e.currentTarget.id.split(".")
    // Make delta a number
    console.log(delta)
  }

  // Todo: Vary size
  // Todo: Vary opacity
  // Todo: Opacity gradient
  return (
    <div className="flex flex-row-reverse w-full gap-3 py-2 px-4">
      {selectedZones.map((zoneIndex) => (
        <div
          key={zoneIndex}
          id={`zone-delta.${zoneIndex}`}
          className="h-14 w-full bg-white border"
          onClick={handleZoneChange}></div>
      ))}
    </div>
  )
}
