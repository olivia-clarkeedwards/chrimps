import "./style.css";
import "./tailwind.css";
import React from "react";
import Game from "./game";
import Combat from "./combat";

export default function Page() {
  return (
    <React.StrictMode>
      <div className="flex h-screen">
        <div className="flex w-screen self-center min-h-[66svh] lg:flex-row flex-col">
          <Game />
          <Combat />
        </div>
      </div>
    </React.StrictMode>
  );
}
