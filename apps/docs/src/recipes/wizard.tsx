"use client"

import { Button, FocusModal, ProgressTabs } from "@medusajs/ui"
import * as React from "react"

type Status = "not_started" | "in_progress" | "completed"

export default async function Wizard() {
  const [open, setOpen] = React.useState(false)

  const [step, setStep] = React.useState<string>("step_1")
  const [progress, setProgress] = React.useState<{
    step_1: Status
    step_2: Status
    step_3: Status
  }>({
    step_1: "in_progress",
    step_2: "not_started",
    step_3: "not_started",
  })

  React.useEffect(() => {
    setProgress((prev) => ({
      ...prev,
      [step]: "in_progress",
    }))
  }, [step])

  const handleClose = React.useCallback(() => {
    setOpen(false)
    setStep("step_1")
    setProgress({
      step_1: "in_progress",
      step_2: "not_started",
      step_3: "not_started",
    })
  }, [])

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        handleClose()
      }

      setOpen(open)
    },
    [handleClose]
  )

  const handleNext = React.useCallback(() => {
    switch (step) {
      case "step_1":
        setStep("step_2")
        setProgress((prev) => ({
          ...prev,
          step_1: "completed",
        }))
        break
      case "step_2":
        setStep("step_3")
        setProgress((prev) => ({
          ...prev,
          step_2: "completed",
        }))
        break
      default:
        handleClose()
        break
    }
  }, [step, handleClose])

  return (
    <FocusModal open={open} onOpenChange={handleOpenChange}>
      <FocusModal.Trigger asChild>
        <Button>Open</Button>
      </FocusModal.Trigger>
      <ProgressTabs value={step} onValueChange={setStep}>
        <FocusModal.Content>
          <FocusModal.Header>
            <ProgressTabs.List className="border-l-ui-border-base -my-2 ml-2 w-full border-l">
              <ProgressTabs.Trigger value="step_1">
                <ProgressTabs.Indicator status={progress.step_1} />
                Step 1
              </ProgressTabs.Trigger>
              <ProgressTabs.Trigger value="step_2">
                <ProgressTabs.Indicator status={progress.step_2} />
                Step 2
              </ProgressTabs.Trigger>
              <ProgressTabs.Trigger value="step_3">
                <ProgressTabs.Indicator status={progress.step_3} />
                Step 3
              </ProgressTabs.Trigger>
            </ProgressTabs.List>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleNext}>
              {step === "step_3" ? "Submit" : "Continue"}
            </Button>
          </FocusModal.Header>
          <FocusModal.Body>
            <ProgressTabs.Content value="step_1">
              <div>Step 1</div>
            </ProgressTabs.Content>
            <ProgressTabs.Content value="step_2">
              <div>Step 2</div>
            </ProgressTabs.Content>
            <ProgressTabs.Content value="step_3">
              <div>Step 3</div>
            </ProgressTabs.Content>
          </FocusModal.Body>
        </FocusModal.Content>
      </ProgressTabs>
    </FocusModal>
  )
}
