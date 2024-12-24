import clsx from "clsx"
import React from "react"
import PrestigeButton from "./prestigeButton"

export default function Prestige() {
  function onPrestige() {}
  return (
    <div className="flex font-sans">
      ;
      <button
        onClick={onPrestige}
        className={clsx(
          "w-56 cursor-hand bg-cyan-800/50 font-extrabold text-cyan-300 py-4 px-6 rounded-lg flex items-center justify-center gap-2 border border-cyan-500 shadow-lg shadow-cyan-500/20 transition-all duration-300",
          "hover:bg-cyan-700/80 hover:shadow-cyan-500/40",
        )}>
        <div className="relative flex items-center gap-2">
          <span className="text-xl">Damage</span>
        </div>
      </button>
      <button
        onClick={onPrestige}
        className={clsx(
          "relative w-56 font-extrabold cursor-hand bg-black text-white py-4 px-6 rounded-lg flex items-center justify-center gap-2 border-2 border-pink-500 shadow-lg shadow-pink-500/20 transition-all duration-300 overflow-hidden group",
          "hover:bg-gray-900 hover:shadow-pink-500/40",
        )}>
        <div
          className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 
        group-hover:opacity-30 transition-opacity"
        />
        <span className="text-xl relative z-10">Neural Upgrade</span>
      </button>
    </div>
  )
}
