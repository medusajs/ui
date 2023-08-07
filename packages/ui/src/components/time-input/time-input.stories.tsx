import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { TimeInput } from "./time-input"

const meta: Meta<typeof TimeInput> = {
  title: "Components/TimeInput",
  component: TimeInput,
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div className="w-[300px]">
      <TimeInput aria-labelledby="time" {...args} />
    </div>
  ),
}

export default meta

type Story = StoryObj<typeof TimeInput>

// Hour Cycle defaults to your browser's locale.
export const Default: Story = {}

export const Hour24: Story = {
  args: {
    hourCycle: 24,
  },
}

export const Hour12: Story = {
  args: {
    hourCycle: 12,
  },
}
