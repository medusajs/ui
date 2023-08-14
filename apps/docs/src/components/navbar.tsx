"use client"

import { Moon, Sun } from "@medusajs/icons"
import { Button, clx } from "@medusajs/ui"
import { useTheme } from "next-themes"
import Link from "next/link"
import * as React from "react"

import { Logo } from "@/components/logo"
import { MobileNavbar } from "@/components/mobile-navbar"
import { docsConfig } from "@/config/docs"

const Navbar = () => {
  const { setTheme, theme } = useTheme()

  const isDarkMode = React.useMemo(() => theme === "dark", [theme])

  return (
    <div className="border-ui-border-base bg-ui-bg-base sticky top-0 z-50 w-full border-b">
      <div className="container flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-x-6">
          <Link href="https://docs.medusajs.com" rel="noreferrer">
            <Logo className="text-ui-fg-base" />
          </Link>
          <div className="hidden lg:block">
            <div className="auto-col-max txt-compact-small-plus grid grid-flow-col gap-6">
              {docsConfig.mainNav.map((item, index) =>
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
                      "text-ui-fg-subtle transition-all",
                      "hover:text-ui-fg-base",
                      item.disabled &&
                        "bg-ui-bg-base-disabled text-ui-fg-disabled cursor-not-allowed"
                    )}
                  >
                    {item.title}
                  </span>
                )
              )}
            </div>
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
          <div className="block lg:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Navbar }
