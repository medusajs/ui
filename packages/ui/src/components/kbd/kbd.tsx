import * as React from "react"

import { clx } from "@/utils/clx"
import { labelVariants } from "../label"

const Kbd = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"kbd">) => {
  return (
    <kbd
      {...props}
      className={clx(
        "bg-ui-tag-neutral-bg text-ui-tag-neutral-text border-ui-tag-neutral-border inline-flex h-5 w-5 items-center justify-center rounded-md border px-1",
        labelVariants({ variant: "xs", weight: "plus" }),
        className
      )}
    >
      {children}
    </kbd>
  )
}

export { Kbd }
