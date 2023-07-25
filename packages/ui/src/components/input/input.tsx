import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { labelVariants } from "@/components/label"
import { clx } from "@/utils/clx"
import { Eye, EyeSlash } from "@medusajs/icons"

const inputVariants = cva(
  "bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover border-ui-border-loud-muted disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:!border-ui-border-base focus:border-ui-border-interactive focus:shadow-borders-active placeholder:text-ui-fg-muted text-ui-fg-base aria-[invalid=true]:!border-ui-border-error aria-[invalid=true]:focus:!shadow-borders-error invalid:!border-ui-border-error invalid:focus:!shadow-borders-error relative w-full rounded-md border outline-none transition-all disabled:cursor-not-allowed disabled:!shadow-none",
  {
    variants: {
      size: {
        base: "h-10 px-3 py-[9px]",
        small: "h-8",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
)

const Input = React.forwardRef<
  HTMLInputElement,
  VariantProps<typeof inputVariants> &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">
>(({ className, type, size = "base", ...props }, ref) => {
  const [typeState, setTypeState] = React.useState(type)

  const isPassword = type === "password"

  return (
    <div className="relative">
      <input
        ref={ref}
        type={isPassword ? typeState : type}
        className={clx(
          inputVariants({ size: size }),
          labelVariants({ size: size }),
          {
            "pr-11": isPassword,
          },
          className
        )}
        {...props}
      />
      {isPassword && (
        <div
          className={clx(
            "absolute bottom-0 right-0 flex w-11 items-center justify-center",
            {
              "h-10": size === "base",
              "h-8": size === "small",
            }
          )}
        >
          <button
            className="text-ui-fg-muted hover:text-ui-fg-base focus:text-ui-fg-base focus:shadow-borders-interactive-w-focus active:text-ui-fg-base h-fit w-fit rounded-sm outline-none transition-all"
            type="button"
            onClick={() => {
              setTypeState(typeState === "password" ? "text" : "password")
            }}
          >
            <span className="sr-only">
              {typeState === "password" ? "Show password" : "Hide password"}
            </span>
            {typeState === "password" ? <Eye /> : <EyeSlash />}
          </button>
        </div>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
