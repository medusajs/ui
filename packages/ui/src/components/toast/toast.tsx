import {
  CheckCircleSolid,
  ExclamationCircleSolid,
  InformationCircleSolid,
  Spinner,
  XCircleSolid,
} from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-toast"
import * as React from "react"

import { labelVariants } from "@/components/label"
import { clx } from "@/utils/clx"

const ToastProvider = Primitives.Provider
ToastProvider.displayName = "ToastProvider"

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof Primitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof Primitives.Viewport>
>(({ className, ...props }, ref) => (
  <Primitives.Viewport
    ref={ref}
    className={clx(
      "fixed inset-4 z-[100] flex max-h-screen w-full flex-col-reverse md:max-w-[440px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

interface ActionProps {
  label: string
  altText: string
  onClick: () => void | Promise<void>
}

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof Primitives.Root> {
  variant?: "info" | "success" | "warning" | "error" | "loading"
  title?: string
  description?: string
  action?: ActionProps
}

const Toast = React.forwardRef<
  React.ElementRef<typeof Primitives.Root>,
  ToastProps
>(({ className, variant, title, description, action, ...props }, ref) => {
  let Icon = undefined

  switch (variant) {
    case "success":
      Icon = <CheckCircleSolid className="text-ui-tag-green-icon" />
      break
    case "warning":
      Icon = <ExclamationCircleSolid className="text-ui-tag-orange-icon" />
      break
    case "error":
      Icon = <XCircleSolid className="text-ui-tag-red-icon" />
      break
    case "loading":
      Icon = <Spinner className="text-ui-tag-blue-icon animate-spin" />
      break
    default:
      Icon = <InformationCircleSolid className="text-ui-fg-base" />
      break
  }

  if (action && !action.altText) {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Omitting `altText` from the action is not recommended. Please provide a description for screen readers."
      )
    }
  }

  return (
    <Primitives.Root
      ref={ref}
      className={clx(
        "bg-ui-bg-base shadow-elevation-flyout w-full overflow-hidden rounded-md",
        className
      )}
      {...props}
    >
      <div className="divide-x-ui-border-base flex h-full w-full items-center divide-x">
        <div className="flex flex-1 items-start gap-x-3 p-4">
          {Icon}
          <div>
            {title && (
              <Primitives.Title
                className={clx(
                  labelVariants({
                    variant: "sm",
                    weight: "plus",
                  }),
                  "text-ui-fg-base"
                )}
              >
                {title}
              </Primitives.Title>
            )}
            {description && (
              <Primitives.Description
                className={clx(
                  labelVariants({
                    variant: "md",
                  }),
                  "text-ui-fg-subtle"
                )}
              >
                {description}
              </Primitives.Description>
            )}
          </div>
        </div>
        <div className="divide-y-ui-border-base flex h-full flex-col divide-y">
          {action && (
            <Primitives.Action
              altText={action.altText}
              className={clx(
                "text-ui-fg-base bg-ui-bg-base hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed h-full px-6 transition-colors",
                labelVariants({
                  variant: "sm",
                  weight: "plus",
                }),
                {
                  "text-ui-fg-error": variant === "error",
                }
              )}
              onClick={(e) => {
                e.preventDefault()
                action.onClick
              }}
              type="button"
              asChild
            >
              <button
                className={clx(
                  "text-ui-fg-base bg-ui-bg-base hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed h-full px-6 transition-colors",
                  labelVariants({
                    variant: "sm",
                    weight: "plus",
                  }),
                  {
                    "text-ui-fg-error": variant === "error",
                  }
                )}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            </Primitives.Action>
          )}
          <Primitives.Close
            className={clx(
              "text-ui-fg-subtle bg-ui-bg-base hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed flex h-full items-center justify-center px-6 transition-colors",
              labelVariants({
                variant: "sm",
                weight: "plus",
              })
            )}
            aria-label="Close"
            asChild
          >
            <span aria-hidden>Close</span>
          </Primitives.Close>
        </div>
      </div>
    </Primitives.Root>
  )
})
Toast.displayName = "Toast"

type ToastActionElement = ActionProps

export {
  Toast,
  ToastProvider,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
}
