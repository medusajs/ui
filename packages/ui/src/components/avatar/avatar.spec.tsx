import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Avatar } from "./avatar"

describe("Avatar", () => {
    it("should render", async () => {
        const props = {
            src: "https://avatars.githubusercontent.com/u/10656202?v=4",
            fallback: "test",
        };
        render(<Avatar {...props} />)
        expect(screen.getByText("test")).toBeInTheDocument()
    })
})
