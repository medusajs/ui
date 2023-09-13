import { XMarkMini } from "@medusajs/icons"
import { cva } from "class-variance-authority"
import * as React from "react"
import { clx } from "../../utils/clx"

interface ChipProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "role"> {
  onDelete?: () => void
}

const chipVariants = cva("", {
  variants: {
    size: {},
    color: {},
    rounded: {},
  },
})

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, children, onClick, onDelete, ...props }, ref) => {
    const role = (onClick || onDelete) && "button"

    return (
      <div ref={ref} role={role} className={clx(className)} {...props}>
        <span>{children}</span>
        {onDelete && <XMarkMini />}
      </div>
    )
  }
)
Chip.displayName = "Chip"

export { Chip }
