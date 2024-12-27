import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  increaseGold,
  increasePlasma,
  selectClickDamage,
  selectDotDamage,
  selectPlayerState,
} from "../../redux/playerSlice"
import { selectMonsterAlive, selectMonsterState, spawnMonster } from "../../redux/monsterSlice"
import {
  increaseTotalClickDamageDealt,
  increaseTotalDotDamageDealt,
  incrementClickCount,
  incrementFarmZonesCompleted,
  incrementKillCount,
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

  const { monsterName, monsterGoldValue, monsterPlasmaValue, monsterImage, monsterAlive } =
    useAppSelector(selectMonsterState)

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
    }
  }, [dotDamage])

  const onMonsterDeath = () => {
    const {
      currentZoneNumber: currentZone,
      zoneMonsters,
      stageNumber: currentStage,
      isFarming,
      farmZoneMonsters,
      farmStageNumber,
      zoneInView,
    } = selectZoneState(store.getState())
    const { monsterGoldValue, monsterPlasmaValue } = selectMonsterState(store.getState())

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
        if (currentZone > 9) dispatch(increasePlasma(monsterPlasmaValue))

        // Highest zone & farming toggled; zone transition in place
        if (isFarming) {
          const newFarmZoneMonsters = selectZoneState(store.getState()).farmZoneMonsters
          if (newFarmZoneMonsters) nextMonster = newFarmZoneMonsters[0]
        }

        // When farming and farming is toggled, continue; else goto zoneInView useEffect block
      } else if (zoneInView < currentZone) {
        dispatch(incrementFarmZonesCompleted())
        if (isFarming && farmZoneMonsters) {
          dispatch(refreshFarmZone())
          const newFarmZoneMonsters = selectZoneState(store.getState()).farmZoneMonsters
          if (newFarmZoneMonsters) nextMonster = newFarmZoneMonsters[0]
        } else if (!isFarming) {
          dispatch(setZoneInView(currentZone))
        } else throw new Error("Logic error during farm zone transition")
      } else throw new Error("Logic error during highest zone transition")

      // Stage transition case
    } else {
      dispatch(incrementStageNumber())
      if (zoneInView < currentZone && farmZoneMonsters) {
        nextMonster = farmZoneMonsters[stageNumber]
      } else {
        nextMonster = zoneMonsters[stageNumber]
      }
    }
    // Spawn the next monster when we didn't jump to zoneInView transition
    if (nextMonster) dispatch(spawnMonster(nextMonster))
  }

  const gameLoop = useCallback(
    (currentTime: number) => {
      let delta = currentTime - lastFrameTime.current

      // Todo: if delta > [a large number] then do fullscreen catchup

      while (delta >= TICK_TIME) {
        tickCount.current++
        dealDamageOverTime()
        runTasks()

        const monsterDied = selectMonsterAlive(store.getState()) === false
        if (monsterDied) onMonsterDeath()

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
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current)
          frameRef.current = undefined // Explicitly set to undefined
        }
      } else {
        setTimeout(() => {
          if (!frameRef.current) {
            frameRef.current = requestAnimationFrame(gameLoop)
          }
        }, 0)
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [gameLoop])

  useEffect(() => {
    frameRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [gameLoop])

  function handleClick() {
    dispatch(incrementClickCount())
    dispatch(increaseTotalClickDamageDealt(clickDamage))
    // Goto !monsterAlive useEffect if monster died
  }

  useEffect(() => {
    if (!monsterAlive) onMonsterDeath()
  }, [monsterAlive, onMonsterDeath])

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
    } else throw new Error("Monster undefined during zone transition")
  }, [zoneInView])

  return (
    <>
      <div className="absolute bottom-[16%] text-white">
        Debug: monsterGoldValue: {monsterGoldValue} Stage: {currentStage} zoneinview: {zoneInView} clickDamage:{" "}
        {clickDamage} dotDamage: {dotDamage} zone: {currentZone} farmzone: {farmZoneNumber} farmstage: {farmStageNumber}{" "}
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="relative flex w-full justify-center text-2xl">
          <div className="text-center">{monsterName}</div>
        </div>
        <div className="">{children}</div>
      </div>
      <button className="flex flex-grow items-end h-[27rem] max-h-[34rem] hover:cursor-dagger" onClick={handleClick}>
        <img
          className="max-h-full h-full w-full object-cover lg:object-contain pointer-events-none"
          src={monsterImage}
          alt={monsterName}
        />
      </button>
    </>
  )
}
