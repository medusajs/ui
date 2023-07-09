import type { Meta, StoryObj } from "@storybook/react"

import { Label } from "@/components/label"
import { Text } from "../text"
import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => {
    return (
      <RadioGroup>
        <RadioGroupItem value="1" />
        <RadioGroupItem value="2" />
        <RadioGroupItem value="3" />
      </RadioGroup>
    )
  },
}

export const WithLabel: Story = {
  render: () => {
    return (
      <RadioGroup>
        <div className="flex items-center gap-x-3">
          <RadioGroupItem value="1" id="radio_1" />
          <Label htmlFor="radio_1" weight="plus">
            Radio 1
          </Label>
        </div>
        <div className="flex items-center gap-x-3">
          <RadioGroupItem value="2" id="radio_2" />
          <Label htmlFor="radio_2" weight="plus">
            Radio 2
          </Label>
        </div>
        <div className="flex items-center gap-x-3">
          <RadioGroupItem value="3" id="radio_3" />
          <Label htmlFor="radio_3" weight="plus">
            Radio 3
          </Label>
        </div>
      </RadioGroup>
    )
  },
}

export const WithLabelAndDescription: Story = {
  render: () => {
    return (
      <RadioGroup>
        <div className="flex items-start gap-x-3">
          <RadioGroupItem value="1" id="radio_1" />
          <div className="flex flex-col gap-y-0.5">
            <Label htmlFor="radio_1" weight="plus">
              Radio 1
            </Label>
            <Text variant="md" className="text-ui-fg-subtle">
              The quick brown fox jumps over a lazy dog.
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <RadioGroupItem value="2" id="radio_2" />
          <div className="flex flex-col gap-y-0.5">
            <Label htmlFor="radio_2" weight="plus">
              Radio 2
            </Label>
            <Text variant="md" className="text-ui-fg-subtle">
              The quick brown fox jumps over a lazy dog.
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <RadioGroupItem value="3" id="radio_3" />
          <div className="flex flex-col gap-y-0.5">
            <Label htmlFor="radio_3" weight="plus">
              Radio 3
            </Label>
            <Text variant="md" className="text-ui-fg-subtle">
              The quick brown fox jumps over a lazy dog.
            </Text>
          </div>
        </div>
      </RadioGroup>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <RadioGroup>
        <RadioGroupItem value="1" disabled />
        <RadioGroupItem value="2" />
        <RadioGroupItem value="3" disabled checked />
      </RadioGroup>
    )
  },
}
