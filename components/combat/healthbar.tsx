import React, { useEffect } from "react"
import { useAppSelector } from "../../redux/hooks"
import { selectMonsterHealth, selectMonsterMaxHealth } from "../../redux/monsterSlice"
import { selectPlayerState } from "../../redux/playerSlice"
import clsx from "clsx"

export default function Healthbar() {
  const monsterHealth = useAppSelector(selectMonsterHealth)
  const monsterMaxHealth = useAppSelector(selectMonsterMaxHealth)
  const { dotLevel } = useAppSelector(selectPlayerState)

  return (
    <div className="h-8 w-48 border border-black">
      <div className={clsx("h-full w-[100%] bg-gradient-to-b rounded-sm from-hpgreen to-darkgreen")}></div>
    </div>
  )
}
