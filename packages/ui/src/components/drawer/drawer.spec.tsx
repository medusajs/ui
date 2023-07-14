import { render, screen } from "@testing-library/react"
import * as React from "react"

import { Drawer } from "./drawer"
import { Button } from "../button"

describe("Drawer", () => {
    it("renders a drawer", () => {
        render(
            <Drawer data-testid="drawer">
                <Drawer.Trigger asChild>
                    <Button>Edit Variant</Button>
                </Drawer.Trigger>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>Edit Variant</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body></Drawer.Body>
                    <Drawer.Footer>
                        <Drawer.Close asChild>
                            <Button variant="secondary">Cancel</Button>
                        </Drawer.Close>
                        <Button>Save</Button>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer>
        )

        expect(screen.getByTestId("drawer")).toBeInTheDocument()
    })
})
