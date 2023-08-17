import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Select } from "./select"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Select>

const data = [
  {
    label: "Shirts",
    items: [
      {
        value: "dress-shirt-striped",
        label: "Striped Dress Shirt",
      },
      {
        value: "relaxed-button-down",
        label: "Relaxed Fit Button Down",
      },
      {
        value: "slim-button-down",
        label: "Slim Fit Button Down",
      },
      {
        value: "dress-shirt-solid",
        label: "Solid Dress Shirt",
      },
      {
        value: "dress-shirt-check",
        label: "Check Dress Shirt",
      },
    ],
  },
  {
    label: "T-Shirts",
    items: [
      {
        value: "v-neck",
        label: "V-Neck",
      },
      {
        value: "crew-neck",
        label: "Crew Neck",
      },
      {
        value: "henley",
        label: "Henley",
      },
      {
        value: "polo",
        label: "Polo",
      },
      {
        value: "mock-neck",
        label: "Mock Neck",
      },
      {
        value: "turtleneck",
        label: "Turtleneck",
      },
      {
        value: "scoop-neck",
        label: "Scoop Neck",
      },
    ],
  },
]

export const Default: Story = {
  render: () => {
    return (
      <div className="w-[250px]">
        <Select>
          <Select.Trigger>
            <Select.Value placeholder="Select" />
          </Select.Trigger>
          <Select.Content>
            {data.map((group) => (
              <Select.Group key={group.label}>
                <Select.Label>{group.label}</Select.Label>
                {group.items.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Group>
            ))}
          </Select.Content>
        </Select>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-[250px]">
        <Select>
          <Select.Trigger disabled={true}>
            <Select.Value placeholder="Select" />
          </Select.Trigger>
          <Select.Content>
            {data.map((group) => (
              <Select.Group key={group.label}>
                <Select.Label>{group.label}</Select.Label>
                {group.items.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Group>
            ))}
          </Select.Content>
        </Select>
      </div>
    )
  },
}

export const Small: Story = {
  render: () => {
    return (
      <div className="w-[250px]">
        <Select size="small">
          <Select.Trigger>
            <Select.Value placeholder="Select" />
          </Select.Trigger>
          <Select.Content>
            {data.map((group) => (
              <Select.Group key={group.label}>
                <Select.Label>{group.label}</Select.Label>
                {group.items.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Group>
            ))}
          </Select.Content>
        </Select>
      </div>
    )
  },
}
