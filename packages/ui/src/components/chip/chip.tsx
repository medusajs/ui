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
    size: {
      small: "px-1",
      base: "px-1.5 py-px",
      large: "px-2 py-[3px]",
    },
    color: {
      grey: "",
      blue: "",
      green: "",
      red: "",
      orange: "",
      purple: "",
    },
    rounded: {
      base: "rounded-md",
      full: "rounded-full",
    },
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
