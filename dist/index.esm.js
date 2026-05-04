import { useId, useState, useEffect } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { parse } from 'opentype.js';
import { jsxs, jsx } from 'react/jsx-runtime';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
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
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = false,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = true, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), true), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
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
function fetchAndParseFont(_x) {
  return _fetchAndParseFont.apply(this, arguments);
}
function _fetchAndParseFont() {
  _fetchAndParseFont = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(fontUrl) {
    var response, buffer;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return fetch(fontUrl);
        case 1:
          response = _context.v;
          if (response.ok) {
            _context.n = 2;
            break;
          }
          throw new Error("Failed to load font (".concat(response.status, "): ").concat(fontUrl));
        case 2:
          _context.n = 3;
          return response.arrayBuffer();
        case 3:
          buffer = _context.v;
          return _context.a(2, parse(buffer));
      }
    }, _callee);
  }));
  return _fetchAndParseFont.apply(this, arguments);
}
function loadFont(fontUrl) {
  var pending = fontCache.get(fontUrl);
  if (!pending) {
    pending = fetchAndParseFont(fontUrl)["catch"](function (err) {
      // Don't poison the cache on failure: drop the entry so a retry can happen.
      fontCache["delete"](fontUrl);
      throw err;
    });
    fontCache.set(fontUrl, pending);
  }
  return pending;
}
function buildLetterPaths(font, text, startX, baseline, fontSize, letterSpacing, pathDecimalPlaces) {
  var letterPaths = [];
  var xOffset = startX;
  var _iterator = _createForOfIteratorHelper(text),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _char = _step.value;
      var path = font.getPath(_char, xOffset, baseline, fontSize);
      var pathData = path.toPathData(pathDecimalPlaces);
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
            type: "tween",
            duration: letterAnimationDuration,
            ease: "easeOut"
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
    fillDrawDuration = _ref$fillDrawDuration === void 0 ? 0.5 : _ref$fillDrawDuration,
    _ref$pathDecimalPlace = _ref.pathDecimalPlaces,
    pathDecimalPlaces = _ref$pathDecimalPlace === void 0 ? 5 : _ref$pathDecimalPlace;
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
      var result = buildLetterPaths(font, text, 0, baseline, fontSize, letterSpacing, pathDecimalPlaces);
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
  }, [fontUrl, text, letterSpacing, fontSize, baseline, pathDecimalPlaces]);
  var variants = createVariants(letterDelay, letterAnimationDuration, prefersReducedMotion);
  return /*#__PURE__*/jsxs(motion.svg, {
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
    animate: "visible",
    children: [fillAnimationType === "draw" && /*#__PURE__*/jsx("defs", {
      children: pathsResult.letterPaths.map(function (letter, index) {
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
        return /*#__PURE__*/jsx("mask", {
          id: "mask-".concat(maskIdBase, "-").concat(index),
          children: /*#__PURE__*/jsx(motion.rect, {
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
          })
        }, "mask-".concat(maskIdBase, "-").concat(index));
      })
    }), pathsResult.letterPaths.map(function (letter, index) {
      if (fillAnimationType === "draw") {
        return /*#__PURE__*/jsxs("g", {
          children: [/*#__PURE__*/jsx(motion.path, {
            d: letter.pathData,
            stroke: "none",
            fill: getColor(fillColor, index, "none"),
            strokeWidth: strokeWidth,
            mask: "url(#mask-".concat(maskIdBase, "-").concat(index, ")")
          }), /*#__PURE__*/jsx(motion.path, {
            d: letter.pathData,
            stroke: getColor(lineColor, index, "#E3CAA5"),
            fill: "none",
            strokeWidth: strokeWidth,
            strokeLinecap: "round",
            strokeLinejoin: "miter",
            variants: variants,
            custom: index + 1
          })]
        }, "".concat(letter["char"], "-").concat(index));
      }
      return /*#__PURE__*/jsx(motion.path, {
        d: letter.pathData,
        stroke: getColor(lineColor, index, "#E3CAA5"),
        fill: getColor(fillColor, index, "none"),
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "miter",
        variants: variants,
        custom: index + 1
      }, "".concat(letter["char"], "-").concat(index));
    })]
  });
};

export { AnimatedSVGText };
