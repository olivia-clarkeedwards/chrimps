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
  incrementHighestZone,
  incrementHighestZoneEver,
  incrementKillCount,
  incrementZonesCompleted,
  selectHighestZone,
  selectHighestZoneEver,
} from "../../redux/statsSlice"
import {
  incrementStageNumber,
  zoneComplete as zoneComplete,
  selectFarmZoneMonsters,
  selectFarmZoneNumber,
  selectIsFarming,
  selectStage,
  selectZoneInView,
  selectZoneMonsters,
  selectZoneNumber,
  refreshFarmZone,
  selectFarmStage,
} from "../../redux/zoneSlice"
import { ZONE_CONFIG } from "../../gameconfig/zone"
import { store } from "../../redux/store"
import { EnemyState } from "../../models/monsters"
import { FarmToggleIcon } from "../svg/metaIcons"
import e from "express"

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
  const farmZoneNumber = useAppSelector(selectFarmZoneNumber)
  const farmStageNumber = useAppSelector(selectFarmStage)
  const zoneInView = useAppSelector(selectZoneInView)
  const isFarming = useAppSelector(selectIsFarming)
  const highestZoneEver = useAppSelector(selectHighestZoneEver)
  const highestZone = useAppSelector(selectHighestZone)
  const monsters = useAppSelector(selectZoneMonsters)
  const farmZoneMonsters = useAppSelector(selectFarmZoneMonsters)

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
      let nextMonster: undefined | EnemyState

      const isProgressing = zoneInView === currentZone
      const stageNumber = isProgressing ? currentStage : farmStageNumber

      // End of zone
      if (stageNumber === zoneLength) {
        // If highest zone this run
        if (isProgressing) {
          dispatch(zoneComplete())
          dispatch(incrementZonesCompleted())
          dispatch(incrementHighestZone())
          currentZone > highestZoneEver && dispatch(incrementHighestZoneEver())
          nextMonster = selectZoneMonsters(store.getState())[0]

          // If farming is toggled, continue on this zone
          if (isFarming) {
            dispatch(refreshFarmZone())
            const farmZoneMonsters = selectFarmZoneMonsters(store.getState())
            if (farmZoneMonsters) nextMonster = farmZoneMonsters[0]
          }

          // If we are not unlocking a new zone with farming toggled
        } else if (isFarming) {
          dispatch(refreshFarmZone())
          const farmZoneMonsters = selectFarmZoneMonsters(store.getState())
          if (farmZoneMonsters) nextMonster = farmZoneMonsters[0]
        } else {
          throw "Logic error during highest zone transition"
        }

        // Ordinary case; no zone transition
      } else {
        dispatch(incrementStageNumber())
        if (isFarming && farmZoneMonsters) {
          nextMonster = farmZoneMonsters[stageNumber]
        } else {
          nextMonster = monsters[stageNumber]
        }
      }

      // Spawn the next monster
      if (!nextMonster) {
        throw "The next monster is undefined"
      } else {
        dispatch(spawnMonster(nextMonster))
      }
    }
  }, [monsterAlive])

  useEffect(() => {
    // On isFarming, transition to or from farming
    let nextMonster: EnemyState
    if (isFarming && currentZone !== zoneInView) {
      // Load monster from farming zone and zone number and length data
      if (farmZoneMonsters) {
        nextMonster = farmZoneMonsters[farmZoneNumber]
      } else {
        throw "Failed to initialise farming zone"
      }
    } else {
      // Transition back to current stage
      nextMonster = monsters[currentStage]
    }
    dispatch(spawnMonster(nextMonster))
  }, [isFarming])

  return (
    <>
      <div className="absolute bottom-[16%] text-white">
        Debug: monsterValue: {monsterValue} Stage: {currentStage} zoneinview: {zoneInView} clickDamage: {clickDamage}{" "}
        dotDamage: {dotDamage} zone: {currentZone} farmzone: {farmZoneNumber} farmstage: {farmStageNumber}
      </div>
      <div className="basis-2/12 flex flex-col w-full items-center">
        <div className="relative flex w-full justify-center">
          <div className="">{monsterName}</div>
          <div className="absolute right-2 w-8 h-8 text-white">{FarmToggleIcon()}</div>
        </div>
        <div className="text-left inline-block min-w-[100px] pl-[2.5rem]">{children}</div>
      </div>
      <div className="flex items-end h-[32rem] flex-auto" onClick={handleClick}>
        <img
          className="max-h-full h-full w-full object-contain pointer-events-none"
          src={monsterImage}
          alt={monsterName}
        />
      </div>
    </>
  )
}
