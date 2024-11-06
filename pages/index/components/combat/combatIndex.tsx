import Healthbar from "./healthbar"
import Monster from "./monster"

export default function Combat() {
  return (
    <div className="flex justify-center text-white basis-2/5 relative min-h-[66svh] bg-gradient-to-b from-purple-800 via-purple-900 to-violet-950">
      <Monster>
        <Healthbar />
      </Monster>
      <div className="absolute bottom-1">Stage visualiser</div>
    </div>
  )
}
