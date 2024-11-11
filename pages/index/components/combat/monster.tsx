import React, { PropsWithChildren, useEffect, useRef } from "react"
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

  const loopCount = useRef(0)

  function gameLoop() {
    loopCount.current++
    console.log("50ms")

    // const autoDamage = playerCalc.getAutoDamage()
    // if (autoDamage > 0) {
    //   dispatch(takeDamage(autoDamage))
    //   dispatch(increaseTotalDamageDealt(autoDamage))
    // }

    // 200ms
    if (loopCount.current % 4 === 0) {
    }

    // 500ms
    if (loopCount.current % 10 === 0) {
    }

    // 1 second
    if (loopCount.current % 20 === 0) {
    }

    // 2 seconds
    if (loopCount.current % 40 === 0) {
    }
  }

  useEffect(() => {
    const loop = setInterval(() => gameLoop(), 50)
    return () => {
      clearInterval(loop)
    }
  }, [])

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
