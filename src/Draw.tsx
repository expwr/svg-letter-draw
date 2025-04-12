import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import opentype, { Font, Path } from "opentype.js";

export interface DrawProps {
  fontUrl: string;
  text?: string;
  animationDelayMode?: "stagger" | "sequential";
  totalAnimationDuration?: number;
  letterSpacing?: number;
}

interface LetterPath {
  char: string;
  pathData: string;
}

async function generateLetterPaths(
  fontFile: string,
  text: string,
  startX: number,
  baseline: number,
  fontSize: number,
  letterSpacing: number
): Promise<LetterPath[]> {
  try {
    const font: Font = await opentype.load(fontFile);
    const letterPaths: LetterPath[] = [];
    let xOffset = startX;
    for (const char of text) {
      const path: Path = font.getPath(char, xOffset, baseline, fontSize);
      const pathData = path.toPathData(1);
      letterPaths.push({ char, pathData });
      xOffset += font.getAdvanceWidth(char, fontSize) + letterSpacing;
    }
    return letterPaths;
  } catch (error) {
    console.error("Error loading font or generating letter paths:", error);
    return [];
  }
}

const createVariant = (
  letterCount: number,
  totalDuration: number,
  delayMode: "stagger" | "sequential"
): Variants => ({
  hidden: { pathLength: 0, opacity: 0, fillOpacity: 0 },
  visible: (i: number = 1) => {
    let delay = 0;
    const perLetterDuration = totalDuration / letterCount;
    if (delayMode === "stagger") {
      delay = i * perLetterDuration;
    } else if (delayMode === "sequential") {
      delay = (i - 1) * perLetterDuration;
    }
    return {
      pathLength: 1,
      opacity: 1,
      fillOpacity: 1,
      transition: {
        pathLength: {
          delay,
          type: "spring",
          duration: perLetterDuration,
          bounce: 0
        },
        opacity: { delay, duration: 0.01 },
        fillOpacity: { delay: delay + perLetterDuration, duration: 0.5 }
      }
    };
  }
});

const Draw: React.FC<DrawProps> = ({
  fontUrl,
  text = "Hello, World!",
  animationDelayMode = "sequential",
  totalAnimationDuration = 5,
  letterSpacing = 10
}) => {
  const [letterPaths, setLetterPaths] = useState<LetterPath[]>([]);

  useEffect(() => {
    generateLetterPaths(fontUrl, text, 0, 150, 72, letterSpacing).then(
      (paths) => setLetterPaths(paths)
    );
  }, [fontUrl, text, letterSpacing]);

  const variants =
    letterPaths.length > 0
      ? createVariant(
          letterPaths.length,
          totalAnimationDuration,
          animationDelayMode
        )
      : {};

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "4px",
        textAlign: "center",
        backgroundColor: "#FFFBE9"
      }}
    >
      <motion.svg
        style={{
          width: "100%",
          height: "auto",
          margin: "0 auto",
          display: "block"
        }}
        width="1200"
        height="200"
        viewBox="0 0 1100 200"
        initial="hidden"
        animate="visible"
      >
        {letterPaths.map((letter, index) => (
          <motion.path
            key={index}
            d={letter.pathData}
            stroke="#E3CAA5"
            fill="none"
            strokeWidth="4"
            variants={variants}
            custom={index + 1}
          />
        ))}
      </motion.svg>
    </div>
  );
};

export default Draw;
