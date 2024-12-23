import React from "react"
import UpgradeIndex from "./upgrades/upgradeIndex"
import clsx from "clsx/lite"

export default function PanelIndex() {
  return (
    <div
      className={clsx(
        // Base
        "flex flex-col relative lg:basis-3/5 shadow-panel rounded-xl mx-3 lg:m-6 overflow-y-auto",
        // Mobile
        "bg-gradient-to-tr from-amber-400 via-orange-500 to-purple-950",
        // Large
        "lg:bg-gradient-to-br lg:from-amber-400 lg:via-orange-500 lg:to-purple-950",
      )}>
      <UpgradeIndex />
    </div>
  )
}
