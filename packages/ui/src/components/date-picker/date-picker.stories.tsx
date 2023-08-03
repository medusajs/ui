import type { Meta, StoryObj } from "@storybook/react"

import { DatePicker } from "./date-picker"

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Single: Story = {
  args: {},
}

export const Range: Story = {
  args: {
    mode: "range",
  },
}
