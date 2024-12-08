import React from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import clsx from "clsx/lite"
import { selectZoneInView, selectZoneNumber, zoneSelection } from "../../redux/zoneSlice"

export default function ZoneSelector() {
  const dispatch = useAppDispatch()
  const currentZone = useAppSelector(selectZoneNumber)
  const zoneInView = useAppSelector(selectZoneInView)
  const selectedZones = Array.from({ length: 5 }, (cur, acc) => acc + 1)

  function handleZoneChange(e: React.MouseEvent<HTMLDivElement>) {
    const [elementName, deltaSuffix] = e.currentTarget.id.split(".")
    const zoneDelta = Number(deltaSuffix) - 1
    dispatch(zoneSelection(zoneDelta))
  }

  const opacitySteps = ["opacity-100", "opacity-85", "opacity-70", "opacity-55", "opacity-40"]
  const scaleSteps = ["scale-100", "scale-95", "scale-90", "scale-85", "scale-80"]

  return (
    <div className="flex flex-row-reverse w-full gap-2 py-2 px-4">
      {selectedZones.map((zoneIndex) => {
        const thisZoneNumber = currentZone - zoneIndex + 1

        return (
          <div
            className={clsx(
              "flex h-14 w-full border-4",
              scaleSteps[zoneIndex - 1],
              zoneInView === thisZoneNumber ? "border-yellow-500 bg-opacity-100" : "border-gray-800",
            )}>
            <div
              key={zoneIndex}
              id={`zone-delta.${zoneIndex}`}
              className={clsx("flex justify-center h-full w-full text-black bg-white", opacitySteps[zoneIndex - 1])}
              onClick={handleZoneChange}>
              {`Zone ${thisZoneNumber}`}
            </div>
          </div>
        )
      })}
    </div>
  )
}
