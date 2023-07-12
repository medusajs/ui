import * as React from "react"

import { AlertDialog } from "@/components/alert-dialog"
import { Input } from "@/components/input"
import { Label, labelVariants } from "@/components/label"
import { clx } from "../../utils/clx"

export type DialogProps = {
  open: boolean
  title: string
  description: string
  verificationText?: string
  cancelText?: string
  confirmText?: string
  onConfirm: () => void
  onCancel: () => void
}

const Dialog = ({
  open,
  title,
  description,
  verificationText,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm,
  onCancel,
}: DialogProps) => {
  const [userInput, setUserInput] = React.useState("")

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value)
  }

  const validInput = React.useMemo(() => {
    if (!verificationText) {
      return true
    }

    return userInput === verificationText
  }, [userInput, verificationText])

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validInput) {
      onConfirm()
    }
  }

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onCancel()
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [onCancel, open])

  return (
    <AlertDialog open={open}>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{title}</AlertDialog.Title>
          <AlertDialog.Description>{description}</AlertDialog.Description>
        </AlertDialog.Header>
        {verificationText && (
          <form onSubmit={handleFormSubmit}>
            <fieldset className="border-ui-border-base mt-6 flex flex-col gap-y-4 border-y p-6">
              <Label htmlFor="verificationText" className="text-subtle">
                Please type{" "}
                <span
                  className={clx(
                    labelVariants({ size: "base", weight: "plus" }),
                    "text-ui-fg-base"
                  )}
                >
                  {verificationText}
                </span>{" "}
                to confirm.
              </Label>
              <Input
                autoFocus
                autoComplete="off"
                id="verificationText"
                placeholder={verificationText}
                onChange={handleUserInput}
              />
            </fieldset>
          </form>
        )}
        <AlertDialog.Footer>
          <AlertDialog.Cancel onClick={onCancel}>
            {cancelText}
          </AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={verificationText ? undefined : onConfirm}
            disabled={!validInput}
            type={verificationText ? "submit" : "button"}
          >
            {confirmText}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

export default Dialog
