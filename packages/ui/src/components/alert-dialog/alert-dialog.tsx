import * as Primitives from "@radix-ui/react-alert-dialog"
import * as React from "react"

import { clx } from "@/utils/clx"

const AlertDialog = Primitives.Root
AlertDialog.displayName = "AlertDialog"

const AlertDialogTrigger = Primitives.Trigger
AlertDialogTrigger.displayName = "AlertDialogTrigger"

const AlertDialogPortal = ({
  className,
  ...props
}: Primitives.AlertDialogPortalProps) => {
  return <Primitives.AlertDialogPortal className={clx(className)} {...props} />
}
AlertDialogPortal.displayName = "AlertDialogPortal"

const AlertDialogOverlay = React.forwardRef<
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
AlertDialogOverlay.displayName = "AlertDialogOverlay"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof Primitives.Title>,
  React.ComponentPropsWithoutRef<typeof Primitives.Title>
>(({ className, ...props }, ref) => {
  return (
    <Primitives.Title
      ref={ref}
      className={clx(
        "flex flex-col fixed inset-2 z-50 border bg-base shadow-lg rounded-lg",
        className
      )}
      {...props}
    />
  )
})
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof Primitives.Content>,
  React.ComponentPropsWithoutRef<typeof Primitives.Content>
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Primitives.Content
        ref={ref}
        className={clx(
          "flex flex-col fixed inset-2 z-50 border bg-base shadow-lg rounded-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
})
AlertDialogContent.displayName = "AlertDialogContent"
