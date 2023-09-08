import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { badgeColorVariants } from "@/components/badge"
import { clx } from "@/utils/clx"
import { Slot } from "@radix-ui/react-slot"

const iconBadgeVariants = cva(
  "inline-flex items-center justify-center overflow-hidden rounded-md",
  {
    variants: {
      size: {
        base: "h-6 w-6 p-0.5",
        large: "h-[28px] w-[28px] p-1",
      },
    },
  }
)

interface IconBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "color">,
    VariantProps<typeof badgeColorVariants>,
    VariantProps<typeof iconBadgeVariants> {
  asChild?: boolean
}

const IconBadge = React.forwardRef<HTMLSpanElement, IconBadgeProps>(
  (
    {
      children,
      className,
      color = "grey",
      size = "base",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "span"

    return (
      <Component
        ref={ref}
        className={clx(
          badgeColorVariants({ color }),
          iconBadgeVariants({ size }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
IconBadge.displayName = "IconBadge"

export { IconBadge }
