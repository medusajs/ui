import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const badgeVariants = cva("inline-flex items-center gap-x-0.5 border", {
  variants: {
    type: {
      default: "rounded-md",
      rounded: "rounded-full",
      icon: "rounded-md",
    },
    size: {
      sm: "txt-compact-xsmall-plus px-1.5",
      md: "txt-compact-small-plus px-2 py-0.5",
      lg: "txt-compact-medium-plus px-2.5 py-1",
    },
    color: {
      green:
        "bg-ui-tag-green-bg text-ui-tag-green-text [&_svg]:text-ui-tag-green-icon border-ui-tag-green-border",
      red: "bg-ui-tag-red-bg text-ui-tag-red-text [&_svg]:text-ui-tag-red-icon border-ui-tag-red-border",
      blue: "bg-ui-tag-blue-bg text-ui-tag-blue-text [&_svg]:text-ui-tag-blue-icon border-ui-tag-blue-border",
      orange:
        "bg-ui-tag-orange-bg text-ui-tag-orange-text [&_svg]:text-ui-tag-orange-icon border-ui-tag-orange-border",
      grey: "bg-ui-tag-neutral-bg text-ui-tag-neutral-text [&_svg]:text-ui-tag-neutral-icon border-ui-tag-neutral-border",
      purple:
        "bg-ui-tag-purple-bg text-ui-tag-purple-text [&_svg]:text-ui-tag-purple-icon border-ui-tag-purple-border",
    },
  },
  compoundVariants: [
    {
      type: "icon",
      size: "lg",
      className: "p-1",
    },
    {
      type: "icon",
      size: "md",
      className: "p-0.5",
    },
    {
      type: "icon",
      size: "sm",
      className: "p-0.5", // Icon does not get any smaller than `md`
    },
  ],
  defaultVariants: {
    size: "md",
    type: "default",
    color: "grey",
  },
})

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size, type, color, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "span"

    return (
      <Component
        ref={ref}
        className={clx(badgeVariants({ size, type, color }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
