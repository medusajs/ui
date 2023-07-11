import { XMark } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-dialog"
import * as React from "react"

import { Badge } from "@/components/badge"
import { Button } from "@/components/button"
import { Header as HeaderComponent } from "@/components/header"
import { clx } from "@/utils/clx"
import { Text } from "../text"

const Root = Primitives.Root
Root.displayName = "Modal.Root"

const Trigger = Primitives.Trigger
Trigger.displayName = "Modal.Trigger"

const Close = Primitives.Close
Close.displayName = "Modal.Close"

const Portal = Primitives.Portal
Portal.displayName = "Modal.Portal"

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
Overlay.displayName = "Modal.Overlay"

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
          "bg-ui-bg-base shadow-elevation-modal fixed left-[50%] top-[50%] z-50 flex h-full max-h-[560px] w-full max-w-[560px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg border",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200",
          className
        )}
        {...props}
      />
    </Portal>
  )
})
Content.displayName = "Modal.Content"

const Header = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="border-ui-border-base flex items-start justify-between gap-x-4 border-b px-8 py-6"
      {...props}
    >
      <div className={clx("flex flex-col gap-y-1", className)}>{children}</div>
      <div className="flex items-center gap-x-2">
        <Badge size={"sm"} color={"grey"}>
          esc
        </Badge>
        <Close asChild>
          <Button variant="transparent" size={"sm"} format={"icon"}>
            <XMark />
          </Button>
        </Close>
      </div>
    </div>
  )
}
Header.displayName = "Modal.Header"

const Body = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clx("flex-1", className)} {...props} />
}
Body.displayName = "Modal.Body"

const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clx(
        "border-ui-border-base flex items-center justify-end space-x-2 overflow-y-scroll border-t px-8 pb-6 pt-4",
        className
      )}
      {...props}
    />
  )
}
Footer.displayName = "Modal.Footer"

const Title = React.forwardRef<
  React.ElementRef<typeof Primitives.Title>,
  React.ComponentPropsWithoutRef<typeof Primitives.Title>
>(({ className, children, ...props }, ref) => (
  <Primitives.Title ref={ref} className={clx(className)} asChild {...props}>
    <HeaderComponent level="h1">{children}</HeaderComponent>
  </Primitives.Title>
))
Title.displayName = "Modal.Title"

const Description = React.forwardRef<
  React.ElementRef<typeof Primitives.Description>,
  React.ComponentPropsWithoutRef<typeof Primitives.Description>
>(({ className, children, ...props }, ref) => (
  <Primitives.Description
    ref={ref}
    className={clx(className)}
    asChild
    {...props}
  >
    <Text>{children}</Text>
  </Primitives.Description>
))
Description.displayName = "Modal.Description"

export const Modal = {
  Root,
  Body,
  Close,
  Content,
  Description,
  Footer,
  Header,
  Title,
  Trigger,
}
