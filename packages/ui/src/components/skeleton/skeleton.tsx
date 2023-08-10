import * as React from "react"

import { clx } from "@/utils/clx"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clx(
        "bg-ui-bg-subtle-pressed animate-pulse rounded-md",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
