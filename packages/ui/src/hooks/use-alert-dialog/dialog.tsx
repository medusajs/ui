import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog"
import { Input } from "@/components/input"
import { Label } from "@/components/label"

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

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {verificationText && (
          <div className="border-y border-base p-6 mt-6 flex flex-col gap-y-4">
            <Label htmlFor="verificationText" className="text-subtle">
              Please type{" "}
              <span className="font-medium text-default">
                {verificationText}
              </span>{" "}
              to confirm.
            </Label>
            <Input
              autoComplete="off"
              id="verificationText"
              placeholder={verificationText}
              onChange={handleUserInput}
            />
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={!validInput}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Dialog
