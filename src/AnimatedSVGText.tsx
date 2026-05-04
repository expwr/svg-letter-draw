import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { load as loadOpentypeFont, Font, Path } from "opentype.js";

export interface AnimatedSVGTextProps {
  fontUrl: string;
  text?: string;
  letterSpacing?: number;
  letterAnimationDuration?: number;
  letterDelay?: number;
  strokeWidth?: number;
  fontSize?: number;
  fillColor?: string | string[];
  lineColor?: string | string[];
  fillAnimationType?: "fade" | "draw";
  fillDirection?: "top" | "bottom";
  fillDrawDuration?: number;
}

interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface LetterPath {
  char: string;
  pathData: string;
  boundingBox: BoundingBox;
}

interface LetterPathsResult {
  letterPaths: LetterPath[];
  totalWidth: number;
}

// Cache loaded fonts per URL so changes to text/fontSize/etc. don't re-fetch.
const fontCache = new Map<string, Promise<Font>>();

function loadFont(fontUrl: string): Promise<Font> {
  let pending = fontCache.get(fontUrl);
  if (!pending) {
    pending = loadOpentypeFont(fontUrl).catch((err) => {
      // Don't poison the cache on failure: drop the entry so a retry can happen.
      fontCache.delete(fontUrl);
      throw err;
    });
    fontCache.set(fontUrl, pending);
  }
  return pending;
}

function buildLetterPaths(
  font: Font,
  text: string,
  startX: number,
  baseline: number,
  fontSize: number,
  letterSpacing: number
): LetterPathsResult {
  const letterPaths: LetterPath[] = [];
  let xOffset = startX;
  for (const char of text) {
    const path: Path = font.getPath(char, xOffset, baseline, fontSize);
    const pathData = path.toPathData(2);
    const bb = path.getBoundingBox();
    letterPaths.push({
      char,
      pathData,
      boundingBox: { x1: bb.x1, y1: bb.y1, x2: bb.x2, y2: bb.y2 }
    });
    xOffset += font.getAdvanceWidth(char, fontSize) + letterSpacing;
  }
  return { letterPaths, totalWidth: xOffset };
}

const createVariants = (
  letterDelay: number,
  letterAnimationDuration: number,
  reducedMotion: boolean
): Variants => ({
  hidden: reducedMotion
    ? { pathLength: 1, opacity: 1, fillOpacity: 1 }
    : { pathLength: 0, opacity: 0, fillOpacity: 0 },
  visible: (i: number = 1) => {
    if (reducedMotion) {
      return { pathLength: 1, opacity: 1, fillOpacity: 1 };
    }
    const delay = i * letterDelay;
    return {
      pathLength: 1,
      opacity: 1,
      fillOpacity: 1,
      transition: {
        pathLength: {
          delay,
          type: "spring",
          duration: letterAnimationDuration,
          bounce: 0
        },
        opacity: { delay, duration: 0.01 },
        fillOpacity: { delay: delay + letterAnimationDuration, duration: 0.5 }
      }
    };
  }
});

const getColor = (
  color: string | string[] | undefined,
  index: number,
  defaultColor: string
): string => {
  if (!color) return defaultColor;
  if (typeof color === "string") return color;
  return color[index % color.length] || defaultColor;
};

const AnimatedSVGText = ({
  fontUrl,
  text = "",
  letterSpacing = 10,
  letterAnimationDuration = 1.5,
  letterDelay = 0.2,
  strokeWidth = 2,
  fontSize = 72,
  fillColor = "none",
  lineColor = "#E3CAA5",
  fillAnimationType = "fade",
  fillDirection = "top",
  fillDrawDuration = 0.5
}: AnimatedSVGTextProps) => {
  const baseline = fontSize * 1.2;
  const maskIdBase = useId();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [pathsResult, setPathsResult] = useState<LetterPathsResult>({
    letterPaths: [],
    totalWidth: 1100
  });

  useEffect(() => {
    let cancelled = false;
    loadFont(fontUrl)
      .then((font) => {
        if (cancelled) return;
        const result = buildLetterPaths(
          font,
          text,
          0,
          baseline,
          fontSize,
          letterSpacing
        );
        setPathsResult(result);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Error loading font or generating letter paths:", error);
        setPathsResult({ letterPaths: [], totalWidth: 1100 });
      });
    return () => {
      cancelled = true;
    };
  }, [fontUrl, text, letterSpacing, fontSize, baseline]);

  const variants = createVariants(
    letterDelay,
    letterAnimationDuration,
    prefersReducedMotion
  );

  return (
    <motion.svg
      style={{
        width: "100%",
        height: "auto",
        margin: "0 auto",
        display: "block"
      }}
      width={pathsResult.totalWidth}
      height={baseline + 20}
      viewBox={`0 0 ${pathsResult.totalWidth} ${baseline + 20}`}
      initial="hidden"
      animate="visible"
    >
      {fillAnimationType === "draw" && (
        <defs>
          {pathsResult.letterPaths.map((letter, index) => {
            const bb = letter.boundingBox;
            const rectInitial =
              fillDirection === "top"
                ? { y: bb.y1, height: 0 }
                : { y: bb.y2, height: 0 };
            const rectAnimate = { y: bb.y1, height: bb.y2 - bb.y1 };
            return (
              <mask
                key={`mask-${maskIdBase}-${index}`}
                id={`mask-${maskIdBase}-${index}`}
              >
                <motion.rect
                  x={bb.x1}
                  width={bb.x2 - bb.x1}
                  initial={prefersReducedMotion ? rectAnimate : rectInitial}
                  animate={rectAnimate}
                  fill="white"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          delay:
                            (index + 1) * letterDelay +
                            letterAnimationDuration,
                          duration: fillDrawDuration
                        }
                  }
                />
              </mask>
            );
          })}
        </defs>
      )}
      {pathsResult.letterPaths.map((letter, index) => {
        if (fillAnimationType === "draw") {
          return (
            <g key={`${letter.char}-${index}`}>
              <motion.path
                d={letter.pathData}
                stroke={getColor(lineColor, index, "#E3CAA5")}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="miter"
                variants={variants}
                custom={index + 1}
              />
              <motion.path
                d={letter.pathData}
                stroke="none"
                fill={getColor(fillColor, index, "none")}
                strokeWidth={strokeWidth}
                mask={`url(#mask-${maskIdBase}-${index})`}
              />
            </g>
          );
        }
        return (
          <motion.path
            key={`${letter.char}-${index}`}
            d={letter.pathData}
            stroke={getColor(lineColor, index, "#E3CAA5")}
            fill={getColor(fillColor, index, "none")}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="miter"
            variants={variants}
            custom={index + 1}
          />
        );
      })}
    </motion.svg>
  );
};

export default AnimatedSVGText;
