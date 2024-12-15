import "./style.css"
import "./tailwind.css"
import React from "react"
import Panel from "../../components/metapanel/panelIndex"
import Combat from "../../components/combat/combatIndex"
import { store } from "../../redux/store"
import { Provider } from "react-redux"
import { NavigationMenu } from "../../components/combat/nav/navigation"

export default function Page() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="cursor-hand flex-col min-h-screen lg:h-screen select-none bg-gradient-to-b from-purple-800 via-purple-900 to-violet-950">
          <div className="lg:h-[10%]">
            <NavigationMenu />
          </div>
          <div className="flex lg:h-[90%]">
            <div className="flex w-full lg:flex-row flex-col-reverse ">
              <Panel />
              <Combat />
            </div>
          </div>
        </div>
      </Provider>
    </React.StrictMode>
  )
}
