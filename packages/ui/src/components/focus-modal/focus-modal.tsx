import * as Primitives from "@radix-ui/react-dialog"
import * as React from "react"

import { clx } from "@/utils/clx"

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
        "fixed inset-0 z-50 bg-gray-200/80 backdrop-blur-sm",
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
          "flex flex-col fixed inset-2 z-50 border bg-base shadow-lg rounded-lg",
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
        "p-4 border-b border-base flex items-start justify-between gap-x-4",
        className
      )}
      {...props}
    >
      <div>
        <Primitives.Close>x</Primitives.Close>
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
