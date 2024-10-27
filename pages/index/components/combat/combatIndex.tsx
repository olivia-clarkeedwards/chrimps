import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  increaseTotalClickDamage,
  incrementClickCount,
  incrementKillCount,
  incrementZonesCompleted,
  selectClicks,
  selectKillCount,
  selectZonesCompleted,
} from "../../../../redux/statsSlice";
import {
  selectMonsterImage,
  selectMonsterLevel,
  selectMonsterName,
  spawnMonster,
  takeClickDamage,
  selectMonsterAlive,
} from "../../../../redux/monsterSlice";
import { getRandomMonster } from "../../../../gameconfig/monster";
import { Enemy } from "../../../../models/monsters";
import Healthbar from "./healthbar";

export default function Combat() {
  const clicks = useAppSelector(selectClicks);
  const killCount = useAppSelector(selectKillCount);
  const zonesCompleted = useAppSelector(selectZonesCompleted);

  const monsterName = useAppSelector(selectMonsterName);
  const monsterLevel = useAppSelector(selectMonsterLevel);
  const monsterAlive = useAppSelector(selectMonsterAlive);
  const monsterImage = useAppSelector(selectMonsterImage);
  const dispatch = useAppDispatch();
  const clickDamage = 1; // Replace with click damage from player state

  function clickHandler() {
    dispatch(incrementClickCount());
    dispatch(takeClickDamage(clickDamage));
    dispatch(increaseTotalClickDamage(clickDamage));
  }

  useEffect(() => {
    if (!monsterAlive) {
      dispatch(incrementKillCount());
      dispatch(incrementZonesCompleted());
      // Increase stage, increment stages completed stat, conditional HZE dispatch
      const newMonster = getRandomMonster({ stageNumber: 2 }) as Enemy;
      dispatch(spawnMonster({ ...newMonster, alive: true }));
    }
  }, [monsterAlive]);

  return (
    // Move healthbar to the top
    <div className="flex justify-center basis-2/5 relative min-h-[66svh] bg-slate-500">
      <div
        className="absolute h-[80%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={clickHandler}
      >
        <img className="h-full w-full object-contain" src={monsterImage} />
      </div>
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-[-4.5rem]">
        {monsterName} <Healthbar />
      </div>
      <div>
        Debug: Mlvl: {monsterLevel}, Clickcount: {clicks}, Clickdamage: {clickDamage}, Killcount: {killCount}{" "}
        ZonesCompleted: {zonesCompleted}
      </div>
    </div>
    // Stage visualiser at the bottom
  );
}
