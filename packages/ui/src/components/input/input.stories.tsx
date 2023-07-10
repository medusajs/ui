import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
}

export const Disabled: Story = {
  args: {
    value: "Floyd Mayweather",
    disabled: true,
  },
}
