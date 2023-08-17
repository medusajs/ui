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

const presets = [
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
]

export const Single: Story = {
  args: {},
}

export const SingleWithPresets: Story = {
  args: {
    presets,
  },
}

export const SingleWithTimePicker: Story = {
  args: {
    showTimePicker: true,
  },
}

export const SingleWithTimePickerAndPresets: Story = {
  args: {
    showTimePicker: true,
    presets,
  },
}

const rangePresets = [
  {
    label: "Today",
    dateRange: {
      from: new Date(),
      to: new Date(),
    },
  },
  {
    label: "Last 7 days",
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date(),
    },
  },
  {
    label: "Last 30 days",
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
  },
  {
    label: "Last 3 months",
    dateRange: {
      from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
      to: new Date(),
    },
  },
  {
    label: "Last 6 months",
    dateRange: {
      from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
      to: new Date(),
    },
  },
  {
    label: "Month to date",
    dateRange: {
      from: new Date(new Date().setDate(1)),
      to: new Date(),
    },
  },
  {
    label: "Year to date",
    dateRange: {
      from: new Date(new Date().setFullYear(new Date().getFullYear(), 0, 1)),
      to: new Date(),
    },
  },
]

export const Range: Story = {
  args: {
    mode: "range",
  },
}

export const RangeWithPresets: Story = {
  args: {
    mode: "range",
    presets: rangePresets,
  },
}

export const RangeWithTimePicker: Story = {
  args: {
    mode: "range",
    showTimePicker: true,
  },
}

export const RangeWithTimePickerAndPresets: Story = {
  args: {
    mode: "range",
    showTimePicker: true,
    presets: rangePresets,
  },
}
