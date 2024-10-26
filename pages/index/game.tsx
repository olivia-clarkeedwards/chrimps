import React from "react";

export default function Game() {
  function upgradeHandler(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget.id);
  }

  return (
    <div className="flex-row basis-3/5  bg-gradient-to-b from-amber-300 to-amber-950 divide-y-2 divide-slate-500">
      <div className="flex w-full items-start justify-between align-start py-4 px-4">
        <div>Click Damage</div>
        <button
          id="click-damage"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={upgradeHandler}
        >
          Level up
        </button>
      </div>
      <div className="flex w-full items-start justify-between align-start py-4 px-4">
        <div>Placeholder</div>
        <button
          id="placeholder"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={upgradeHandler}
        >
          Placeholder
        </button>
      </div>
      <div className="flex w-full items-start justify-between align-start py-4 px-4">
        <div>Placeholder</div>
        <button
          id="placeholder"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={upgradeHandler}
        >
          Placeholder
        </button>
      </div>
    </div>
  );
}
