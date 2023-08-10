import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { Select, SelectItem, useSelectContext } from "./select"
import { ChevronDownMini, Spinner } from "@medusajs/icons"
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

const manyItems = [
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
  {
    value: 12,
    label: "Twelve",
  },
  {
    value: 13,
    label: "Thirteen",
  },
  {
    value: 14,
    label: "Fourteen",
  },
  {
    value: 15,
    label: "Fifteen",
  },
  {
    value: 16,
    label: "Sixteen",
  },
  {
    value: 17,
    label: "Seventeen",
  },
  {
    value: 18,
    label: "Eighteen",
  },
  {
    value: 19,
    label: "Nineteen",
  },
  {
    value: 20,
    label: "Twenty",
  },
  {
    value: 21,
    label: "Twenty One",
  },
  {
    value: 22,
    label: "Twenty Two",
  },
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
      <Select onChange={onChange}>
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
      <Select onChange={onChange}>
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
      <Select onChange={onChange}>
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
      <Select onChange={onChange}>
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
      <Select onChange={onChange}>
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
      <Select onChange={onChange}>
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
      <Select onChange={onChange} search>
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
      <Select multi={true} onChange={onChange}>
        <Select.Trigger>
          <Select.Value placeholder="Select currencies ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {currencies.slice(0, 3).map((item) => (
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
      <Select multi={true} onChange={onChange} search>
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
      <Select multi={true} onChange={onChange}>
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

const PaginatedSelect = () => {
  const [selected, setSelected] = React.useState<SelectItem[]>([])
  const [cursor, setCursor] = React.useState(0)
  const pageSize = 5

  const onSelect = (values: any) => {
    setSelected(values)
  }

  return (
    <div>
      <div className="mb-5 text-sm">
        Selected: {selected.map((item) => `${item.value} `)}
      </div>
      <div className="w-[256px]">
        <Select multi={true} onChange={onSelect}>
          <Select.Trigger>
            <Select.Value placeholder="Select some numbers" />
            <Select.TriggerIcon />
          </Select.Trigger>
          <Select.Content>
            {manyItems.slice(cursor, cursor + pageSize).map((item) => (
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
                {cursor / pageSize + 1} of{" "}
                {Math.ceil(manyItems.length / pageSize)}
              </Label>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setCursor((cursor) => cursor + pageSize)}
                disabled={manyItems.length - pageSize < cursor}
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

const SearchAndCreateSelect = () => {
  const [items, setItems] = React.useState(currencies)
  const [showCreate, setShowCreate] = React.useState<boolean | string>(false)

  const doFilter = (term: string) => {
    if (!term) {
      setItems(currencies)
      setShowCreate(false)
    }

    const filteredItems = currencies.filter(
      (currency) =>
        currency.value.includes(term) || currency.label.includes(term)
    )

    if (!filteredItems.length) setShowCreate(term)

    setItems(filteredItems)
  }

  return (
    <div className="w-[256px]">
      <Select onChange={onChange} search onSearch={doFilter}>
        <Select.Trigger>
          <Select.Value placeholder="Select a currency ..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {items.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
          {showCreate && (
            <>
              {/* On click, this could trigger a modal for item creation, etc. */}
              <div className="text-regular text-ui-fg-base hover:text-ui-fg-subtle cursor-pointer p-2">
                Create <span className="font-medium">{showCreate}</span>?
              </div>
            </>
          )}
        </Select.Content>
      </Select>
    </div>
  )
}

export const SearchAndCreate: Story = {
  render: SearchAndCreateSelect,
}

const ScrollPaginatedSelect = () => {
  const [cursor, setCursor] = React.useState(0)
  const pageSize = 5
  const loadedItems = manyItems.slice(0, cursor + pageSize)

  const handleScroll = () => {
    if (loadedItems.length < manyItems.length) {
      setTimeout(() => {
        setCursor((cursor) => cursor + 5)
      }, 500)
    }
  }

  return (
    <div className="w-[256px]">
      <Select onChange={onChange} onScrollToBottom={handleScroll}>
        <Select.Trigger>
          <Select.Value placeholder="Select a number..." />
          <Select.TriggerIcon />
        </Select.Trigger>
        <Select.Content>
          {loadedItems.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}

export const PaginationViaScroll: Story = {
  render: ScrollPaginatedSelect,
}
