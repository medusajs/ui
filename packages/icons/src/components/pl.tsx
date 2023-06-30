import * as React from "react"
import type { IconProps } from "../types"
const Pl = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
  (props, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        ref={ref}
        {...props}
      >
        <g fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
          <path fill="#fff" d="M16 14.5H4v-9h12v9Z" />
          <path fill="#DC143C" d="M16 14.5H4V10h12v4.5Z" />
        </g>
        <defs>
          <clipPath id="a">
            <rect width={12} height={9} x={4} y={5.5} fill="#fff" rx={1} />
          </clipPath>
        </defs>
      </svg>
    )
  }
)
Pl.displayName = "Pl"
export default Pl
