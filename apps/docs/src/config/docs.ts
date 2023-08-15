import { NavItem, SidebarNavItem } from "../types/nav"

type DocsConfig = {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Docs",
      external: true,
      href: "https://docs.medusajs.com",
    },
    {
      title: "User Guide",
      external: true,
      href: "https://docs.medusajs.com/user-guide",
    },
    {
      title: "Store API",
      external: true,
      href: "https://docs.medusajs.com/api/store",
    },
    {
      title: "Admin API",
      external: true,
      href: "https://docs.medusajs.com/api/admin",
    },
    {
      title: "UI",
      href: "/",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/",
          items: [],
        },
        {
          title: "Installation",
          href: "/installation",
          items: [],
        },
        {
          title: "Colors",
          href: "/colors",
          disabled: true,
          label: "WIP",
          items: [],
        },
        {
          title: "Typography",
          href: "/typography",
          disabled: true,
          label: "WIP",
          items: [],
        },
      ],
    },
    {
      title: "Installation",
      items: [
        {
          title: "Medusa Admin Extension",
          href: "/installation/medusa-admin-extension",
          items: [],
        },
        {
          title: "Standalone Project",
          href: "/installation/standalone-project",
          items: [],
        },
      ],
    },
    {
      title: "Icons",
      items: [
        {
          title: "Overview",
          href: "/icons/overview",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Avatar",
          href: "/components/avatar",
          items: [],
        },
        {
          title: "Badge",
          href: "/components/badge",
          items: [],
        },
        {
          title: "Button",
          href: "/components/button",
          items: [],
        },
        {
          title: "Calendar",
          href: "/components/calendar",
          items: [],
        },
        {
          title: "Checkbox",
          href: "/components/checkbox",
          items: [],
        },
        {
          title: "Code Block",
          href: "/components/code-block",
          items: [],
        },
        {
          title: "Command",
          href: "/components/command",
          items: [],
        },
        {
          title: "Container",
          href: "/components/container",
          items: [],
        },
        {
          title: "Copy",
          href: "/components/copy",
          items: [],
        },
        {
          title: "Date Picker",
          href: "/components/date-picker",
          items: [],
        },
        {
          title: "Drawer",
          href: "/components/drawer",
          items: [],
        },
        {
          title: "Dropdown Menu",
          href: "/components/dropdown-menu",
          items: [],
        },
        {
          title: "Focus Modal",
          href: "/components/focus-modal",
          items: [],
        },
        {
          title: "Heading",
          href: "/components/heading",
          items: [],
        },
        {
          title: "Input",
          href: "/components/input",
          items: [],
        },
        {
          title: "Kbd",
          href: "/components/kbd",
          items: [],
        },
        {
          title: "Label",
          href: "/components/label",
          items: [],
        },
        {
          title: "Prompt",
          href: "/components/prompt",
          items: [],
        },
        {
          title: "Radio Group",
          href: "/components/radio-group",
          items: [],
        },
        {
          title: "Select",
          href: "/components/select",
          items: [],
        },
        {
          title: "Switch",
          href: "/components/switch",
          items: [],
        },
        {
          title: "Table",
          href: "/components/table",
          items: [],
        },
        {
          title: "Text",
          href: "/components/text",
          items: [],
        },
        {
          title: "Textarea",
          href: "/components/textarea",
          items: [],
        },
        {
          title: "Toast",
          href: "/components/toast",
          items: [],
        },
        {
          title: "Tooltip",
          href: "/components/tooltip",
          items: [],
        },
      ],
    },
    {
      title: "Hooks",
      items: [
        {
          title: "usePrompt",
          href: "/hooks/use-prompt",
          label: "WIP",
          disabled: true,
          items: [],
        },
        {
          title: "useToast",
          href: "/hooks/use-toast",
          label: "WIP",
          disabled: true,
          items: [],
        },
        {
          title: "useToggleState",
          href: "/hooks/use-toggle-state",
          label: "WIP",
          disabled: true,
          items: [],
        },
      ],
    },
    {
      title: "Utils",
      items: [
        {
          title: "clx",
          href: "/utils/clx",
          items: [],
        },
      ],
    },
  ],
}
