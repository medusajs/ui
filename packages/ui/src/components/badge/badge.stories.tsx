import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { BuildingTax, XMarkMini } from "@medusajs/icons"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  render: ({ children, ...args }) => (
    <Badge {...args}>{children || "Badge"}</Badge>
  ),
}

export default meta

type Story = StoryObj<typeof Badge>

export const Grey: Story = {
  args: {
    color: "grey",
  },
}

export const Green: Story = {
  args: {
    color: "green",
  },
}

export const Red: Story = {
  args: {
    color: "red",
  },
}

export const Blue: Story = {
  args: {
    color: "blue",
  },
}

export const Orange: Story = {
  args: {
    color: "orange",
  },
}

export const Purple: Story = {
  args: {
    color: "purple",
  },
}

export const Default: Story = {
  args: {
    type: "default",
  },
}

export const Rounded: Story = {
  args: {
    type: "rounded",
  },
}

export const Icon: Story = {
  args: {
    type: "icon",
    children: <BuildingTax />,
  },
}

export const IconRounded: Story = {
  args: {
    children: ["Badge", <XMarkMini key={"icon"} />],
    type: "rounded",
  },
}

export const IconDefault: Story = {
  args: {
    children: ["Badge", <XMarkMini key={"icon"} />],
    type: "default",
  },
}

export const Small: Story = {
  args: {
    size: "small",
  },
}

export const Base: Story = {
  args: {
    size: "base",
  },
}

export const Large: Story = {
  args: {
    size: "large",
  },
}
