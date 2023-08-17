import * as React from "react"
import type { IconProps } from "../types"
const ArrowPathMini = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        ref={ref}
        {...props}
      >
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.682 6.232h3.328L11.89 4.11a5.5 5.5 0 0 0-9.203 2.467m-.697 6.519V9.768m0 0h3.328m-3.328 0 2.12 2.122a5.5 5.5 0 0 0 9.202-2.467m.698-6.519v3.327"
        />
      </svg>
    )
  }
)
ArrowPathMini.displayName = "ArrowPathMini"
export default ArrowPathMini
