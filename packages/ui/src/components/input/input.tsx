import { Eye, EyeSlash, MagnifyingGlassMini } from "@medusajs/icons"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const inputVariants = cva(
  "bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover border-ui-border-loud-muted disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:!border-ui-border-base focus:border-ui-border-interactive focus:shadow-borders-active placeholder:text-ui-fg-muted text-ui-fg-base aria-[invalid=true]:!border-ui-border-error aria-[invalid=true]:focus:!shadow-borders-error invalid:!border-ui-border-error invalid:focus:!shadow-borders-error relative w-full appearance-none rounded-md border outline-none transition-all disabled:cursor-not-allowed disabled:!shadow-none [&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
  {
    variants: {
      size: {
        base: "txt-compact-medium h-10 px-3 py-[9px]",
        small: "txt-compact-small h-8 px-2 py-[5px]",
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
  const isSearch = type === "search"

  return (
    <div className="relative">
      {isSearch && (
        <div
          className={clx(
            "text-ui-fg-muted absolute bottom-0 left-0 z-10 flex items-center justify-center",
            {
              "h-10 w-11": size === "base",
              "h-8 w-9": size === "small",
            }
          )}
          role="img"
        >
          <MagnifyingGlassMini />
        </div>
      )}
      <input
        ref={ref}
        type={isPassword ? typeState : type}
        className={clx(
          inputVariants({ size: size }),
          {
            "pr-11": isPassword && size === "base",
            "pl-11": isSearch && size === "base",
            "pr-9": isPassword && size === "small",
            "pl-9": isSearch && size === "small",
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
              "h-10 w-11": size === "base",
              "h-8 w-9": size === "small",
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
