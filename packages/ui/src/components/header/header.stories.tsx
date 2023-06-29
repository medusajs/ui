import type { Meta, StoryObj } from "@storybook/react"

import { Header } from "./header"

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  argTypes: {
    level: {
      control: {
        type: "select",
      },
      options: ["h1", "h2", "h3"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    level: "h1",
    children: "I am a header",
  },
}
