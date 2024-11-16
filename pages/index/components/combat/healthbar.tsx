import React from "react"
import { useAppSelector } from "../../../../redux/hooks"
import { selectMonsterHealth } from "../../../../redux/monsterSlice"
import { selectDotLevel } from "../../../../redux/playerSlice"

export default function Healthbar() {
  const monsterHealth = useAppSelector(selectMonsterHealth)
  const dotLevel = useAppSelector(selectDotLevel)

  let decimals = {}

  if (!dotLevel) {
    decimals = { minimumFractionDigits: 0, maximumFractionDigits: 1 }
  } else {
    decimals = { minimumFractionDigits: 1, maximumFractionDigits: 1 }
  }

  const healthDisplay =
    monsterHealth < 100
      ? monsterHealth.toLocaleString(undefined, { ...decimals })
      : monsterHealth.toLocaleString(undefined, { maximumFractionDigits: 0 })

  return <> {healthDisplay}</>
}
