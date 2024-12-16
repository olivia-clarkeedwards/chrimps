import React, { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectMonsterHealth, selectMonsterMaxHealth } from "../../redux/monsterSlice"
import { selectPlayerState } from "../../redux/playerSlice"
import clsx from "clsx"

export default function Healthbar() {
  const monsterHealth = useAppSelector(selectMonsterHealth)
  const monsterMaxHealth = useAppSelector(selectMonsterMaxHealth)

  const targetHealth = useRef((monsterHealth / monsterMaxHealth) * 100)
  const interpRate = 5
  const [width, setWidth] = useState(100)
  const frameRef = useRef<number>()

  useEffect(() => {
    targetHealth.current = (monsterHealth / monsterMaxHealth) * 100

    function animateHealth() {
      setWidth((currentWidth) => {
        const diff = targetHealth.current - currentWidth

        if (Math.abs(diff) < 0.8) {
          return targetHealth.current
        }

        return currentWidth + diff / interpRate
      })
      frameRef.current = requestAnimationFrame(animateHealth)
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current)

    frameRef.current = requestAnimationFrame(animateHealth)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [monsterHealth, monsterMaxHealth])

  return (
    <div className="h-8 w-48 border border-black">
      <div
        className={clsx("h-full bg-gradient-to-b rounded-sm from-hpgreen to-darkgreen transform-gpu")}
        style={{ width: `${Math.max(0, Math.min(100, width))}%` }}></div>
    </div>
  )
}
