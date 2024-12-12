import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { increaseGold, selectClickDamage, selectDotDamage, selectPlayerState } from "../../redux/playerSlice"
import { selectMonsterState, spawnMonster, takeDamage } from "../../redux/monsterSlice"
import {
  increaseTotalClickDamageDealt,
  increaseTotalDotDamageDealt,
  incrementClickCount,
  incrementHighestZone,
  incrementHighestZoneEver,
  incrementKillCount,
  incrementZonesCompleted,
  selectHighestZoneEver,
} from "../../redux/statsSlice"
import {
  selectZoneState,
  incrementStageNumber,
  zoneComplete,
  refreshFarmZone,
  setZoneInView,
} from "../../redux/zoneSlice"
import { ZONE_CONFIG } from "../../gameconfig/zone"
import { store } from "../../redux/store"
import { EnemyState } from "../../models/monsters"
import FarmToggle from "./farmToggle"

export default function Monster({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch()

  const { clickLevel } = useAppSelector(selectPlayerState)
  const clickDamage = useAppSelector(selectClickDamage)
  const dotDamage = useAppSelector(selectDotDamage)

  const zoneLength = ZONE_CONFIG.length
  const {
    currentZoneNumber: currentZone,
    zoneMonsters,
    stageNumber: currentStage,
    isFarming,
    farmZoneMonsters,
    farmZoneNumber,
    farmStageNumber,
    zoneInView,
  } = useAppSelector(selectZoneState)
  const highestZoneEver = useAppSelector(selectHighestZoneEver)

  const { monsterName, monsterGoldValue, monsterImage, monsterAlive } = useAppSelector(selectMonsterState)

  const tickCount = useRef(0)
  const lastFrameTime = useRef(performance.now())
  const frameRef = useRef<number>()
  const TICK_RATE = 20
  const TICK_TIME = 1000 / TICK_RATE

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
      dispatch(increaseGold(monsterGoldValue))
      let nextMonster: undefined | EnemyState

      const isProgressing = zoneInView === currentZone
      const stageNumber = isProgressing ? currentStage : farmStageNumber

      // Zone transition
      if (stageNumber === zoneLength) {
        // When highest zone
        if (isProgressing) {
          dispatch(zoneComplete())
          dispatch(incrementZonesCompleted())
          dispatch(incrementHighestZone())
          currentZone > highestZoneEver && dispatch(incrementHighestZoneEver())

          // Highest zone & farming toggled; zone transition in place
          if (isFarming) {
            const newFarmZoneMonsters = selectZoneState(store.getState()).farmZoneMonsters
            if (newFarmZoneMonsters) nextMonster = newFarmZoneMonsters[0]
          }

          // If farming or not farming when not highest zone
        } else if (zoneInView < currentZone && isFarming && farmZoneMonsters) {
          dispatch(refreshFarmZone())
          const newFarmZoneMonsters = selectZoneState(store.getState()).farmZoneMonsters
          if (newFarmZoneMonsters) nextMonster = newFarmZoneMonsters[0]
        } else if (zoneInView < currentZone && !isFarming) {
          dispatch(setZoneInView(currentZone))
        } else {
          throw new Error("Logic error during highest zone transition")
        }

        // Stage transition
      } else {
        dispatch(incrementStageNumber())
        if (zoneInView < currentZone && farmZoneMonsters) {
          nextMonster = farmZoneMonsters[stageNumber]
        } else {
          nextMonster = zoneMonsters[stageNumber]
        }
      }
      if (nextMonster) dispatch(spawnMonster(nextMonster))

      // Finally, spawn the next monster
    }
  }, [monsterAlive])

  useEffect(() => {
    // On zoneInView change, transition to or from farming
    let nextMonster: undefined | EnemyState
    if (farmZoneNumber === zoneInView && farmZoneMonsters) {
      nextMonster = farmZoneMonsters[0]
    } else if (currentZone === zoneInView) {
      nextMonster = zoneMonsters[0]
    }
    if (nextMonster) {
      dispatch(spawnMonster(nextMonster))
    } else {
      throw new Error("Monster undefined during zone transition")
    }
  }, [zoneInView])

  return (
    <>
      <div className="absolute bottom-[16%] text-white">
        Debug: monsterGoldValue: {monsterGoldValue} Stage: {currentStage} zoneinview: {zoneInView} clickDamage:{" "}
        {clickDamage} dotDamage: {dotDamage} zone: {currentZone} farmzone: {farmZoneNumber} farmstage: {farmStageNumber}
      </div>
      <div className="basis-2/12 flex flex-col w-full items-center">
        <div className="relative flex w-full justify-center">
          <div className="">{monsterName}</div>
          <FarmToggle />
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
