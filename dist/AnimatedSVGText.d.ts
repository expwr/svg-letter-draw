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
    /** Decimal places for SVG path coordinates from opentype.js. Higher values reduce seam notches on large font sizes; default 5. */
    pathDecimalPlaces?: number;
}
declare const AnimatedSVGText: ({ fontUrl, text, letterSpacing, letterAnimationDuration, letterDelay, strokeWidth, fontSize, fillColor, lineColor, fillAnimationType, fillDirection, fillDrawDuration, pathDecimalPlaces }: AnimatedSVGTextProps) => import("react/jsx-runtime").JSX.Element;
export default AnimatedSVGText;
