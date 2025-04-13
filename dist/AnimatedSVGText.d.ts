import React from "react";
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
declare const AnimatedSVGText: React.FC<AnimatedSVGTextProps>;
export default AnimatedSVGText;
