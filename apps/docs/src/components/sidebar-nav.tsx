"use client"

import { Badge, clx } from "@medusajs/ui"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "@/types/nav"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={clx("pb-4")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-[13px] font-medium leading-5">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={clx(
              "bg-ui-bg-base text-ui-fg-muted group flex w-full items-center rounded-md border border-transparent px-3 py-1.5 transition-all",
              "hover:bg-ui-bg-base-hover text-ui-fg-subtle",
              item.disabled &&
                "bg-ui-bg-base-disabled text-ui-fg-disabled cursor-not-allowed",
              {
                "bg-ui-bg-base-pressed text-ui-fg-base border-ui-border-base":
                  pathname === item.href,
              }
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && (
              <Badge color={"purple"} className="ml-2">
                {item.label}
              </Badge>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={clx(
              "text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
            {item.label && (
              <Badge color="purple" className="ml-2">
                {item.label}
              </Badge>
            )}
          </span>
        )
      )}
    </div>
  ) : null
}
