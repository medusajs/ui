import * as React from "react"

export const Registry: Record<string, any> = {
  "button-demo": {
    name: "button-demo",
    component: React.lazy(() => import("@/examples/button-demo")),
    file: "src/examples/button-demo.tsx",
  },
}
