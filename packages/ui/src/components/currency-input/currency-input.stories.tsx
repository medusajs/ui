import type { Meta, StoryObj } from "@storybook/react"

import { CurrencyInput } from "./currency-input"

const meta: Meta<typeof CurrencyInput> = {
  title: "Components/CurrencyInput",
  component: CurrencyInput,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof CurrencyInput>

export const Default: Story = {
  args: {
    symbol: "$",
    code: "usd",
  },
}
