import * as React from "react"

import { clx } from "@/utils/clx"

const Table = React.forwardRef<
  HTMLTableElement,
  React.ComponentPropsWithoutRef<"table">
>(({ className, ...props }, ref) => {
  return <table ref={ref} className={clx("w-full", className)} {...props} />
})
Table.displayName = "Table"

export { Table }
