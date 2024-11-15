import React from "react"
import { useAppSelector } from "../../../../redux/hooks"
import { selectMonsterHealth } from "../../../../redux/monsterSlice"

export default function Healthbar() {
  const monsterHealth = useAppSelector(selectMonsterHealth)

  const healthDisplay =
    monsterHealth < 100
      ? monsterHealth.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })
      : monsterHealth.toLocaleString(undefined, { maximumFractionDigits: 0 })

  return <div className="text-left">{healthDisplay}</div>
}
