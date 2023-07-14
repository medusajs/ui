import { render, screen } from "@testing-library/react"
import * as React from "react"

import { FocusModal } from "./focus-modal"
import { Button } from "../button"

describe("FocusModal", () => {
    it("renders a focus-modal", () => {
        render(
            <FocusModal.Root>
                <FocusModal.Trigger asChild>
                    <Button>Edit Variant</Button>
                </FocusModal.Trigger>
                <FocusModal.Content>
                    <FocusModal.Header>
                        <Button>Save</Button>
                    </FocusModal.Header>
                    <FocusModal.Body></FocusModal.Body>
                </FocusModal.Content>
            </FocusModal.Root>
        )

        expect(screen.getByRole("focus-modal")).toBeInTheDocument()
    })
})
