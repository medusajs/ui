import fs from "fs"
import path from "path"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"
import { UnistNode, UnistTree } from "@/types/unist"
import { Registry } from "../registry"

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.name === "ComponentExample") {
        const name = getNodeAttributeByName(node, "name")?.value as string

        if (!name) return null

        try {
          const component = Registry[name]
          const src = component.file

          const filePath = path.join(process.cwd(), src)
          let source = fs.readFileSync(filePath, "utf8")

          source = source.replaceAll("export default", "export")

          node.children?.push(
            u("element", {
              tagName: "span",
              properties: {
                __src__: src,
                code: source,
              },
            })
          )
        } catch (error) {
          console.error(error)
        }
      }
    })
  }
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name)
}
