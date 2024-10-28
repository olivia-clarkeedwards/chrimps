import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import {
  increaseTotalClickDamage,
  incrementClickCount,
  incrementHighestZoneEver,
  incrementKillCount,
  incrementTotalZonesCompleted,
  selectClickCount,
  selectHighestZoneEver,
  selectKillCount,
  selectTotalZonesCompleted,
} from "../../../../redux/statsSlice"
import {
  spawnMonster,
  takeClickDamage,
  selectMonsterImage,
  selectMonsterLevel,
  selectMonsterName,
  selectMonsterAlive,
} from "../../../../redux/monsterSlice"
import { incrementZoneNumber, selectZoneNumber } from "../../../../redux/zoneSlice"
import { selectClickDamage } from "../../../../redux/playerSlice"
import { getRandomMonster } from "../../../../gameconfig/monster"
import { Enemy } from "../../../../models/monsters"
import Healthbar from "./healthbar"

export default function Combat() {
  const clickDamage = useAppSelector(selectClickDamage)
  const zone = useAppSelector(selectZoneNumber)

  // Move this garbage to an achievements page
  const clickCount = useAppSelector(selectClickCount)
  const killCount = useAppSelector(selectKillCount)
  const totalZonesCompleted = useAppSelector(selectTotalZonesCompleted)
  const highestZoneEver = useAppSelector(selectHighestZoneEver)

  const monsterName = useAppSelector(selectMonsterName)
  const monsterLevel = useAppSelector(selectMonsterLevel)
  const monsterAlive = useAppSelector(selectMonsterAlive)
  const monsterImage = useAppSelector(selectMonsterImage)
  const dispatch = useAppDispatch()

  function clickHandler() {
    dispatch(incrementClickCount())
    dispatch(increaseTotalClickDamage(clickDamage))
    dispatch(takeClickDamage(clickDamage))
    // Goto useEffect if monster died
  }
  useEffect(() => {
    if (!monsterAlive) {
      dispatch(incrementKillCount())
      dispatch(incrementTotalZonesCompleted())
      dispatch(incrementZoneNumber())
      // Zone does not update immediately
      zone + 1 > highestZoneEver && dispatch(incrementHighestZoneEver())
      const newMonster = getRandomMonster({ zoneNumber: zone }) as Enemy
      dispatch(spawnMonster({ ...newMonster, alive: true }))
    }
  }, [monsterAlive])

  return (
    // Move healthbar to the top
    <div className="flex justify-center basis-2/5 relative min-h-[66svh] bg-slate-500">
      <div
        className="absolute h-[80%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={clickHandler}>
        <img className="h-full w-full object-contain" src={monsterImage} />
      </div>
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-[-4.5rem]">
        {monsterName} <Healthbar />
      </div>
      <div>
        Debug: Mlvl: {monsterLevel}, Zone: {zone}, Clickdamage: {clickDamage}
      </div>
    </div>
    // Stage visualiser at the bottom
  )
}
