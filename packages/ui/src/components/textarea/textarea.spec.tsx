import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Textarea } from "./textarea"

describe("Textarea", () => {
    it("renders a textarea", () => {
        render(<Textarea />)

        expect(screen.getByRole("textarea")).toBeInTheDocument()
    })
})
