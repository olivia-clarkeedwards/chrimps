import Healthbar from "./healthbar"
import Monster from "./monster"

export default function Combat() {
  return (
    <div className="flex justify-center basis-2/5 relative min-h-[66svh] bg-slate-500">
      <Monster>
        <Healthbar />
      </Monster>
      <div className="absolute bottom-1">Stage visualiser</div>
    </div>
  )
}
