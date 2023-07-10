import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const headerVariants = cva("font-sans font-medium", {
  variants: {
    level: {
      h1: "text-[20px]/[32px]",
      h2: "text-[16px]/[24px]",
      h3: "text-[14px]/[20px]",
    },
  },
  defaultVariants: {
    level: "h1",
  },
})

interface HeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headerVariants> {}

const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>(
  ({ level, className, ...props }, ref) => {
    const Component = level ? level : "h1"

    return (
      <Component
        ref={ref}
        className={clx(headerVariants({ level }), className)}
        {...props}
      />
    )
  }
)
Header.displayName = "Header"

export { Header, headerVariants }
