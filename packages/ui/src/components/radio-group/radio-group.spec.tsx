import { render, screen } from "@testing-library/react"
import * as React from "react"

import { RadioGroup } from "./radio-group"

describe("RadioGroup", () => {
    it("renders a radio-group", () => {
        render(
            <RadioGroup.Root>
                <RadioGroup.Item value="1" />
                <RadioGroup.Item value="2" />
                <RadioGroup.Item value="3" />
            </RadioGroup.Root>
        )

        expect(screen.getByRole("radio-group")).toBeInTheDocument()
    })
})
