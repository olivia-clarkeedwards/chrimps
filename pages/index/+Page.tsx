import "./style.css";
import "./tailwind.css";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-screen">
      <div className="flex w-screen self-center h-4/6 lg:flex-row flex-col">
        <div className="basis-3/5 h-[66svh] bg-gradient-to-b from-amber-300 to-amber-950">Game</div>
        <div className="basis-2/5 h-[66svh] bg-slate-500">Combat</div>
      </div>
    </div>
  );
}
