import * as Primitives from "@radix-ui/react-dialog"
import * as React from "react"

import { clx } from "@/utils/clx"
import { Header } from "../header"

const Modal = Primitives.Root
Modal.displayName = "Modal"

const ModalTrigger = Primitives.Trigger

const ModalPortal = ({ className, ...props }: Primitives.DialogPortalProps) => {
  return <Primitives.DialogPortal className={clx(className)} {...props} />
}

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof Primitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof Primitives.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <Primitives.Overlay
      ref={ref}
      className={clx(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
})
ModalOverlay.displayName = "ModalOverlay"

const ModalContent = React.forwardRef<
  React.ElementRef<typeof Primitives.Content>,
  React.ComponentPropsWithoutRef<typeof Primitives.Content>
>(({ className, ...props }, ref) => {
  return (
    <ModalPortal>
      <ModalOverlay />
      <Primitives.Content
        ref={ref}
        className={clx(
          "flex flex-col fixed left-[50%] top-[50%] z-50 w-full max-w-[560px] h-full max-h-[560px] translate-x-[-50%] translate-y-[-50%] border bg-base shadow-lg rounded-lg",
          className
        )}
        {...props}
      />
    </ModalPortal>
  )
})
ModalContent.displayName = "ModalContent"

const ModalHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="px-8 py-6 border-b border-base flex items-start justify-between gap-x-4"
      {...props}
    >
      <div className={clx("flex flex-col gap-y-1", className)}>{children}</div>
      <div>
        <Primitives.Close>x</Primitives.Close>
      </div>
    </div>
  )
}
ModalHeader.displayName = "ModalHeader"

const ModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clx("flex-1", className)} {...props} />
}
ModalBody.displayName = "ModalBody"

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clx(
        "flex items-center justify-end pt-4 pb-6 px-8 space-x-2 border-t border-base",
        className
      )}
      {...props}
    />
  )
}
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Primitives.Title>,
  React.ComponentPropsWithoutRef<typeof Primitives.Title>
>(({ className, children, ...props }, ref) => (
  <Primitives.Title
    ref={ref}
    className={clx(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    asChild
    {...props}
  >
    <Header>{children}</Header>
  </Primitives.Title>
))
ModalTitle.displayName = "ModalTitle"

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof Primitives.Description>,
  React.ComponentPropsWithoutRef<typeof Primitives.Description>
>(({ className, ...props }, ref) => (
  <Primitives.Description
    ref={ref}
    className={clx("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ModalDescription.displayName = "ModalDescription"

export {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
}
