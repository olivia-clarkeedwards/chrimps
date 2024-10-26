import React from "react";
import { monster } from "../../gameconfig/monster";

export default function Combat() {
  function clickHandler(e: React.MouseEvent<HTMLDivElement>) {
    console.log("Monster clicked");
  }
  return (
    <div className="flex justify-center basis-2/5 relative min-h-[66svh] bg-slate-500">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={clickHandler}>
        <img className="h-96" src="/ph-monster.png" />
      </div>
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-[-4.5rem]">
        {monster.monsterHealth()}
      </div>
    </div>
  );
}
