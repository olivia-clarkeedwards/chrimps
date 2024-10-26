import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementClicks, increaseTotalClickDamage, statsSlice } from "../../redux/statsSlice";
import { getRandomMonster } from "../../gameconfig/monster";

export default function Combat() {
  const clicks = useAppSelector((state) => state.stats.clicks);
  const dispatch = useAppDispatch();

  const randomMonster = getRandomMonster();

  function clickHandler(e: React.MouseEvent<HTMLDivElement>) {
    dispatch(statsSlice.actions.incrementClicks());
  }

  return (
    <div className="flex justify-center basis-2/5 relative min-h-[66svh] bg-slate-500">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={clickHandler}>
        <img className="h-96" src={randomMonster.image} />
      </div>
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-[-4.5rem]">
        {randomMonster.monsterHealth} {clicks}
      </div>
    </div>
  );
}
