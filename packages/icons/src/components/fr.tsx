import * as React from "react"
import type { IconProps } from "../types"
const Fr = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
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
          <path fill="#fff" d="M4 5.5h12v9H4v-9Z" />
          <path fill="#00267F" d="M4 5.5h4v9H4v-9Z" />
          <path fill="#F31830" d="M12 5.5h4v9h-4v-9Z" />
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
Fr.displayName = "Fr"
export default Fr
