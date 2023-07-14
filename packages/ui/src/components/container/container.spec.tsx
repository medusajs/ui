import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Container } from "./container"

describe("Container", () => {
    it("renders a container", () => {
        render(<Container />)

        expect(screen.getByRole("container")).toBeInTheDocument()
    })
})
