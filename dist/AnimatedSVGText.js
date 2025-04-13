var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import opentype from "opentype.js";
function generateLetterPaths(fontFile, text, startX, baseline, fontSize, letterSpacing) {
    return __awaiter(this, void 0, void 0, function () {
        var font, letterPaths, xOffset, _i, text_1, char, path, pathData, bb, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, opentype.load(fontFile)];
                case 1:
                    font = _a.sent();
                    letterPaths = [];
                    xOffset = startX;
                    for (_i = 0, text_1 = text; _i < text_1.length; _i++) {
                        char = text_1[_i];
                        path = font.getPath(char, xOffset, baseline, fontSize);
                        pathData = path.toPathData(2);
                        bb = path.getBoundingBox();
                        letterPaths.push({
                            char: char,
                            pathData: pathData,
                            boundingBox: { x1: bb.x1, y1: bb.y1, x2: bb.x2, y2: bb.y2 }
                        });
                        xOffset += font.getAdvanceWidth(char, fontSize) + letterSpacing;
                    }
                    return [2 /*return*/, { letterPaths: letterPaths, totalWidth: xOffset }];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error loading font or generating letter paths:", error_1);
                    return [2 /*return*/, { letterPaths: [], totalWidth: 1100 }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var createVariants = function (letterDelay, letterAnimationDuration) { return ({
    hidden: { pathLength: 0, opacity: 0, fillOpacity: 0 },
    visible: function (i) {
        if (i === void 0) { i = 1; }
        var delay = i * letterDelay;
        return {
            pathLength: 1,
            opacity: 1,
            fillOpacity: 1,
            transition: {
                pathLength: {
                    delay: delay,
                    type: "spring",
                    duration: letterAnimationDuration,
                    bounce: 0
                },
                opacity: { delay: delay, duration: 0.01 },
                fillOpacity: { delay: delay + letterAnimationDuration, duration: 0.5 }
            }
        };
    }
}); };
var getColor = function (color, index, defaultColor) {
    if (!color)
        return defaultColor;
    if (typeof color === "string")
        return color;
    return color[index % color.length] || defaultColor;
};
var AnimatedSVGText = function (_a) {
    var fontUrl = _a.fontUrl, _b = _a.text, text = _b === void 0 ? "" : _b, _c = _a.letterSpacing, letterSpacing = _c === void 0 ? 10 : _c, _d = _a.letterAnimationDuration, letterAnimationDuration = _d === void 0 ? 1.5 : _d, _e = _a.letterDelay, letterDelay = _e === void 0 ? 0.2 : _e, _f = _a.strokeWidth, strokeWidth = _f === void 0 ? 2 : _f, _g = _a.fontSize, fontSize = _g === void 0 ? 72 : _g, _h = _a.fillColor, fillColor = _h === void 0 ? "none" : _h, _j = _a.lineColor, lineColor = _j === void 0 ? "#E3CAA5" : _j, _k = _a.fillAnimationType, fillAnimationType = _k === void 0 ? "fade" : _k, _l = _a.fillDirection, fillDirection = _l === void 0 ? "top" : _l, _m = _a.fillDrawDuration, fillDrawDuration = _m === void 0 ? 0.5 : _m;
    var baseline = fontSize * 1.2;
    var _o = useState({
        letterPaths: [],
        totalWidth: 1100
    }), pathsResult = _o[0], setPathsResult = _o[1];
    useEffect(function () {
        generateLetterPaths(fontUrl, text, 0, baseline, fontSize, letterSpacing).then(function (result) { return setPathsResult(result); });
    }, [fontUrl, text, letterSpacing, fontSize, baseline]);
    var variants = createVariants(letterDelay, letterAnimationDuration);
    return (React.createElement("div", { style: {
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "4px",
            textAlign: "center",
            backgroundColor: "#FFFBE9"
        } },
        React.createElement(motion.svg, { style: {
                width: "100%",
                height: "auto",
                margin: "0 auto",
                display: "block"
            }, width: pathsResult.totalWidth, height: baseline + 20, viewBox: "0 0 ".concat(pathsResult.totalWidth, " ").concat(baseline + 20), initial: "hidden", animate: "visible" }, pathsResult.letterPaths.map(function (letter, index) {
            if (fillAnimationType === "draw") {
                var bb = letter.boundingBox;
                var rectInitial = fillDirection === "top"
                    ? { y: bb.y1, height: 0 }
                    : { y: bb.y2, height: 0 };
                var rectAnimate = fillDirection === "top"
                    ? { y: bb.y1, height: bb.y2 - bb.y1 }
                    : { y: bb.y1, height: bb.y2 - bb.y1 };
                return (React.createElement("g", { key: index },
                    React.createElement(motion.path, { d: letter.pathData, stroke: getColor(lineColor, index, "#E3CAA5"), fill: "none", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "miter", variants: variants, custom: index + 1 }),
                    React.createElement("defs", null,
                        React.createElement("mask", { id: "mask-".concat(index) },
                            React.createElement(motion.rect, { x: bb.x1, width: bb.x2 - bb.x1, initial: rectInitial, animate: rectAnimate, fill: "white", transition: {
                                    delay: (index + 1) * letterDelay + letterAnimationDuration,
                                    duration: fillDrawDuration
                                } }))),
                    React.createElement(motion.path, { d: letter.pathData, stroke: "none", fill: getColor(fillColor, index, "none"), strokeWidth: strokeWidth, mask: "url(#mask-".concat(index, ")") })));
            }
            return (React.createElement(motion.path, { key: index, d: letter.pathData, stroke: getColor(lineColor, index, "#E3CAA5"), fill: getColor(fillColor, index, "none"), strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "miter", variants: variants, custom: index + 1 }));
        }))));
};
export default AnimatedSVGText;
