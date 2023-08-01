import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Select, SelectItem, useSelectContext } from "./select"
import { ChevronDownMini } from "@medusajs/icons"
import { Button } from "../button"
import { clx } from "@/utils/clx"
import { Label } from "../label"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Select>

const onChange = (value: SelectItem | SelectItem[]) =>
  console.log(
    `Currently selected: ${
      Array.isArray(value) ? `[${value.map((val) => val.value)}]` : value.value
    }`
  )

const currencies = [
  {
    value: "eur",
    label: "EUR",
    suffix: "Euro",
  },
  {
    value: "usd",
    label: "USD",
    suffix: "US Dollar",
  },
  {
    value: "dkk",
    label: "DKK",
    suffix: "Danish Krone",
  },
]

const regions = [
  { value: "na", label: "NA" },
  { value: "eu", label: "EU" },
]

const CustomIcon = () => {
  const { isOpen } = useSelectContext()

  return (
    <ChevronDownMini
      className={clx("transition-all", { "rotate-180": isOpen })}
    />
  )
}

export const Default: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} onChange={onChange}>
        <Select.Trigger size="small">
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} onChange={onChange}>
        <Select.Trigger disabled={true}>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const CustomTriggerIconAnimated: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon>
            <CustomIcon />
          </Select.TriggerIcon>
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const SuffixedItems: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
              <Label className="text-ui-fg-muted ml-auto">{item.suffix}</Label>
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const GroupedItems: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={[...currencies, ...regions]} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          <Select.Label>Currencies</Select.Label>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
          <Select.Separator />
          <Select.Label>Regions</Select.Label>
          {regions.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const SingleSearchable: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} onChange={onChange} search>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const Multi: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} multi={true} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select currencies ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const MultiSearchable: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} multi={true} onChange={onChange} search>
        <Select.Trigger>
          <Select.Value placeholder="Select currencies ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const MultiSelectAll: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} multi={true} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select currencies ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          <Select.SelectAll />
          <Select.Separator />
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const SingleSearchableInMenu: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          <Select.Search onChange={(e) => console.log(e.target.value)} />
          <Select.Separator />
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}

export const MultiSearchableInMenu: Story = {
  render: () => (
    <div className="w-[256px]">
      <Select items={currencies} multi={true} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select currencies ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          <Select.Search onChange={(e) => console.log(e.target.value)} />
          <Select.Separator />
          {currencies.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ),
}
