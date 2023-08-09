import * as React from "react"

export const Registry: Record<string, any> = {
  "avatar-demo": {
    name: "avatar-demo",
    component: React.lazy(() => import("@/examples/avatar-demo")),
    file: "src/examples/avatar-demo.tsx",
  },
  "badge-demo": {
    name: "badge-demo",
    component: React.lazy(() => import("@/examples/badge-demo")),
    file: "src/examples/badge-demo.tsx",
  },
  "button-demo": {
    name: "button-demo",
    component: React.lazy(() => import("@/examples/button-demo")),
    file: "src/examples/button-demo.tsx",
  },
  "checkbox-demo": {
    name: "checkbox-demo",
    component: React.lazy(() => import("@/examples/checkbox-demo")),
    file: "src/examples/checkbox-demo.tsx",
  },
  "container-demo": {
    name: "container-demo",
    component: React.lazy(() => import("@/examples/container-demo")),
    file: "src/examples/container-demo.tsx",
  },
  "date-picker-demo": {
    name: "date-picker-demo",
    component: React.lazy(() => import("@/examples/date-picker-demo")),
    file: "src/examples/date-picker-demo.tsx",
  },
}
