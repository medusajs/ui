import type { Meta, StoryObj } from "@storybook/react"

import { Label } from "./label"

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md", "lg"],
    },
    weight: {
      control: {
        type: "select",
      },
      options: ["regular", "plus"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    variant: "md",
    weight: "regular",
    children: "I am a label",
  },
}
