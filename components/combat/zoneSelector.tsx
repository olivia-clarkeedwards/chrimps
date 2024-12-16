import React from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import clsx from "clsx/lite"
import { selectZoneState, zoneSelection } from "../../redux/zoneSlice"

export default function ZoneSelector() {
  const dispatch = useAppDispatch()
  const { currentZoneNumber, zoneInView } = useAppSelector(selectZoneState)

  const selectedZones = Array.from({ length: 5 }, (cur, acc) => acc + 1)

  function handleZoneChange(e: React.MouseEvent<HTMLDivElement>) {
    const [elementName, deltaSuffix] = e.currentTarget.id.split(".")
    const zoneDelta = Number(deltaSuffix) - 1
    dispatch(zoneSelection(zoneDelta))
  }

  const opacitySteps = ["opacity-100", "opacity-90", "opacity-80", "opacity-70", "opacity-60"]
  const scaleSteps = ["scale-100", "scale-95", "scale-90", "scale-85", "scale-80"]

  return (
    <div className="flex justify-around flex-row-reverse h-20 my-2 md:mx-8 lg:mx-12 border-2 rounded-xl border-white bg-black bg-opacity-30 w-full gap-2 py-2 px-4">
      {selectedZones.map((zoneIndex) => {
        const thisZoneNumber = currentZoneNumber - zoneIndex + 1

        return (
          <div
            key={`outer.${zoneIndex}`}
            id={`zone-delta.${zoneIndex}`}
            className={clsx(
              "flex h-16 w-[7.111rem] border-4",
              scaleSteps[zoneIndex - 1],
              zoneInView === thisZoneNumber ? "border-yellow-500" : "border-gray-800",
            )}
            onClick={handleZoneChange}>
            <div
              key={`inner.${zoneIndex}`}
              className={clsx(
                "flex justify-center h-full w-full bg-[url('/icons/meadow.jpg')] bg-no-repeat bg-cover text-black text-xl",
                opacitySteps[zoneIndex - 1],
              )}>
              {`${thisZoneNumber}`}
            </div>
          </div>
        )
      })}
    </div>
  )
}
