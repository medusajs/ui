import { render, screen } from "@testing-library/react"

import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    render(<Checkbox />)

    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })
})
