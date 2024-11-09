import React, { PropsWithChildren, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { increaseGold, selectClickBaseDamage, selectClickMultiUpgradeCount } from "../../../../redux/playerSlice"
import { playerCalc } from "../../../../gameconfig/upgrades"
import {
  selectMonsterAlive,
  selectMonsterGoldValue,
  selectMonsterImage,
  selectMonsterName,
  spawnMonster,
  takeClickDamage,
} from "../../../../redux/monsterSlice"
import {
  increaseTotalClickDamageDealt,
  incrementClickCount,
  incrementHighestZoneEver,
  incrementKillCount,
  incrementZonesCompleted,
  selectHighestZoneEver,
  selectKillCount,
} from "../../../../redux/statsSlice"
import { incrementZoneNumber, selectZoneNumber } from "../../../../redux/zoneSlice"
import { Enemy } from "../../../../models/monsters"
import { getRandomMonster } from "../../../../gameconfig/monster"

export default function Monster({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()

  const clickBaseDamage = useAppSelector(selectClickBaseDamage)
  const clickMultiUpgradeCount = useAppSelector(selectClickMultiUpgradeCount)
  const clickDamage = playerCalc.clickDamage(clickBaseDamage, clickMultiUpgradeCount)

  const currentStage = (useAppSelector(selectKillCount) + 1) % 30
  let zone = useAppSelector(selectZoneNumber)
  const highestZoneEver = useAppSelector(selectHighestZoneEver)

  const monsterName = useAppSelector(selectMonsterName)
  const monsterImage = useAppSelector(selectMonsterImage)
  const monsterValue = useAppSelector(selectMonsterGoldValue)
  const monsterAlive = useAppSelector(selectMonsterAlive)

  function handleClick() {
    dispatch(incrementClickCount())
    dispatch(increaseTotalClickDamageDealt(clickDamage))
    dispatch(takeClickDamage(clickDamage))
    // Goto useEffect if monster died
  }

  useEffect(() => {
    if (!monsterAlive) {
      dispatch(incrementKillCount())
      dispatch(increaseGold(monsterValue))
      if (currentStage === 29) {
        dispatch(incrementZonesCompleted())
        dispatch(incrementZoneNumber())
        zone > highestZoneEver && dispatch(incrementHighestZoneEver())
        const newMonster = getRandomMonster(zone, 30) as Enemy
        dispatch(spawnMonster({ ...newMonster, alive: true }))
      } else {
        console.log(zone, currentStage)
        const newMonster = getRandomMonster(zone, currentStage + 1) as Enemy
        dispatch(spawnMonster({ ...newMonster, alive: true }))
      }
    }
  }, [monsterAlive])

  return (
    <>
      <div className="absolute top-[-4%] text-black">
        Debug: monsterValue: {monsterValue} Stage: {currentStage} Zone: {zone}, clickDamage: {clickDamage}
      </div>
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
        <div className="">{monsterName}</div>
        <div className="text-center">{children}</div>
      </div>
      <div
        className="absolute h-[80%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={handleClick}>
        <img className="h-full w-full object-contain" src={monsterImage} />
      </div>
    </>
  )
}
