import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { CodeBlock, Command, Copy } from "./code-block"
import { Badge } from "../badge"
import { Label } from "../label"

const meta: Meta<typeof Command> = {
  title: "Components/CodeBlock",
  component: Command,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Command>

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

export const Simple: Story = {
  render: () => {
    return (
      <div className="w-[500px]">
        <Command>
          <Badge color="green">Get</Badge>
          <code>localhost:9000/store/products</code>
          <Copy content="localhost:9000/store/products" />
        </Command>
      </div>
    )
  },
}

export const Advanced: Story = {
  render: () => {
    return (
      <div className="h-[300px] w-[700px]">
        <CodeBlock snippets={snippets}>
          <CodeBlock.Header>
            <CodeBlock.Header.Meta>
              <Label weight={"plus"}>/product-detail.js</Label>
            </CodeBlock.Header.Meta>
          </CodeBlock.Header>
          <CodeBlock.Body />
        </CodeBlock>
      </div>
    )
  },
}
