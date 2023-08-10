"use client"

import { Moon, Sun } from "@medusajs/icons"
import { Button, clx } from "@medusajs/ui"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { docsConfig } from "../config/docs"
import { NavItem } from "../types/nav"
import { Logo } from "./logo"

const MainNav = () => {
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()

  const isDarkMode = React.useMemo(() => theme === "dark", [theme])

  return (
    <div className={`flex w-full items-center justify-between`}>
      <div className="text-ui-fg-base flex items-center gap-x-6">
        <Link href="https://docs.medusajs.com" rel="noreferrer">
          <Logo />
        </Link>
        <div>
          <DocsMainNavItems items={docsConfig.mainNav} pathname={pathname} />
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          variant="secondary"
          format="icon"
          type="button"
          onClick={() => {
            setTheme(isDarkMode ? "light" : "dark")
          }}
          className="text-ui-fg-muted hover:text-ui-fg-base"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </Button>
        <Button variant="secondary" type="button">
          Feedback
        </Button>
      </div>
    </div>
  )
}

type DocsMainNavItemsProps = {
  items: NavItem[]
  pathname: string | null
}

const DocsMainNavItems = ({ items, pathname }: DocsMainNavItemsProps) => {
  return items?.length ? (
    <div className="auto-col-max txt-compact-small-plus grid grid-flow-col gap-6">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={clx(
              "text-ui-fg-subtle transition-all",
              "hover:text-ui-fg-base",
              item.disabled &&
                "bg-ui-bg-base-disabled text-ui-fg-disabled cursor-not-allowed",
              {
                "text-ui-fg-base": item.href === "/",
              }
            )}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
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
          </span>
        )
      )}
    </div>
  ) : null
}

export { MainNav }
