import { clx } from "@/utils/clx"
import React from "react"

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clx(
          "rounded-lg py-6 px-8 bg-base flex w-full h-fit flex-col overflow-hidden shadow-rest",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = "Container"

export { Container }
