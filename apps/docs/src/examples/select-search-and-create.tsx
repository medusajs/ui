import { Select } from "@medusajs/ui"
import React from "react"

const currencies = [
  {
    value: "eur",
    label: "EUR",
  },
  {
    value: "usd",
    label: "USD",
  },
  {
    value: "dkk",
    label: "DKK",
  },
]

export default function SelectSearchAndCreate() {
  const [items, setItems] = React.useState(currencies)
  const [showCreate, setShowCreate] = React.useState<boolean | string>(false)

  const onChange = (value: any) =>
    console.log(
      `Currently selected: ${
        Array.isArray(value)
          ? `[${value.map((val) => val.value)}]`
          : value.value
      }`
    )

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
