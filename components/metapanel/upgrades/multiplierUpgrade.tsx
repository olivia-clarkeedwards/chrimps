import React, { useEffect, useState } from "react"
import clsx from "clsx/lite"

interface MultiplierProps {
  id: string
  icon: JSX.Element
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  isAffordable: boolean
  isPurchased: boolean
  hidden: boolean
}

export default function MultiplierUpgrade({ id, icon, onClick, hidden, isAffordable, isPurchased }: MultiplierProps) {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    if (!hidden && !shouldMount) {
      setShouldMount(true)
      setTimeout(() => console.log("animation finished"), 1000)
    }
  }, [hidden])

  return (
    <div
      id={id}
      className={clsx(
        "relative cursor-pointer ring-2 ring-offset-2 rounded-lg ring-amber-800 opacity-0 transition-opacity, duration-1000",
        hidden && "invisible",
        !hidden && "opacity-100",
        !isPurchased && !isAffordable && "ring-offset-yellow-600 opacity-60",
        isPurchased || !isAffordable ? "ring-offset-yellow-700" : "ring-offset-yellow-300",
      )}
      onClick={onClick}>
      <div
        className={clsx(
          "absolute",
          "inset-0",
          "bg-gradient-to-br",
          "from-amber-600",
          "to-amber-800",
          "rounded-lg",
          isAffordable && !isPurchased ? "opacity-100" : "opacity-30",
        )}
      />
      {isPurchased && <div className="absolute inset-[2px] bg-amber-950/60 rounded-md z-10" />}
      <div className="relative z-20 w-8 h-8 flex items-center justify-center p-1 text-amber-400">{icon}</div>
    </div>
  )
}
