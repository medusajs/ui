import { render, screen, within } from "@testing-library/react"
import { RadioGroup } from "./radio-group"

const items = [
  {
    value: "foo",
    label: "Foo",
    description: "Foo desc",
  },
  {
    value: "bar",
    label: "Bar",
    description: "Bar desc",
  },
  {
    value: "baz",
    label: "Baz",
    description: "Baz desc",
  },
]

test("It renders all labels and descriptions on simple items", () => {
  render(
    <RadioGroup.Root>
      {items.map((item) => (
        <RadioGroup.SimpleItem
          key={item.value}
          label={item.label}
          value={item.value}
          description={item.description}
          data-testid={item.value}
        />
      ))}
    </RadioGroup.Root>
  )

  items.forEach(({ value, label, description }) => {
    const itemEl = screen.getByTestId(value)

    expect(itemEl).toBeInTheDocument()

    const labelEl = screen.getByText(label)
    const descriptionEl = screen.getByText(description)

    expect(labelEl).toBeInTheDocument()
    expect(descriptionEl).toBeInTheDocument()
  })
})

test("It renders all labels and descriptions on regular items", () => {
  render(
    <RadioGroup.Root>
      {items.map((item) => (
        <RadioGroup.Item
          key={item.value}
          label={item.label}
          value={item.value}
          description={item.description}
          data-testid={item.value}
        />
      ))}
    </RadioGroup.Root>
  )

  items.forEach(({ value, label, description }) => {
    const itemEl = screen.getByTestId(value)

    expect(itemEl).toBeInTheDocument()

    const labelEl = screen.getByText(label)
    const descriptionEl = screen.getByText(description)

    expect(labelEl).toBeInTheDocument()
    expect(descriptionEl).toBeInTheDocument()
  })
})
