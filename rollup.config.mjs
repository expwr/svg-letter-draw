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
  external: ["react", "react-dom"],
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
