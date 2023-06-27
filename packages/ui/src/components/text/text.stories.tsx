import type { Meta, StoryObj } from "@storybook/react"

import { Text } from "./text"

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["md", "lg", "xl"],
    },
    weight: {
      control: {
        type: "select",
      },
      options: ["regular", "plus"],
    },
    family: {
      control: {
        type: "select",
      },
      options: ["sans", "mono"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    variant: "md",
    weight: "regular",
    family: "sans",
    children: "I am a paragraph",
  },
}
