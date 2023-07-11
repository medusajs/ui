import * as Primitives from "@radix-ui/react-alert-dialog"
import * as React from "react"

import { Button } from "@/components/button"
import { Header as HeaderComponent } from "@/components/header"
import { labelVariants } from "@/components/label"
import { clx } from "@/utils/clx"

const Root = Primitives.Root
Root.displayName = "AlertDialog.Root"

const Trigger = Primitives.Trigger
Trigger.displayName = "AlertDialog.Trigger"

const Portal = ({ className, ...props }: Primitives.AlertDialogPortalProps) => {
  return <Primitives.AlertDialogPortal className={clx(className)} {...props} />
}
Portal.displayName = "AlertDialog.Portal"

const Overlay = React.forwardRef<
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
Overlay.displayName = "AlertDialog.Overlay"

const Title = React.forwardRef<
  React.ElementRef<typeof Primitives.Title>,
  Omit<React.ComponentPropsWithoutRef<typeof Primitives.Title>, "asChild">
>(({ className, children, ...props }, ref) => {
  return (
    <Primitives.Title ref={ref} className={clx(className)} {...props} asChild>
      <HeaderComponent level="h2">{children}</HeaderComponent>
    </Primitives.Title>
  )
})
Title.displayName = "AlertDialog.Title"

const Content = React.forwardRef<
  React.ElementRef<typeof Primitives.Content>,
  React.ComponentPropsWithoutRef<typeof Primitives.Content>
>(({ className, ...props }, ref) => {
  return (
    <Portal>
      <Overlay />
      <Primitives.Content
        ref={ref}
        className={clx(
          "bg-ui-bg-base shadow-elevation-flyout fixed left-[50%] top-[50%] z-50 flex w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg border",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200",
          className
        )}
        {...props}
      />
    </Portal>
  )
})
Content.displayName = "AlertDialog.Content"

const Description = React.forwardRef<
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
Description.displayName = "AlertDialog.Description"

const Action = React.forwardRef<
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
Action.displayName = "AlertDialog.Action"

const Cancel = React.forwardRef<
  React.ElementRef<typeof Primitives.Cancel>,
  Omit<React.ComponentPropsWithoutRef<typeof Primitives.Cancel>, "asChild">
>(({ className, children, ...props }, ref) => {
  return (
    <Primitives.Cancel ref={ref} className={clx(className)} {...props} asChild>
      <Button variant="secondary">{children}</Button>
    </Primitives.Cancel>
  )
})
Cancel.displayName = "AlertDialog.Cancel"

const Header = ({
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

const Footer = ({
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

export const AlertDialog = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Action,
  Cancel,
  Header,
  Footer,
}
