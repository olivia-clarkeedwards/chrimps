import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { increaseTotalClickDamage, incrementClickCount, selectClicks } from "../../redux/statsSlice";
import {
  selectMonsterHealth,
  selectMonsterImage,
  selectMonsterLevel,
  selectMonsterName,
  spawnMonster,
  takeClickDamage,
} from "../../redux/monsterSlice";
import { getRandomMonster } from "../../gameconfig/monster";
import { Enemy } from "../../models/monsters";

export default function Combat() {
  const clicks = useAppSelector(selectClicks);
  const monsterName = useAppSelector(selectMonsterName);
  const monsterLevel = useAppSelector(selectMonsterLevel);
  const monsterHealth = useAppSelector(selectMonsterHealth); // Test if this is causing the entire component to rerender, possibly move to child component
  const monsterImage = useAppSelector(selectMonsterImage);
  const dispatch = useAppDispatch();
  const clickDamage = 1; // Replace with click damage from player state

  function clickHandler() {
    dispatch(incrementClickCount());
    dispatch(takeClickDamage(clickDamage));
    dispatch(increaseTotalClickDamage(clickDamage));
    checkGameCondition(clickDamage);
  }

  function checkGameCondition(incomingDamage: number) {
    if (monsterHealth - incomingDamage < 1) spawnNewMonster();
  }

  function spawnNewMonster() {
    const monsta = getRandomMonster({ stageNumber: 2 }) as Enemy;
    dispatch(spawnMonster({ ...monsta }));
  }

  return (
    <div className="flex justify-center basis-2/5 relative min-h-[66svh] bg-slate-500">
      <div
        className="absolute h-[80%] w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={clickHandler}
      >
        <img className="h-full w-full object-contain" src={monsterImage} />
      </div>
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-[-4.5rem]">
        Level {monsterLevel} {monsterName} health: {monsterHealth} clicks: {clicks}
      </div>
    </div>
  );
}
