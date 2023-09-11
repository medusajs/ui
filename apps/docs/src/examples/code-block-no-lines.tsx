import { CodeBlock, Label } from "@medusajs/ui"

export default function CodeBlockNoLines() {
  return (
    <div className="w-full">
      <CodeBlock
        snippets={[
          {
            label: "Medusa React",
            language: "tsx",
            code: `import { useProduct } from "medusa-react"\n\nconst { product } = useProduct("PRODUCT_ID")\nconsole.log(product.id)`,
            hideLineNumbers: true,
          },
        ]}
      >
        <CodeBlock.Header>
          <CodeBlock.Header.Meta>
            <Label weight={"plus"}>/product-detail.js</Label>
          </CodeBlock.Header.Meta>
        </CodeBlock.Header>
        <CodeBlock.Body />
      </CodeBlock>
    </div>
  )
}
