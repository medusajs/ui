import type { Meta, StoryObj } from "@storybook/react"

import { TimeInput } from "./time-input"

const meta: Meta<typeof TimeInput> = {
  title: "Components/TimeInput",
  component: TimeInput,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof TimeInput>

export const Default: Story = {
  args: {},
}
