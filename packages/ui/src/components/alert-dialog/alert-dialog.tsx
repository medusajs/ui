import * as Primitives from "@radix-ui/react-alert-dialog"
import * as React from "react"

import { clx } from "@/utils/clx"
import { Button } from "../button"
import { Header } from "../header"
import { labelVariants } from "../label"

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
        "bg-ui-bg-overlay fixed inset-0 z-50 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
})
AlertDialogOverlay.displayName = "AlertDialogOverlay"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof Primitives.Title>,
  Omit<React.ComponentPropsWithoutRef<typeof Primitives.Title>, "asChild">
>(({ className, children, ...props }, ref) => {
  return (
    <Primitives.Title ref={ref} className={clx(className)} {...props} asChild>
      <Header level="h2">{children}</Header>
    </Primitives.Title>
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
          "bg-ui-bg-base shadow-elevation-flyout fixed left-[50%] top-[50%] z-50 flex w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg border",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
})
AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof Primitives.Description>,
  React.ComponentPropsWithoutRef<typeof Primitives.Description>
>(({ className, ...props }, ref) => {
  return (
    <Primitives.Description
      ref={ref}
      className={clx(
        "text-subtle",
        labelVariants({ variant: "md" }),
        className
      )}
      {...props}
    />
  )
})
AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof Primitives.Action>,
  Omit<React.ComponentPropsWithoutRef<typeof Primitives.Action>, "asChild">
>(({ className, children, ...props }, ref) => {
  return (
    <Primitives.Action
      ref={ref}
      className={clx("", className)}
      {...props}
      asChild
    >
      <Button variant="danger">{children}</Button>
    </Primitives.Action>
  )
})
AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof Primitives.Cancel>,
  Omit<React.ComponentPropsWithoutRef<typeof Primitives.Cancel>, "asChild">
>(({ className, children, ...props }, ref) => {
  return (
    <Primitives.Cancel ref={ref} className={clx(className)} {...props} asChild>
      <Button variant="secondary">{children}</Button>
    </Primitives.Cancel>
  )
})
AlertDialogCancel.displayName = "AlertDialogCancel"

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clx("flex flex-col gap-y-1 px-6 pt-6", className)}
      {...props}
    />
  )
}

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clx("flex items-center justify-end gap-x-2 p-6", className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
}
