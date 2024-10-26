import "./style.css";
import "./tailwind.css";
import React from "react";
import Game from "./game";
import Combat from "./combat";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

export default function Page() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="flex h-screen">
          <div className="flex w-screen self-center min-h-[66svh] lg:flex-row flex-col">
            <Game />
            <Combat />
          </div>
        </div>
      </Provider>
    </React.StrictMode>
  );
}
