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
      title: "Icons",
      items: [
        {
          title: "Overview",
          href: "/docs/icons/overview",
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
          title: "Code Block",
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
          title: "Date Picker",
          href: "/docs/components/date-picker",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
        },
        {
          title: "Dropdown Menu",
          href: "/docs/components/dropdown-menu",
          items: [],
        },
        {
          title: "Focus Modal",
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
          title: "Radio Group",
          href: "/docs/components/radio-group",
          items: [],
        },
        {
          title: "Select",
          href: "/docs/components/select",
          items: [],
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
          items: [],
        },
        {
          title: "Table",
          href: "/docs/components/table",
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
          href: "/docs/hooks/use-prompt",
          label: "WIP",
          disabled: true,
          items: [],
        },
        {
          title: "useToast",
          href: "/docs/hooks/use-toast",
          label: "WIP",
          disabled: true,
          items: [],
        },
        {
          title: "useToggleState",
          href: "/docs/hooks/use-toggle-state",
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
          href: "/docs/utils/clx",
          items: [],
        },
      ],
    },
  ],
}
