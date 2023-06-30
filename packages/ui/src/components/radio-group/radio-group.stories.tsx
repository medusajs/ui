import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup } from "./radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  parameters: {
    layout: "centered",
    controls: { hideNoControlsWarning: true },
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup.Root>
      <RadioGroup.Item value={"1"} label="One" />
      <RadioGroup.Item value={"2"} label="Two" />
    </RadioGroup.Root>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup.Root>
      <RadioGroup.Item value={"1"} label="One" description="First option" />
      <RadioGroup.Item value={"2"} label="Two" description="Second option" />
    </RadioGroup.Root>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <RadioGroup.Root>
      <RadioGroup.Item value={"1"} label="One" description="First option" />
      <RadioGroup.Item
        value={"2"}
        label="Two"
        description="Second option"
        disabled={true}
        disabledTooltip="Can't pick this"
      />
      <RadioGroup.Item value={"3"} label="Three" description="Third option" />
    </RadioGroup.Root>
  ),
}

export const SimpleItems: Story = {
  render: () => (
    <RadioGroup.Root>
      <RadioGroup.SimpleItem value={"1"} label="One" />
      <RadioGroup.SimpleItem value={"2"} label="Two" />
    </RadioGroup.Root>
  ),
}

export const SimpleItemsWithDescription: Story = {
  render: () => (
    <RadioGroup.Root>
      <RadioGroup.SimpleItem
        value={"1"}
        label="One"
        description="First option"
      />
      <RadioGroup.SimpleItem
        value={"2"}
        label="Two"
        description="Second option"
      />
    </RadioGroup.Root>
  ),
}

export const Dot: Story = {
  render: () => (
    <RadioGroup.Root value="1">
      <RadioGroup.Dot value={"1"} />
    </RadioGroup.Root>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup.Root orientation="horizontal">
      <RadioGroup.Item value={"1"} label="One" description="First option" />
      <RadioGroup.Item value={"2"} label="Two" description="Second option" />
    </RadioGroup.Root>
  ),
}

export const HorizontalSimpleItems: Story = {
  render: () => (
    <RadioGroup.Root orientation="horizontal">
      <RadioGroup.SimpleItem value={"1"} label="One" />
      <RadioGroup.SimpleItem value={"2"} label="Two" />
    </RadioGroup.Root>
  ),
}
