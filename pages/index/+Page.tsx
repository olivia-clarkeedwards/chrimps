import "./style.css"
import "./tailwind.css"
import React from "react"
import Panel from "../../components/metapanel/panelIndex"
import Combat from "../../components/combat/combatIndex"
import { store } from "../../redux/store"
import { Provider } from "react-redux"

export default function Page() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="flex items-end lg:h-screen select-none">
          <div className="flex w-full lg:min-h-[90svh] lg:flex-row flex-col flex-col-reverse lg:border-t-2 border-yellow-500">
            <Panel />
            <Combat />
          </div>
        </div>
      </Provider>
    </React.StrictMode>
  )
}
