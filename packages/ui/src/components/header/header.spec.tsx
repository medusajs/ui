import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Header } from "./header"

describe("Header", () => {
  it("should render a h1 successfully", async () => {
    render(<Header>Header</Header>)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("should render a h2 successfully", async () => {
    render(<Header level="h2">Header</Header>)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })

  it("should render a h3 successfully", async () => {
    render(<Header level="h3">Header</Header>)
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument()
  })
})
