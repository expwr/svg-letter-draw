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
declare const AnimatedSVGText: ({ fontUrl, text, letterSpacing, letterAnimationDuration, letterDelay, strokeWidth, fontSize, fillColor, lineColor, fillAnimationType, fillDirection, fillDrawDuration }: AnimatedSVGTextProps) => import("react/jsx-runtime").JSX.Element;
export default AnimatedSVGText;
