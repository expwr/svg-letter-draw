import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs"
    },
    {
      file: "dist/index.esm.js",
      format: "esm"
    }
  ],
  external: [
    "react",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
    "react-dom",
    "framer-motion",
    "opentype.js"
  ],
  onwarn(warning, warn) {
    // Framer Motion ships RSC "use client" directives that aren't relevant
    // when consumed as a peer dep. Suppress the noise.
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
    warn(warning);
  },
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      exclude: "node_modules/**",
      babelHelpers: "bundled"
    })
  ]
};
