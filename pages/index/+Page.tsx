import "./style.css";
import "./tailwind.css";
import React from "react";

export default function Page() {
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="basis-3/5">Game</div>
      <div className="basis-2/5">Combat</div>
    </div>
  );
}
