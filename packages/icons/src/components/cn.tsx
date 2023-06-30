import * as React from "react"
import type { IconProps } from "../types"
const Cn = React.forwardRef<SVGSVGElement, Omit<IconProps, "color">>(
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
        <g clipPath="url(#a)">
          <path fill="#DE2910" d="M4 5.5h12v9H4v-9Z" />
          <path
            fill="#FFDE00"
            d="m5.44 8.83.81-2.43.81 2.43L4.9 7.345h2.7L5.44 8.83ZM8.953 6.447l-.833.184.556-.648-.055.872-.462-.772.794.364ZM9.794 7.513l-.84-.153.764-.382-.388.783-.127-.891.591.643ZM9.672 9.009l-.705-.483.853-.037-.673.557.247-.866.278.829ZM8.612 9.986l-.463-.717.8.295-.836.253.563-.703-.064.872Z"
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
Cn.displayName = "Cn"
export default Cn
