import * as React from "react"
import { clx } from "../../utils/clx"

type CodeProps = React.ComponentPropsWithoutRef<"code">

const Code = React.forwardRef<HTMLDivElement, CodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={clx(
          "border-ui-tag-neutral-border bg-ui-tag-neutral-bg text-ui-tag-neutral-text rounded-md border px-1.5 font-mono text-[13px] leading-5",
          className
        )}
        {...props}
      />
    )
  }
)

export { Code }
