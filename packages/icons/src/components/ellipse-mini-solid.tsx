import * as React from "react"
import type { IconProps } from "../types"
const EllipseMiniSolid = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        ref={ref}
        {...props}
      >
        <circle cx={10} cy={10} r={2} fill={color} />
      </svg>
    )
  }
)
EllipseMiniSolid.displayName = "EllipseMiniSolid"
export default EllipseMiniSolid
