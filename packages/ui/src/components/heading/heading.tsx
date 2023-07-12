import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const headingVariants = cva("font-sans font-medium", {
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

type HeadingProps = VariantProps<typeof headingVariants> &
  React.HTMLAttributes<HTMLHeadingElement>

const Heading = ({ level, className, ...props }: HeadingProps) => {
  const Component = level ? level : "h1"

  return (
    <Component
      className={clx(headingVariants({ level }), className)}
      {...props}
    />
  )
}

export { Heading, headingVariants }
