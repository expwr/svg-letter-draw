import React from "react";
import { Draw } from "../../src";
// import { Draw } from "svg-letter-draw";
import BarlowSemiCondensed from "./fonts/BarlowSemiCondensed-Black.ttf";

function App() {
  return (
    <div style={{ margin: "2rem" }}>
      <h1>Demo for svg-letter-draw Component</h1>
      <Draw
        fontUrl={BarlowSemiCondensed}
        text="Noah Diana"
        totalAnimationDuration={3.5}
        animationDelayMode="sequential"
        letterSpacing={2}
      />
    </div>
  );
}

export default App;
