"use client"

import { Label, CodeBlock as Primitive } from "@medusajs/ui"

const snippets = [
  {
    label: "cURL",
    language: "markdown",
    code: `curl -H 'x-publishable-key: YOUR_API_KEY' 'http://localhost:9000/store/products/PRODUCT_ID'`,
  },
  {
    label: "Medusa JS Client",
    language: "jsx",
    code: `// Install the JS Client in your storefront project: @medusajs/medusa-js\n\nimport Medusa from "@medusajs/medusa-js"\n\nconst medusa = new Medusa({ publishableApiKey: "YOUR_API_KEY"})\nconst product = await medusa.products.retrieve("PRODUCT_ID")\nconsole.log(product.id)`,
  },
  {
    label: "Medusa React",
    language: "tsx",
    code: `// Install the React SDK and required dependencies in your storefront project:\n// medusa-react @tanstack/react-query @medusajs/medusa\n\nimport { useProduct } from "medusa-react"\n\nconst { product } = useProduct("PRODUCT_ID")\nconsole.log(product.id)`,
  },
]

const CodeBlock = () => {
  return (
    <Primitive snippets={snippets}>
      <Primitive.Header>
        <Primitive.Header.Meta>
          <Label weight={"plus"}>/product-detail.js</Label>
        </Primitive.Header.Meta>
      </Primitive.Header>
      <Primitive.Body />
    </Primitive>
  )
}

export { CodeBlock }
