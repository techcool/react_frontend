import React from "react";
import Home from "./home";
export default function VideoStatsList() {
  return (
    <div className="p-4 main-section top-zero">
      <div className="card px-3 py-4 mx-0 shadow-none border-0">
        <Home from="stepper" isStats={ true } />
      </div>
    </div>
  );
}
