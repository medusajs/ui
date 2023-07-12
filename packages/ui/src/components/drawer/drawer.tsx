import { XMark } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-dialog"
import * as React from "react"

import { Badge } from "@/components/badge"
import { Button } from "@/components/button"
import { Heading } from "@/components/heading"
import { clx } from "@/utils/clx"
import { Text } from "../text"

const Root = Primitives.Root
Root.displayName = "Drawer.Root"

const Trigger = Primitives.Trigger
Trigger.displayName = "Drawer.Trigger"

const Close = Primitives.Close
Close.displayName = "Drawer.Close"

const Portal = Primitives.Portal
Portal.displayName = "Drawer.Portal"

const Overlay = React.forwardRef<
  React.ElementRef<typeof Primitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof Primitives.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <Primitives.Overlay
      ref={ref}
      className={clx("fixed inset-0 z-50", className)}
      {...props}
    />
  )
})
Overlay.displayName = "Drawer.Overlay"

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
          "bg-ui-bg-base shadow-elevation-modal fixed inset-y-2 right-2 z-50 flex w-full max-w-[560px] flex-1 flex-col rounded-lg border focus:outline-none",
          // "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 duration-200",  // Re-enable when Admin UI has been cleaned up
          className
        )}
        {...props}
      />
    </Portal>
  )
})
Content.displayName = "Drawer.Content"

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
Header.displayName = "Drawer.Header"

const Body = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clx("flex-1 px-8 pb-16 pt-6", className)} {...props} />
}
Body.displayName = "Drawer.Body"

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
Footer.displayName = "Drawer.Footer"

const Title = React.forwardRef<
  React.ElementRef<typeof Primitives.Title>,
  React.ComponentPropsWithoutRef<typeof Primitives.Title>
>(({ className, children, ...props }, ref) => (
  <Primitives.Title ref={ref} className={clx(className)} asChild {...props}>
    <Heading level="h1">{children}</Heading>
  </Primitives.Title>
))
Title.displayName = "Drawer.Title"

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
Description.displayName = "Drawer.Description"

export const Drawer = Object.assign(Root, {
  Body,
  Close,
  Content,
  Description,
  Footer,
  Header,
  Title,
  Trigger,
})
