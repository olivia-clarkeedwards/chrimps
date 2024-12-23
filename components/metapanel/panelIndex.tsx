import React, { useState } from "react"
import UpgradeIndex from "./upgrades/upgradeIndex"
import clsx from "clsx/lite"

export default function PanelIndex() {
  const [activeTab, setActiveTab] = useState("upgrade")

  const tabs = [
    { id: "upgrade", title: "Upgrades", component: <UpgradeIndex /> },
    { id: "prestige", title: "Prestige", component: "" },
  ]

  return (
    <>
      <div
        className={clsx(
          // Base
          "flex flex-col relative lg:basis-3/5 rounded-xl mx-3 lg:m-6 overflow-y-auto",
        )}>
        <div className="flex gap-1 h-12 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex items-center shadow-panel-t-1 w-full px-4 py-1.5 text-lg rounded-t-lg  text-white",
                activeTab === tab.id
                  ? "bg-gradient-to-b from-amber-400 to-orange-500"
                  : "bg-gradient-to-b from-amber-400/80 to-orange-500/80 text-orange-900 hover:from-amber-400/90 hover:to-orange-500/90",
              )}>
              {tab.title}
            </button>
          ))}
        </div>
        <div
          className={clsx(
            "h-full shadow-panel",
            "bg-gradient-to-tr from-amber-400 via-orange-500 to-purple-950",
            "lg:bg-gradient-to-br lg:from-amber-400 lg:via-orange-500 lg:to-purple-950",
          )}>
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </>
  )
}
