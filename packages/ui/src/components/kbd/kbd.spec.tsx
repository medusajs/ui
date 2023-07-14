import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Kbd } from "./kbd"

describe("Kbd", () => {
    it("renders a kbd", () => {
        render(<Kbd>⌘</Kbd>)

        expect(screen.getByRole("kbd")).toBeInTheDocument()
    })
})
