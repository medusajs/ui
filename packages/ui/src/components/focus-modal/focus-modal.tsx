import { XMark } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-dialog"
import * as React from "react"

import { Kbd } from "@/components/kbd"
import { clx } from "@/utils/clx"
import { Button } from "../button"

const FocusModal = Primitives.Root
FocusModal.displayName = "FocusModal"

const FocusModalTrigger = Primitives.Trigger
FocusModalTrigger.displayName = "FocusModalTrigger"

const FocusModalPortal = ({
  className,
  ...props
}: Primitives.DialogPortalProps) => {
  return <Primitives.DialogPortal className={clx(className)} {...props} />
}
FocusModalPortal.displayName = "FocusModalPortal"

const FocusModalOverlay = React.forwardRef<
  React.ElementRef<typeof Primitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof Primitives.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <Primitives.Overlay
      ref={ref}
      className={clx(
        "bg-ui-bg-overlay fixed inset-0 z-50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
})
FocusModalOverlay.displayName = "FocusModalOverlay"

const FocusModalContent = React.forwardRef<
  React.ElementRef<typeof Primitives.Content>,
  React.ComponentPropsWithoutRef<typeof Primitives.Content>
>(({ className, ...props }, ref) => {
  return (
    <FocusModalPortal>
      <FocusModalOverlay />
      <Primitives.Content
        ref={ref}
        className={clx(
          "bg-ui-bg-base shadow-elevation-modal fixed inset-2 z-50 flex flex-col rounded-lg border",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
          className
        )}
        {...props}
      />
    </FocusModalPortal>
  )
})
FocusModalContent.displayName = "FocusModalContent"

const FocusModalHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clx(
        "border-ui-border-base flex items-start justify-between gap-x-4 border-b p-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-x-2">
        <Primitives.Close asChild>
          <Button variant="transparent" size={"sm"} format={"icon"}>
            <XMark />
          </Button>
        </Primitives.Close>
        <Kbd>esc</Kbd>
      </div>
      <div>{children}</div>
    </div>
  )
}
FocusModalHeader.displayName = "FocusModalHeader"

const FocusModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clx("flex-1", className)} {...props} />
}
FocusModalBody.displayName = "FocusModalBody"

export {
  FocusModal,
  FocusModalBody,
  FocusModalContent,
  FocusModalHeader,
  FocusModalTrigger,
}
