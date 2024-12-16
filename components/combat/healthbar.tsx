import React from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectMonsterHealth } from "../../redux/monsterSlice"
import { selectPlayerState } from "../../redux/playerSlice"

export default function Healthbar() {
  const monsterHealth = useAppSelector(selectMonsterHealth)
  const { dotLevel } = useAppSelector(selectPlayerState)

  return (
    <div className="h-8 w-48">
      <div className="h-full w-full bg-gradient-to-b rounded-sm from-hpgreen to-darkgreen"></div>
    </div>
  )
}
