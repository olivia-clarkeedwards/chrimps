import React from "react"
import UpgradeIndex from "./upgrades/upgradeIndex"
import clsx from "clsx/lite"
import Gold from "./gold"

export default function PanelIndex() {
  return (
    <div
      className={clsx(
        // Base
        "flex flex-col relative basis-5/12 md:basis-3/5 shadow-panel rounded-xl m-6 overflow-y-auto",
        // Mobile
        "bg-gradient-to-tr from-amber-400 via-orange-500 to-purple-950",
        // Large
        "lg:bg-gradient-to-br lg:from-amber-400 lg:via-orange-500 lg:to-purple-950",
      )}>
      <div id="gold-cont" className="flex flex-col h-28 items-center relative">
        <Gold />
      </div>
      <UpgradeIndex />
    </div>
  )
}
