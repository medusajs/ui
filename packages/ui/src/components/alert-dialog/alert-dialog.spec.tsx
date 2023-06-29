import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"

import { Button } from "@/components/button"

const TRIGGER_TEXT = "Open"
const TITLE_TEXT = "Delete something"
const DESCRIPTION_TEXT = "Are you sure? This cannot be undone."
const CANCEL_TEXT = "Cancel"
const CONFIRM_TEXT = "Confirm"

describe("AlertDialog", () => {
  let rendered: RenderResult
  let trigger: HTMLElement

  beforeEach(() => {
    rendered = render(
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>{TRIGGER_TEXT}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{TITLE_TEXT}</AlertDialogTitle>
            <AlertDialogDescription>{DESCRIPTION_TEXT}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{CANCEL_TEXT}</AlertDialogCancel>
            <AlertDialogAction>{CONFIRM_TEXT}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    trigger = rendered.getByText(TRIGGER_TEXT)
  })

  afterEach(() => {
    cleanup()
  })

  it("renders a basic alert dialog when the trigger is clicked", async () => {
    fireEvent.click(trigger)

    const title = await rendered.findByText(TITLE_TEXT)
    const description = await rendered.findByText(DESCRIPTION_TEXT)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it("close the dialog when the cancel button is clicked", async () => {
    fireEvent.click(trigger)

    const title = rendered.queryByText(TITLE_TEXT)
    const description = rendered.queryByText(DESCRIPTION_TEXT)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()

    const cancelButton = await rendered.findByText(CANCEL_TEXT)

    fireEvent.click(cancelButton)

    expect(title).not.toBeInTheDocument()
    expect(description).not.toBeInTheDocument()
  })

  it("close the dialog when the confirm button is clicked", async () => {
    fireEvent.click(trigger)

    const title = rendered.queryByText(TITLE_TEXT)
    const description = rendered.queryByText(DESCRIPTION_TEXT)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()

    const confirmButton = await rendered.findByText(CONFIRM_TEXT)

    fireEvent.click(confirmButton)

    expect(title).not.toBeInTheDocument()
    expect(description).not.toBeInTheDocument()
  })
})
