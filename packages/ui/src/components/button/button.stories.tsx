import type { Meta, StoryObj } from "@storybook/react"

import { PlusMini } from "@medusajs/icons"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Inverted: Story = {
  args: {
    children: "Action",
  },
}

export const Neutral: Story = {
  args: {
    children: "Action",
    variant: "secondary",
  },
}

export const Transparent: Story = {
  args: {
    children: "Action",
    variant: "transparent",
  },
}

export const Danger: Story = {
  args: {
    children: "Action",
    variant: "danger",
  },
}

export const Disabled: Story = {
  args: {
    children: "Action",
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: ["Action", <PlusMini key={1} />],
  },
}

export const IconOnly: Story = {
  args: {
    children: <PlusMini />,
    format: "icon",
  },
}
