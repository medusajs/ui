"use client"

import { Moon, Sun } from "@medusajs/icons"
import { Button } from "@medusajs/ui"
import { useTheme } from "next-themes"
import * as React from "react"

const MainNav = () => {
  const { setTheme, theme } = useTheme()

  const isDarkMode = React.useMemo(() => theme === "dark", [theme])

  return (
    <div
      className={`flex w-full items-center justify-end ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <Button
        variant={"secondary"}
        format={"icon"}
        type="button"
        // disabled={true}
        onClick={() => {
          setTheme(isDarkMode ? "light" : "dark")
        }}
      >
        {isDarkMode ? <Sun /> : <Moon />}
      </Button>
    </div>
  )
}

export { MainNav }
