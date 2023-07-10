import fs from "fs"

function getIndexFiles(path) {
  return fs.readdirSync(path).filter((file) => file.match(/index\.ts/))
}

const input = [
  "src/index.ts",
  ...getIndexFiles("src/components"),
  ...getIndexFiles("src/hooks"),
]
