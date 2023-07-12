import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Label } from "@/components/label"
import { Text } from "@/components/text"
import { RadioGroup } from "./radio-group"

const meta: Meta<typeof RadioGroup.Root> = {
  title: "Components/RadioGroup",
  component: RadioGroup.Root,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup.Root>

export const Default: Story = {
  render: () => {
    return (
      <RadioGroup.Root>
        <RadioGroup.Item value="1" />
        <RadioGroup.Item value="2" />
        <RadioGroup.Item value="3" />
      </RadioGroup.Root>
    )
  },
}

export const WithLabel: Story = {
  render: () => {
    return (
      <RadioGroup.Root>
        <div className="flex items-center gap-x-3">
          <RadioGroup.Item value="1" id="radio_1" />
          <Label htmlFor="radio_1" weight="plus">
            Radio 1
          </Label>
        </div>
        <div className="flex items-center gap-x-3">
          <RadioGroup.Item value="2" id="radio_2" />
          <Label htmlFor="radio_2" weight="plus">
            Radio 2
          </Label>
        </div>
        <div className="flex items-center gap-x-3">
          <RadioGroup.Item value="3" id="radio_3" />
          <Label htmlFor="radio_3" weight="plus">
            Radio 3
          </Label>
        </div>
      </RadioGroup.Root>
    )
  },
}

export const WithLabelAndDescription: Story = {
  render: () => {
    return (
      <RadioGroup.Root>
        <div className="flex items-start gap-x-3">
          <RadioGroup.Item value="1" id="radio_1" />
          <div className="flex flex-col gap-y-0.5">
            <Label htmlFor="radio_1" weight="plus">
              Radio 1
            </Label>
            <Text className="text-ui-fg-subtle">
              The quick brown fox jumps over a lazy dog.
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <RadioGroup.Item value="2" id="radio_2" />
          <div className="flex flex-col gap-y-0.5">
            <Label htmlFor="radio_2" weight="plus">
              Radio 2
            </Label>
            <Text className="text-ui-fg-subtle">
              The quick brown fox jumps over a lazy dog.
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <RadioGroup.Item value="3" id="radio_3" />
          <div className="flex flex-col gap-y-0.5">
            <Label htmlFor="radio_3" weight="plus">
              Radio 3
            </Label>
            <Text className="text-ui-fg-subtle">
              The quick brown fox jumps over a lazy dog.
            </Text>
          </div>
        </div>
      </RadioGroup.Root>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <RadioGroup.Root>
        <RadioGroup.Item value="1" disabled />
        <RadioGroup.Item value="2" />
        <RadioGroup.Item value="3" disabled checked />
      </RadioGroup.Root>
    )
  },
}
