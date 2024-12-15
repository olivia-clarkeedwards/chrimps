import "./style.css"
import "./tailwind.css"
import React from "react"
import Panel from "../../components/metapanel/panelIndex"
import Combat from "../../components/combat/combatIndex"
import { store } from "../../redux/store"
import { Provider } from "react-redux"
import { MainNavigationMenu } from "../../components/nav/mainNavigationMenu"

export default function Page() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="fixed inset-0 select-none bg-purple-700 bg-gradient-to-br from-purple-500 via-purple-700 to-green-950 h-full cursor-fancy">
          <div className="h-full w-full overflow-y-scroll">
            <div className="min-h-20">
              <MainNavigationMenu />
            </div>
            <div className="flex flex-1 w-full">
              <div className="flex w-full flex-col-reverse lg:flex-row justify-center h-full">
                <Panel />
                <Combat />
                {/* //active abilities? */}
                {/* <div className=" w-[20%]">
                  <div className="bg-yellow-400 rounded-lg m-2 h-20"></div>
                  <div className="bg-yellow-400 rounded-lg m-2 h-20"></div>
                  <div className="bg-yellow-400 rounded-lg m-2 h-20"></div>
                  <div className="bg-yellow-400 rounded-lg m-2 h-20"></div>
                  <div className="bg-yellow-400 rounded-lg m-2 h-20"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </React.StrictMode>
  )
}
