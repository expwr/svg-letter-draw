import { useId, useState, useEffect } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { load } from 'opentype.js';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

// Cache loaded fonts per URL so changes to text/fontSize/etc. don't re-fetch.
var fontCache = new Map();
function loadFont(fontUrl) {
  var pending = fontCache.get(fontUrl);
  if (!pending) {
    pending = load(fontUrl)["catch"](function (err) {
      // Don't poison the cache on failure: drop the entry so a retry can happen.
      fontCache["delete"](fontUrl);
      throw err;
    });
    fontCache.set(fontUrl, pending);
  }
  return pending;
}
function buildLetterPaths(font, text, startX, baseline, fontSize, letterSpacing) {
  var letterPaths = [];
  var xOffset = startX;
  var _iterator = _createForOfIteratorHelper(text),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _char = _step.value;
      var path = font.getPath(_char, xOffset, baseline, fontSize);
      var pathData = path.toPathData(2);
      var bb = path.getBoundingBox();
      letterPaths.push({
        "char": _char,
        pathData: pathData,
        boundingBox: {
          x1: bb.x1,
          y1: bb.y1,
          x2: bb.x2,
          y2: bb.y2
        }
      });
      xOffset += font.getAdvanceWidth(_char, fontSize) + letterSpacing;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    letterPaths: letterPaths,
    totalWidth: xOffset
  };
}
var createVariants = function createVariants(letterDelay, letterAnimationDuration, reducedMotion) {
  return {
    hidden: reducedMotion ? {
      pathLength: 1,
      opacity: 1,
      fillOpacity: 1
    } : {
      pathLength: 0,
      opacity: 0,
      fillOpacity: 0
    },
    visible: function visible() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      if (reducedMotion) {
        return {
          pathLength: 1,
          opacity: 1,
          fillOpacity: 1
        };
      }
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
          opacity: {
            delay: delay,
            duration: 0.01
          },
          fillOpacity: {
            delay: delay + letterAnimationDuration,
            duration: 0.5
          }
        }
      };
    }
  };
};
var getColor = function getColor(color, index, defaultColor) {
  if (!color) return defaultColor;
  if (typeof color === "string") return color;
  return color[index % color.length] || defaultColor;
};
var AnimatedSVGText = function AnimatedSVGText(_ref) {
  var _useReducedMotion;
  var fontUrl = _ref.fontUrl,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? "" : _ref$text,
    _ref$letterSpacing = _ref.letterSpacing,
    letterSpacing = _ref$letterSpacing === void 0 ? 10 : _ref$letterSpacing,
    _ref$letterAnimationD = _ref.letterAnimationDuration,
    letterAnimationDuration = _ref$letterAnimationD === void 0 ? 1.5 : _ref$letterAnimationD,
    _ref$letterDelay = _ref.letterDelay,
    letterDelay = _ref$letterDelay === void 0 ? 0.2 : _ref$letterDelay,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === void 0 ? 2 : _ref$strokeWidth,
    _ref$fontSize = _ref.fontSize,
    fontSize = _ref$fontSize === void 0 ? 72 : _ref$fontSize,
    _ref$fillColor = _ref.fillColor,
    fillColor = _ref$fillColor === void 0 ? "none" : _ref$fillColor,
    _ref$lineColor = _ref.lineColor,
    lineColor = _ref$lineColor === void 0 ? "#E3CAA5" : _ref$lineColor,
    _ref$fillAnimationTyp = _ref.fillAnimationType,
    fillAnimationType = _ref$fillAnimationTyp === void 0 ? "fade" : _ref$fillAnimationTyp,
    _ref$fillDirection = _ref.fillDirection,
    fillDirection = _ref$fillDirection === void 0 ? "top" : _ref$fillDirection,
    _ref$fillDrawDuration = _ref.fillDrawDuration,
    fillDrawDuration = _ref$fillDrawDuration === void 0 ? 0.5 : _ref$fillDrawDuration;
  var baseline = fontSize * 1.2;
  var maskIdBase = useId();
  var prefersReducedMotion = (_useReducedMotion = useReducedMotion()) !== null && _useReducedMotion !== void 0 ? _useReducedMotion : false;
  var _useState = useState({
      letterPaths: [],
      totalWidth: 1100
    }),
    _useState2 = _slicedToArray(_useState, 2),
    pathsResult = _useState2[0],
    setPathsResult = _useState2[1];
  useEffect(function () {
    var cancelled = false;
    loadFont(fontUrl).then(function (font) {
      if (cancelled) return;
      var result = buildLetterPaths(font, text, 0, baseline, fontSize, letterSpacing);
      setPathsResult(result);
    })["catch"](function (error) {
      if (cancelled) return;
      console.error("Error loading font or generating letter paths:", error);
      setPathsResult({
        letterPaths: [],
        totalWidth: 1100
      });
    });
    return function () {
      cancelled = true;
    };
  }, [fontUrl, text, letterSpacing, fontSize, baseline]);
  var variants = createVariants(letterDelay, letterAnimationDuration, prefersReducedMotion);
  return /*#__PURE__*/React.createElement(motion.svg, {
    style: {
      width: "100%",
      height: "auto",
      margin: "0 auto",
      display: "block"
    },
    width: pathsResult.totalWidth,
    height: baseline + 20,
    viewBox: "0 0 ".concat(pathsResult.totalWidth, " ").concat(baseline + 20),
    initial: "hidden",
    animate: "visible"
  }, fillAnimationType === "draw" && /*#__PURE__*/React.createElement("defs", null, pathsResult.letterPaths.map(function (letter, index) {
    var bb = letter.boundingBox;
    var rectInitial = fillDirection === "top" ? {
      y: bb.y1,
      height: 0
    } : {
      y: bb.y2,
      height: 0
    };
    var rectAnimate = {
      y: bb.y1,
      height: bb.y2 - bb.y1
    };
    return /*#__PURE__*/React.createElement("mask", {
      key: "mask-".concat(maskIdBase, "-").concat(index),
      id: "mask-".concat(maskIdBase, "-").concat(index)
    }, /*#__PURE__*/React.createElement(motion.rect, {
      x: bb.x1,
      width: bb.x2 - bb.x1,
      initial: prefersReducedMotion ? rectAnimate : rectInitial,
      animate: rectAnimate,
      fill: "white",
      transition: prefersReducedMotion ? {
        duration: 0
      } : {
        delay: (index + 1) * letterDelay + letterAnimationDuration,
        duration: fillDrawDuration
      }
    }));
  })), pathsResult.letterPaths.map(function (letter, index) {
    if (fillAnimationType === "draw") {
      return /*#__PURE__*/React.createElement("g", {
        key: "".concat(letter["char"], "-").concat(index)
      }, /*#__PURE__*/React.createElement(motion.path, {
        d: letter.pathData,
        stroke: getColor(lineColor, index, "#E3CAA5"),
        fill: "none",
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "miter",
        variants: variants,
        custom: index + 1
      }), /*#__PURE__*/React.createElement(motion.path, {
        d: letter.pathData,
        stroke: "none",
        fill: getColor(fillColor, index, "none"),
        strokeWidth: strokeWidth,
        mask: "url(#mask-".concat(maskIdBase, "-").concat(index, ")")
      }));
    }
    return /*#__PURE__*/React.createElement(motion.path, {
      key: "".concat(letter["char"], "-").concat(index),
      d: letter.pathData,
      stroke: getColor(lineColor, index, "#E3CAA5"),
      fill: getColor(fillColor, index, "none"),
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "miter",
      variants: variants,
      custom: index + 1
    });
  }));
};

export { AnimatedSVGText };
