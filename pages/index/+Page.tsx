import "./style.css"
import "./tailwind.css"
import React from "react"
import Panel from "../../components/metapanel/panelIndex"
import Combat from "../../components/combat/combatIndex"
import { store } from "../../redux/store"
import { Provider } from "react-redux"
import { MainNavigationMenu } from "../../components/nav/MainNavigationMenu"

export default function Page() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="fixed inset-0 select-none bg-yellow-500 h-full">
          <div className="h-full w-full overflow-y-scroll">
            <div className="lg:flex-1/10">
              <MainNavigationMenu />
            </div>
            <div className="flex w-full lg:flex-9/10">
              <div className="flex w-full lg:flex-row  flex-col-reverse h-full">
                <Panel />
                <Combat />
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </React.StrictMode>
  )
}
