import fs from "fs"
import license from "rollup-plugin-license"

import pkg from "./package.json" assert { type: "json" }

function getIndexFiles(path) {
  return fs.readdirSync(path).filter((file) => file.match(/index\.ts/))
}

const plugins = [
  license({
    banner: `${pkg.name} v${pkg.version} - ${pkg.license}`,
  }),
]

const input = [
  "src/index.ts",
  ...getIndexFiles("src/components"),
  ...getIndexFiles("src/hooks"),
]
