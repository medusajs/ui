import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

const headingVariants = cva("font-sans font-medium", {
  variants: {
    level: {
      h1: "text-xl leading-8",
      h2: "text-base leading-6",
      h3: "text-sm leading-5",
    },
  },
  defaultVariants: {
    level: "h1",
  },
})

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>

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
