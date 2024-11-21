import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  increaseGold,
  selectClickLevel,
  selectClickMultiUpgradeCount,
  selectDotLevel,
  selectDotMultiUpgradeCount,
} from "../../redux/playerSlice"
import { playerCalc } from "../../gameconfig/upgrades"
import {
  selectMonsterAlive,
  selectMonsterGoldValue,
  selectMonsterImage,
  selectMonsterName,
  spawnMonster,
  takeDamage,
} from "../../redux/monsterSlice"
import {
  increaseTotalClickDamageDealt,
  increaseTotalDotDamageDealt,
  incrementClickCount,
  incrementHighestZoneEver,
  incrementKillCount,
  incrementZonesCompleted,
  selectHighestZoneEver,
} from "../../redux/statsSlice"
import {
  incrementStageNumber,
  incrementZoneNumber,
  selectStageIndex,
  selectZoneMonsters,
  selectZoneNumber,
} from "../../redux/zoneSlice"
import { ZONE_CONFIG } from "../../gameconfig/zone"
import { store } from "../../redux/store"
import { EnemyState } from "../../models/monsters"

export default function Monster({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()

  const clickLevel = useAppSelector(selectClickLevel)
  const clickMultiUpgradeCount = useAppSelector(selectClickMultiUpgradeCount)
  const clickDamage = playerCalc.clickDamage(clickLevel, clickMultiUpgradeCount)
  const dotLevel = useAppSelector(selectDotLevel)
  const dotMultiUpgradeCount = useAppSelector(selectDotMultiUpgradeCount)
  const dotDamage = playerCalc.dotDamage(dotLevel, dotMultiUpgradeCount)

  const zoneLength = ZONE_CONFIG.length
  const currentStageIndex = useAppSelector(selectStageIndex)
  const currentZone = useAppSelector(selectZoneNumber)
  const highestZoneEver = useAppSelector(selectHighestZoneEver)
  const monsters = useAppSelector(selectZoneMonsters)

  const monsterName = useAppSelector(selectMonsterName)
  const monsterImage = useAppSelector(selectMonsterImage)
  const monsterValue = useAppSelector(selectMonsterGoldValue)
  const monsterAlive = useAppSelector(selectMonsterAlive)

  const checkAchievements = useCallback(() => {
    if (clickLevel > 5) {
      console.log("Achievement unlocked: Click level")
    }
  }, [clickLevel])
  const checkEvents = useCallback(() => {
    // 200ms
    if (loopCount.current % 4 === 0) {
    }

    // 500ms
    if (loopCount.current % 10 === 0) {
    }

    // 1 second
    if (loopCount.current % 20 === 0) {
      checkAchievements()
    }

    // 2 seconds
    if (loopCount.current % 40 === 0) {
    }
  }, [checkAchievements])

  const dealDamageOverTime = useCallback(() => {
    if (dotDamage) {
      const damageThisTick = dotDamage / 20
      dispatch(increaseTotalDotDamageDealt(damageThisTick))
      dispatch(takeDamage(damageThisTick))
    }
  }, [dotDamage])

  const loopCount = useRef(0)

  function gameLoop() {
    loopCount.current++
    dealDamageOverTime()
    checkEvents()
  }

  useEffect(() => {
    const loop = setInterval(() => gameLoop(), 50)
    return () => {
      clearInterval(loop)
    }
  }, [dealDamageOverTime, checkEvents])

  function handleClick() {
    dispatch(incrementClickCount())
    dispatch(increaseTotalClickDamageDealt(clickDamage))
    dispatch(takeDamage(clickDamage))
    // Goto !monsterAlive useEffect if monster died
  }

  useEffect(() => {
    if (!monsterAlive) {
      dispatch(incrementKillCount())
      dispatch(increaseGold(monsterValue))
      let nextMonster: EnemyState

      if (currentStageIndex === zoneLength) {
        dispatch(incrementZonesCompleted())
        currentZone > highestZoneEver && dispatch(incrementHighestZoneEver())
        dispatch(incrementZoneNumber())
        nextMonster = selectZoneMonsters(store.getState())[0]
      } else {
        dispatch(incrementStageNumber())
        nextMonster = monsters[currentStageIndex]
      }
      dispatch(spawnMonster(nextMonster))
    }
  }, [monsterAlive])

  return (
    <>
      <div className="absolute top-[-4%] text-black">
        Debug: monsterValue: {monsterValue} Stage: {currentStageIndex} Zone: {currentZone}, clickDamage: {clickDamage},
        dotDamage: {dotDamage}
      </div>
      <div className="absolute flex flex-col items-center top-1 left-1/2 transform -translate-x-1/2">
        <div className="">{monsterName}</div>
        <div className="text-left inline-block min-w-[100px] pl-[38%]">{children}</div>
      </div>
      <div
        className="absolute h-[80%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={handleClick}>
        <img className="h-full w-full object-contain" src={monsterImage} alt={monsterName} />
      </div>
    </>
  )
}
