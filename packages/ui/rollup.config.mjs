import { babel } from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import * as path from "path"
import { externals } from "rollup-plugin-node-externals"
import { typescriptPaths } from "rollup-plugin-typescript-paths"

import pkg from "./package.json" assert { type: "json" }

const extensions = [".js", ".jsx", ".ts", ".tsx"]

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "./src/index.ts",
  plugins: [
    externals({ deps: true, packagePath: "./package.json" }),
    typescriptPaths({
      preserveExtensions: true,
    }),
    nodeResolve({ extensions }),
    commonjs(),
    babel({
      rootMode: "upward",
      extensions,
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      envName: "production",
      targets: [...pkg.browserslist, "node 16.17.0"],
    }),
    json({
      compact: true,
    }),
  ],
  output: [
    {
      format: "cjs",
      dir: path.dirname(pkg.main),
      preserveModules: true,
      entryFileNames: "[name].js",
      exports: "named",
    },
    {
      format: "esm",
      dir: path.dirname(pkg.module),
      preserveModules: true,
      entryFileNames: "[name].js",
    },
  ],
}

export default config
