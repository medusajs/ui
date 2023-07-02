import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupDot, RadioGroupItem } from "./radio-group"
import { Label } from "../label"
import { Text } from "../text"

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
    <RadioGroup>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={"1"} id="r1" />
        <Label htmlFor="r1">One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={"2"} id="r2" />
        <Label htmlFor="r2">Two</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup>
      <div className="flex items-center space-x-2 mb-4">
        <RadioGroupItem value={"1"} id="r1" />
        <div>
          <Label htmlFor="r1">One</Label>
          <Text className={"text-gray-500 truncate"}>First option</Text>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={"2"} id="r2" />
        <div>
          <Label htmlFor="r2">Two</Label>
          <Text className={"text-gray-500 truncate"}>Second option</Text>
        </div>
      </div>
    </RadioGroup>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <RadioGroup>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={"1"} id="r1" />
        <Label htmlFor="r1">One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={"2"}
          disabled={true}
          disabledTooltip="Can't pick this"
          id="r2"
        />
        <Label htmlFor="r2">Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={"3"} id="r3" />
        <Label htmlFor="r3">Three</Label>
      </div>
    </RadioGroup>
  ),
}

export const Dot: Story = {
  render: () => (
    <RadioGroup value="1">
      <RadioGroupDot value={"1"} />
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup orientation="horizontal">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={"1"} id="r1" />
        <Label htmlFor="r1">One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={"2"} id="r2" />
        <Label htmlFor="r2">Two</Label>
      </div>
    </RadioGroup>
  ),
}
