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
  "calendar-demo": {
    name: "calendar-demo",
    component: React.lazy(() => import("@/examples/calendar-demo")),
    file: "src/examples/calendar-demo.tsx",
  },
  "checkbox-demo": {
    name: "checkbox-demo",
    component: React.lazy(() => import("@/examples/checkbox-demo")),
    file: "src/examples/checkbox-demo.tsx",
  },
  "code-block-demo": {
    name: "code-block-demo",
    component: React.lazy(() => import("@/examples/code-block-demo")),
    file: "src/examples/code-block-demo.tsx",
  },
  "command-demo": {
    name: "command-demo",
    component: React.lazy(() => import("@/examples/command-demo")),
    file: "src/examples/command-demo.tsx",
  },
  "container-demo": {
    name: "container-demo",
    component: React.lazy(() => import("@/examples/container-demo")),
    file: "src/examples/container-demo.tsx",
  },
  "copy-demo": {
    name: "copy-demo",
    component: React.lazy(() => import("@/examples/copy-demo")),
    file: "src/examples/copy-demo.tsx",
  },
  "date-picker-demo": {
    name: "date-picker-demo",
    component: React.lazy(() => import("@/examples/date-picker-demo")),
    file: "src/examples/date-picker-demo.tsx",
  },
  "drawer-demo": {
    name: "drawer-demo",
    component: React.lazy(() => import("@/examples/drawer-demo")),
    file: "src/examples/drawer-demo.tsx",
  },
  "dropdown-menu-demo": {
    name: "dropdown-menu-demo",
    component: React.lazy(() => import("@/examples/dropdown-menu-demo")),
    file: "src/examples/dropdown-menu-demo.tsx",
  },
  "focus-modal-demo": {
    name: "focus-modal-demo",
    component: React.lazy(() => import("@/examples/focus-modal-demo")),
    file: "src/examples/focus-modal-demo.tsx",
  },
  "heading-demo": {
    name: "heading-demo",
    component: React.lazy(() => import("@/examples/heading-demo")),
    file: "src/examples/heading-demo.tsx",
  },
  "input-demo": {
    name: "input-demo",
    component: React.lazy(() => import("@/examples/input-demo")),
    file: "src/examples/input-demo.tsx",
  },
  "kbd-demo": {
    name: "kbd-demo",
    component: React.lazy(() => import("@/examples/kbd-demo")),
    file: "src/examples/kbd-demo.tsx",
  },
  "label-demo": {
    name: "label-demo",
    component: React.lazy(() => import("@/examples/label-demo")),
    file: "src/examples/label-demo.tsx",
  },
  "prompt-demo": {
    name: "prompt-demo",
    component: React.lazy(() => import("@/examples/prompt-demo")),
    file: "src/examples/prompt-demo.tsx",
  },
  "radio-group-demo": {
    name: "radio-group-demo",
    component: React.lazy(() => import("@/examples/radio-group-demo")),
    file: "src/examples/radio-group-demo.tsx",
  },
  "switch-demo": {
    name: "switch-demo",
    component: React.lazy(() => import("@/examples/switch-demo")),
    file: "src/examples/switch-demo.tsx",
  },
  "text-demo": {
    name: "text-demo",
    component: React.lazy(() => import("@/examples/text-demo")),
    file: "src/examples/text-demo.tsx",
  },
  "textarea-demo": {
    name: "textarea-demo",
    component: React.lazy(() => import("@/examples/textarea-demo")),
    file: "src/examples/textarea-demo.tsx",
  },
  "toaster-demo": {
    name: "toaster-demo",
    component: React.lazy(() => import("@/examples/toaster-demo")),
    file: "src/examples/toaster-demo.tsx",
  },
  "tooltip-demo": {
    name: "tooltip-demo",
    component: React.lazy(() => import("@/examples/tooltip-demo")),
    file: "src/examples/tooltip-demo.tsx",
  },
  "button-primary": {
    name: "button-primary",
    component: React.lazy(() => import("@/examples/button-primary")),
    file: "src/examples/button-primary.tsx",
  },
  "button-secondary": {
    name: "button-secondary",
    component: React.lazy(() => import("@/examples/button-secondary")),
    file: "src/examples/button-secondary.tsx",
  },
  "button-transparent": {
    name: "button-transparent",
    component: React.lazy(() => import("@/examples/button-transparent")),
    file: "src/examples/button-transparent.tsx",
  },
  "button-danger": {
    name: "button-danger",
    component: React.lazy(() => import("@/examples/button-danger")),
    file: "src/examples/button-danger.tsx",
  },
  "button-disabled": {
    name: "button-disabled",
    component: React.lazy(() => import("@/examples/button-disabled")),
    file: "src/examples/button-disabled.tsx",
  },
  "button-with-icon": {
    name: "button-with-icon",
    component: React.lazy(() => import("@/examples/button-with-icon")),
    file: "src/examples/button-with-icon.tsx",
  },
  "button-icon-only": {
    name: "button-icon-only",
    component: React.lazy(() => import("@/examples/button-icon-only")),
    file: "src/examples/button-icon-only.tsx",
  },
  "button-loading": {
    name: "button-loading",
    component: React.lazy(() => import("@/examples/button-loading")),
    file: "src/examples/button-loading.tsx",
  },
}
