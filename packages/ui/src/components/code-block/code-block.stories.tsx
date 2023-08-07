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

export const Simple: Story = {
  render: () => {
    return (
      <div className="w-[500px]">
        <Command>
          <Badge color="green">Get</Badge>
          <code>$ medusa new my-medusa-store --seed</code>
          <Copy content="medusa new my-medusa-store --seed" />
        </Command>
      </div>
    )
  },
}

export const Advanced: Story = {
  render: () => {
    return (
      <CodeBlock
        snippets={[
          { label: "npm", language: "bash", code: "npm i -D @medusajs/types" },
          {
            label: "yarn",
            language: "bash",
            code: "yarn add -D @medusajs/types",
          },
        ]}
      >
        <CodeBlock.Header>
          <CodeBlock.Header.Meta>
            <Label weight={"plus"}>/product-list.js</Label>
            <Badge color="green" className="ml-4">
              Get
            </Badge>
          </CodeBlock.Header.Meta>
        </CodeBlock.Header>
        <CodeBlock.Body />
      </CodeBlock>
    )
  },
}
