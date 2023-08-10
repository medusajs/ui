import { SidebarNavItem } from "../types/nav"

type DocsConfig = {
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "Colors",
          href: "/docs/colors",
          items: [],
        },
        {
          title: "Typography",
          href: "/docs/typography",
          items: [],
        },
      ],
    },
    {
      title: "Installation",
      items: [
        {
          title: "Medusa Admin Extension",
          href: "/docs/installation/medusa-admin-extension",
          items: [],
        },
        {
          title: "Standalone Project",
          href: "/docs/installation/standalone-project",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Avatar",
          href: "/docs/components/avatar",
          items: [],
        },
        {
          title: "Badge",
          href: "/docs/components/badge",
          items: [],
        },
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
        },
        {
          title: "Calendar",
          href: "/docs/components/calendar",
          items: [],
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox",
          items: [],
        },
        {
          title: "CodeBlock",
          href: "/docs/components/code-block",
          items: [],
        },
        {
          title: "Command",
          href: "/docs/components/command",
          items: [],
        },
        {
          title: "Container",
          href: "/docs/components/container",
          items: [],
        },
        {
          title: "Copy",
          href: "/docs/components/copy",
          items: [],
        },
        {
          title: "DatePicker",
          href: "/docs/components/date-picker",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
        },
        {
          title: "DropdownMenu",
          href: "/docs/components/dropdown-menu",
          items: [],
        },
        {
          title: "FocusModal",
          href: "/docs/components/focus-modal",
          items: [],
        },
        {
          title: "Heading",
          href: "/docs/components/heading",
          items: [],
        },
        {
          title: "Input",
          href: "/docs/components/input",
          items: [],
        },
        {
          title: "Kbd",
          href: "/docs/components/kbd",
          items: [],
        },
        {
          title: "Label",
          href: "/docs/components/label",
          items: [],
        },
        {
          title: "Prompt",
          href: "/docs/components/prompt",
          items: [],
        },
        {
          title: "RadioGroup",
          href: "/docs/components/radio-group",
          items: [],
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
          items: [],
        },
        {
          title: "Text",
          href: "/docs/components/text",
          items: [],
        },
        {
          title: "Textarea",
          href: "/docs/components/textarea",
          items: [],
        },
        {
          title: "Toast",
          href: "/docs/components/toast",
          items: [],
        },
        {
          title: "Toaster",
          href: "/docs/components/toaster",
          items: [],
        },
        {
          title: "Tooltip",
          href: "/docs/components/tooltip",
          items: [],
        },
      ],
    },
    {
      title: "Hooks",
      items: [
        {
          title: "usePrompt",
          href: "/docs/components/use-prompt",
          items: [],
        },
        {
          title: "useToast",
          href: "/docs/components/use-toast",
          items: [],
        },
        {
          title: "useToggleState",
          href: "/docs/components/use-toggle-state",
          items: [],
        },
      ],
    },
    {
      title: "Utils",
      items: [
        {
          title: "clx",
          href: "/docs/components/clx",
          items: [],
        },
      ],
    },
  ],
}
