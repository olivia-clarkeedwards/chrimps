import Healthbar from "./healthbar"
import Monster from "./monster"
import ZoneMap from "./zoneMap"
import ZoneSelector from "./zoneSelector"

export default function Combat() {
  return (
    <div className="flex flex-col justify-center min-h-[92svh] md:min-h-[80svh] text-white basis-4/5 md:basis-2/5 bg-gradient-to-b from-purple-800 via-purple-900 to-violet-950">
      <div className="flex basis-1/6">
        <ZoneSelector />
      </div>
      <div className="basis-5/6 flex flex-col items-center relative">
        <Monster>
          <Healthbar />
        </Monster>
        <ZoneMap />
      </div>
    </div>
  )
}
