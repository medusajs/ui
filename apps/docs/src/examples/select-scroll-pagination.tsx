import { Select } from "@medusajs/ui"
import { faker } from "@faker-js/faker"
import React from "react"

const products = Array(27)
  .fill(null)
  .map((_) => {
    const product = faker.commerce.productName()
    return { value: product.toLowerCase().replaceAll(" ", "-"), label: product }
  })

export default function SelectScrollPagination() {
  const [cursor, setCursor] = React.useState(0)
  const pageSize = 5
  const loadedItems = products.slice(0, cursor + pageSize)

  const handleScroll = () => {
    if (loadedItems.length < products.length) {
      setTimeout(() => {
        setCursor((cursor) => cursor + 5)
      }, 500)
    }
  }

  const onChange = (value: any) =>
    console.log(
      `Currently selected: ${
        Array.isArray(value)
          ? `[${value.map((val) => val.value)}]`
          : value.value
      }`
    )

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
