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
  selectMonsterImage,
  selectMonsterLevel,
  selectMonsterName,
  selectMonsterAlive,
  selectMonsterGoldValue,
  takeClickDamage,
} from "../../../../redux/monsterSlice"
import { incrementZoneNumber, selectZoneNumber } from "../../../../redux/zoneSlice"
import { increaseGold, selectClickBaseDamage, selectClickMulti } from "../../../../redux/playerSlice"
import { getRandomMonster } from "../../../../gameconfig/monster"
import { Enemy } from "../../../../models/monsters"
import Healthbar from "./healthbar"
import { playerCalc } from "../../../../gameconfig/upgrades"

export default function Combat() {
  let zone = useAppSelector(selectZoneNumber)
  const clickBaseDamage = useAppSelector(selectClickBaseDamage)
  const clickMulti = useAppSelector(selectClickMulti)
  const clickDamage = playerCalc.clickDamage(useAppSelector((state) => state.player))

  const highestZoneEver = useAppSelector(selectHighestZoneEver)

  const monsterName = useAppSelector(selectMonsterName)
  const monsterLevel = useAppSelector(selectMonsterLevel)
  const monsterValue = useAppSelector(selectMonsterGoldValue)
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
      dispatch(increaseGold(monsterValue))
      dispatch(incrementTotalZonesCompleted())
      dispatch(incrementZoneNumber()) // Zone variable does not update immediately; stale closure
      zone++
      zone > highestZoneEver && dispatch(incrementHighestZoneEver())
      const newMonster = getRandomMonster({ zoneNumber: zone }) as Enemy
      dispatch(spawnMonster({ ...newMonster, alive: true }))
    }
  }, [monsterAlive])

  return (
    // Move healthbar to the top
    <div className="flex justify-center basis-2/5 relative min-h-[66svh] bg-slate-500">
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
        <div className="">{monsterName}</div>
        <div className="text-center">
          <Healthbar />
        </div>
      </div>
      <div
        className="absolute h-[80%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={clickHandler}>
        <img className="h-full w-full object-contain" src={monsterImage} />
      </div>
      <div className="absolute bottom-[-4%]">
        {/* Debug: monsterValue: {monsterValue} Zone: {zone}, clickDamage: {clickDamage} */}
      </div>
    </div>
    // Stage visualiser at the bottom
  )
}
