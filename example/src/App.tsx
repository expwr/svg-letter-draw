import { AnimatedSVGText } from "../../src";
// import { AnimatedSVGText } from "svg-letter-draw";
import BarlowSemiCondensed from "./fonts/BarlowSemiCondensed-Black.ttf";
import BarlowSemiCondensedRegular from "./fonts/BarlowSemiCondensed-Regular.ttf";
import SpecialGothic from "./fonts/SpecialGothicExpandedOne-Regular.ttf";
import DancingScript from "./fonts/DancingScript-VariableFont_wght.ttf";
import RobotoSlab from "./fonts/RobotoSlab-VariableFont_wght.ttf";

function App() {
  return (
    <div style={{ margin: "2rem" }}>
      <h1>Demo for svg-letter-draw Component</h1>
      <div style={{ width: "1200px" }}>
        <AnimatedSVGText
          fontUrl={SpecialGothic}
          text="svg-letter-draw"
          letterSpacing={2}
          letterAnimationDuration={2.0}
          letterDelay={0.1}
          strokeWidth={3}
          lineColor={["#FF5733", "#FFD700", "#32CD32", "#1E90FF"]}
          fillColor={["#FFC0CB", "#98FB98", "#ADD8E6", "#E6E6FA"]}
          fillDirection="bottom"
          fillAnimationType="fade"
          fillDrawDuration={2}
        />
      </div>
    </div>
  );
}

export default App;
