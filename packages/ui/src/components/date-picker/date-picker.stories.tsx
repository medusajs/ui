import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { DatePicker } from "./date-picker"

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  render: (args) => {
    return (
      <div className="w-[200px]">
        <DatePicker {...args} />
      </div>
    )
  },
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Single: Story = {
  args: {},
}

export const SingleWithPresets: Story = {
  args: {
    presets: [
      {
        label: "Olden times",
        date: new Date(0),
      },
      {
        label: "Today",
        date: new Date(),
      },
      {
        label: "Tomorrow",
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
      {
        label: "A week from now",
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        label: "A month from now",
        date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      {
        label: "6 months from now",
        date: new Date(new Date().setMonth(new Date().getMonth() + 6)),
      },
      {
        label: "A year from now",
        date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
      {
        label: "5 years from now",
        date: new Date(new Date().setFullYear(new Date().getFullYear() + 5)),
      },
      {
        label: "10 years from now",
        date: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
      },
      {
        label: "50 years from now",
        date: new Date(new Date().setFullYear(new Date().getFullYear() + 50)),
      },
    ],
  },
}

export const Range: Story = {
  args: {
    mode: "range",
  },
}
