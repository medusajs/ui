import { fireEvent, render, screen, within } from "@testing-library/react"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "../label"

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

test("Default value causes the correct radio to be toggled", () => {
  const defaultItem = items[Math.floor(Math.random() * items.length)]

  render(
    <RadioGroup defaultValue={defaultItem.value}>
      {items.map((item) => (
        <>
          <RadioGroupItem
            key={item.value}
            value={item.value}
            data-testid={item.value}
            id={item.value}
          />
        </>
      ))}
    </RadioGroup>
  )

  const radioButton = screen.getByTestId(defaultItem.value)
  expect(radioButton).toHaveAttribute("aria-checked", "true")
})

test("Clicking on a for-label toggles the correct radio", () => {
  render(
    <RadioGroup>
      {items.map((item) => (
        <>
          <RadioGroupItem
            key={item.value}
            value={item.value}
            data-testid={item.value}
            id={item.value}
          />
          <Label htmlFor={item.value}>{item.label}</Label>
        </>
      ))}
    </RadioGroup>
  )

  const item = items[Math.floor(Math.random() * items.length)]

  const label = screen.getByText(item.label)
  const radioButton = screen.getByTestId(item.value)

  expect(radioButton).toHaveAttribute("aria-checked", "false")

  fireEvent.click(label)

  expect(radioButton).toHaveAttribute("aria-checked", "true")
})
