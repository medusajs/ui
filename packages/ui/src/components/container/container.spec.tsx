import { render, screen } from "@testing-library/react"
import { Container } from "./container"

test("Container renders its contents", () => {
  render(<Container>Foo bar</Container>)

  expect(screen.getByText("Foo bar")).toBeInTheDocument()
})
