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

const PaginatedSelect = () => {
  const [selected, setSelected] = React.useState<SelectItem[]>([])
  const [cursor, setCursor] = React.useState(0)
  const pageSize = 5

  const items = [
    {
      value: 1,
      label: "One",
    },
    {
      value: 2,
      label: "Two",
    },
    {
      value: 3,
      label: "Three",
    },
    {
      value: 4,
      label: "Four",
    },
    {
      value: 5,
      label: "Five",
    },
    {
      value: 6,
      label: "Six",
    },
    {
      value: 7,
      label: "Seven",
    },
    {
      value: 8,
      label: "Eight",
    },
    {
      value: 9,
      label: "Nine",
    },
    {
      value: 10,
      label: "Ten",
    },
    {
      value: 11,
      label: "Eleven",
    },
  ]

  const onSelect = (values: any) => {
    setSelected(values)
  }

  return (
    <div>
      <div className="mb-5 text-sm">
        Selected: {selected.map((item) => `${item.value} `)}
      </div>
      <div className="w-[256px]">
        <Select items={items} multi={true} onChange={onSelect}>
          <Select.Trigger>
            <Select.Value placeholder="Select some numbers" />
            <Select.TriggerIcon />
          </Select.Trigger>
          <Select.Content>
            {items.slice(cursor, cursor + pageSize).map((item) => (
              <Select.Item key={item.value} item={item}>
                {item.label}
              </Select.Item>
            ))}
            <Select.Separator />
            <div className="flex justify-between p-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setCursor((cursor) => cursor - pageSize)}
                disabled={cursor === 0}
              >
                Prev
              </Button>
              <Label className="text-ui-fg-muted">
                {cursor / pageSize + 1} of {Math.ceil(items.length / pageSize)}
              </Label>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setCursor((cursor) => cursor + pageSize)}
                disabled={items.length - pageSize < cursor}
              >
                Next
              </Button>
            </div>
          </Select.Content>
        </Select>
      </div>
    </div>
  )
}

export const Pagination: Story = {
  render: PaginatedSelect,
}
