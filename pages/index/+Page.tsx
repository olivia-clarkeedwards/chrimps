import "./style.css"
import "./tailwind.css"
import React from "react"
import Panel from "../../components/metapanel/panelIndex"
import Combat from "../../components/combat/combatIndex"
import { store } from "../../redux/store"
import { Provider } from "react-redux"
import Navigation from "../../components/nav/navigation"
import { useForcedDPI } from "../../gameconfig/utils"
import ReactModal from "react-modal"
import Loading from "../../components/Loading"

export default function Page() {
  ReactModal.setAppElement("#root")

  const currentScale = useForcedDPI()
  const inverseScale = 1 / currentScale

  const appScale: React.CSSProperties | undefined =
    inverseScale !== 1
      ? {
          transform: `scale(${inverseScale})`,
          transformOrigin: "top left",
          width: `${100 * currentScale}vw`,
          height: `${100 * currentScale}vh`,
          position: "absolute",
          top: 0,
          left: 0,
        }
      : undefined

  return (
    <React.StrictMode>
      <Provider store={store}>
        <div
          style={appScale}
          className="cursor-hand flex flex-col-reverse md:flex-col w-screen min-h-[100vh] lg:h-screen select-none font-sigmar bg-gradient-to-b from-purple-800 via-purple-900 to-violet-950">
          <div className="">
            <Navigation />
          </div>
          <main className="flex flex-1 md:min-h-0">
            <div className="flex w-full flex-col-reverse lg:flex-row">
              <Panel />
              <Combat />
            </div>
          </main>
          <Loading />
        </div>
      </Provider>
    </React.StrictMode>
  )
}
