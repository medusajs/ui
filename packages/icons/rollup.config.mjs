import bundleSize from "@atomico/rollup-plugin-sizes"
import replace from "@rollup/plugin-replace"
import esbuild from "rollup-plugin-esbuild"
import license from "rollup-plugin-license"
import { visualizer } from "rollup-plugin-visualizer"

import pkg from "./package.json" assert { type: "json" }

const plugins = (pkg, minify, esbuildOptions = {}) =>
  [
    esbuild({
      minify,
      ...esbuildOptions,
    }),
    license({
      banner: `${pkg.name} v${pkg.version} - ${pkg.license}`,
    }),
    bundleSize(),
    visualizer({
      sourcemap: true,
      filename: `stats/${pkg.name}${minify ? "-min" : ""}.html`,
    }),
    // ts({
    //   tsconfig: "tsconfig.json",
    //   allowJs: false,
    //   checkJs: false,
    // }),
  ].filter(Boolean)

const packageName = "@medusajs/icons"
const outputFileName = "medusa-icons"
const outputDir = "dist"
const inputs = ["src/index.ts"]

const bundles = [
  {
    format: "umd",
    inputs,
    outputDir,
    minify: true,
    sourcemap: true,
  },
  {
    format: "umd",
    inputs,
    outputDir,
    sourcemap: true,
  },
  {
    format: "cjs",
    inputs,
    outputDir,
    aliasesSupport: true,
    sourcemap: true,
  },
  {
    format: "esm",
    inputs,
    outputDir,
    preserveModules: true,
    aliasesSupport: true,
    sourcemap: true,
  },
]

const configs = bundles
  .map(
    ({ inputs, outputDir, format, minify, preserveModules, aliasesSupport }) =>
      inputs.map((input) => ({
        input,
        plugins: [
          ...(!aliasesSupport
            ? [
                replace({
                  "export * from './aliases';": "",
                  "export * as icons from './icons';": "",
                  delimiters: ["", ""],
                  preventAssignment: false,
                }),
              ]
            : []),
          ...plugins(pkg, minify),
        ],
        external: ["react", "prop-types"],
        output: {
          name: packageName,
          ...(preserveModules
            ? {
                dir: `${outputDir}/${format}`,
              }
            : {
                file: `${outputDir}/${format}/${outputFileName}${
                  minify ? ".min" : ""
                }.js`,
              }),
          format,
          sourcemap: true,
          preserveModules,
          globals: {
            react: "react",
            "prop-types": "PropTypes",
            "react-jsx": "jsx",
          },
        },
      }))
  )
  .flat()

export default configs
