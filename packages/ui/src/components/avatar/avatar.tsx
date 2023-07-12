import * as Primitives from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const avatarVariants = cva(
  "border-ui-border-strong flex shrink-0 items-center justify-center overflow-hidden border",
  {
    variants: {
      variant: {
        squared: "rounded-lg",
        rounded: "rounded-full",
      },
      size: {
        default: "h-8 w-8",
        large: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "rounded",
      size: "default",
    },
  }
)

const innerVariants = cva("aspect-square object-cover object-center", {
  variants: {
    variant: {
      squared: "rounded-lg",
      rounded: "rounded-full",
    },
    size: {
      default: "h-6 w-6",
      large: "h-8 w-8",
    },
  },
  defaultVariants: {
    variant: "rounded",
    size: "default",
  },
})

interface AvatarProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof Primitives.Root>,
      "asChild" | "children"
    >,
    VariantProps<typeof avatarVariants> {
  src?: string
  fallback: string
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof Primitives.Root>,
  AvatarProps
>(
  (
    {
      src,
      fallback,
      variant = "rounded",
      size = "default",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Primitives.Root
        ref={ref}
        {...props}
        className={clx(avatarVariants({ variant, size }), className)}
      >
        {src && (
          <Primitives.Image
            src={src}
            className={innerVariants({ variant, size })}
          />
        )}
        <Primitives.Fallback
          className={clx(
            innerVariants({ variant, size }),
            "bg-ui-bg-component text-ui-fg-subtle pointer-events-none flex select-none items-center justify-center"
          )}
        >
          {fallback}
        </Primitives.Fallback>
      </Primitives.Root>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
