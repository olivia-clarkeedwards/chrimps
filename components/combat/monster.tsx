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
  selectStage,
  selectZoneMonsters,
  selectZoneNumber,
} from "../../redux/zoneSlice"
import { ZONE_CONFIG } from "../../gameconfig/zone"
import { store } from "../../redux/store"
import { EnemyState } from "../../models/monsters"

export default function Monster({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()
  const tickCount = useRef(0)
  const lastFrameTime = useRef(performance.now())
  const frameRef = useRef<number>()
  const TICK_RATE = 20
  const TICK_TIME = 1000 / TICK_RATE

  const clickLevel = useAppSelector(selectClickLevel)
  const clickMultiUpgradeCount = useAppSelector(selectClickMultiUpgradeCount)
  const clickDamage = playerCalc.clickDamage(clickLevel, clickMultiUpgradeCount)
  const dotLevel = useAppSelector(selectDotLevel)
  const dotMultiUpgradeCount = useAppSelector(selectDotMultiUpgradeCount)
  const dotDamage = playerCalc.dotDamage(dotLevel, dotMultiUpgradeCount)

  const zoneLength = ZONE_CONFIG.length
  const currentStage = useAppSelector(selectStage)
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
  const runTasks = useCallback(() => {
    // 200ms
    if (tickCount.current % 4 === 0) {
    }

    // 500ms
    if (tickCount.current % 10 === 0) {
    }

    // 1 second
    if (tickCount.current % 20 === 0) {
      checkAchievements()
    }

    // 2 seconds
    if (tickCount.current % 40 === 0) {
    }

    // 10 seconds
    if (tickCount.current % 200 === 0) {
      // dispatch(updateLastPlayed)
    }
  }, [checkAchievements])

  const dealDamageOverTime = useCallback(() => {
    if (dotDamage) {
      const damageThisTick = dotDamage / 20
      dispatch(increaseTotalDotDamageDealt(damageThisTick))
      dispatch(takeDamage(damageThisTick))
    }
  }, [dotDamage])

  const gameLoop = useCallback(
    (currentTime: number) => {
      let delta = currentTime - lastFrameTime.current

      // Todo: if delta > [a large number] then do fullscreen catchup

      while (delta >= TICK_TIME) {
        tickCount.current++
        dealDamageOverTime()
        runTasks()
        delta -= TICK_TIME
      }

      // Todo: if tickCount % [frequency] dispatch update last time online

      lastFrameTime.current = currentTime - delta
      frameRef.current = requestAnimationFrame(gameLoop)
    },
    [dealDamageOverTime, runTasks],
  )

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (frameRef.current) cancelAnimationFrame(frameRef.current)
      } else {
        // The setTimeout seems to prevent extra loops between document hidden and document visible
        setTimeout(() => {
          frameRef.current = requestAnimationFrame(gameLoop)
        }, 0)
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [dealDamageOverTime, runTasks])

  useEffect(() => {
    frameRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [gameLoop])

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

      if (currentStage === zoneLength) {
        dispatch(incrementZonesCompleted())
        currentZone > highestZoneEver && dispatch(incrementHighestZoneEver())
        dispatch(incrementZoneNumber())
        nextMonster = selectZoneMonsters(store.getState())[0]
      } else {
        dispatch(incrementStageNumber())
        nextMonster = monsters[currentStage]
      }
      dispatch(spawnMonster(nextMonster))
    }
  }, [monsterAlive])

  return (
    <div className="basis-10/12">
      <div className="absolute top-[-24%] text-black">
        Debug: monsterValue: {monsterValue} Stage: {currentStage} Zone: {currentZone}, clickDamage: {clickDamage},
        dotDamage: {dotDamage}
      </div>
      <div className="absolute flex flex-col items-center top-1 left-1/2 transform -translate-x-1/2">
        <div className="">{monsterName}</div>
        <div className="text-left inline-block min-w-[100px] pl-[38%]">{children}</div>
      </div>
      <div className="" onClick={handleClick}>
        <img className="h-full w-full object-cover pointer-events-none" src={monsterImage} alt={monsterName} />
      </div>
    </div>
  )
}
