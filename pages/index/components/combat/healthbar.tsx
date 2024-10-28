import React from "react"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { selectMonsterHealth } from "../../../../redux/monsterSlice"

export default function Healthbar() {
  const monsterHealth = useAppSelector(selectMonsterHealth)

  return monsterHealth
}
