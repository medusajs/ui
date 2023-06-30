import * as React from "react"
import type { IconProps } from "../types"
const Bh = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
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
          <path fill="#E10011" d="M3.39 5.5h13.5v9H3.39v-9Z" />
          <path
            fill="#fff"
            d="m6.143 14.496-2.752.004v-9h2.737l1.768.57-1.753.553 1.753.572-1.753.553 1.753.572-1.753.553 1.753.572-1.753.553 1.753.572-1.753.553 1.753.572-1.753.553 1.753.572-1.753.553 1.753.572-1.753.553"
          />
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
Bh.displayName = "Bh"
export default Bh
