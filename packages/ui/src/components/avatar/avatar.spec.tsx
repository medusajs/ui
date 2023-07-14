import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Avatar } from "./avatar"

describe("Avatar", () => {
    it("should render", async () => {
        render(<Avatar fallback="J" />)
        expect(screen.getByText("Avatar")).toBeInTheDocument()
    })
})
