import type { Meta, StoryObj } from "@storybook/react"

import Tooltip from "./tooltip"
import { Button } from "../button"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    side: {
      options: ["top", "bottom", "left", "right"],
      control: { type: "radio" },
    },
    shortcut: {
      control: { type: "object" },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: "Tooltip text",
    side: "top",
    children: <Button>Hover me</Button>,
  },
  argTypes: {
    shortcut: {
      table: {
        disable: true,
      },
    },
  },
}

export const WithKeyboardShortcut: Story = {
  args: {
    content: "Tooltip text",
    side: "top",
    shortcut: ["⌘", "\\"],
    children: <Button>Hover me</Button>,
  },
}
