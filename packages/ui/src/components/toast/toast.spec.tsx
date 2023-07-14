import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Toast, ToastProvider, ToastViewport } from "./toast"

describe("Toast", () => {
    it("renders a toast", () => {
        const props = {
            title: "Label",
            description: "The quick brown fox jumps over a lazy dog.",
            open: true,
        };
        render(
            <ToastProvider>
                <ToastViewport>
                    <Toast {...props} />
                </ToastViewport>
            </ToastProvider>
        )

        expect(screen.getByRole("toast")).toBeInTheDocument()
    })
})
