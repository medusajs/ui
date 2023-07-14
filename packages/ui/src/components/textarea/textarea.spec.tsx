import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Textarea } from "./textarea"

describe("Textarea", () => {
    it("renders a textarea", () => {
        render(<Textarea data-testid="textarea" />)

        expect(screen.getByTestId("textarea")).toBeInTheDocument()
    })
})
