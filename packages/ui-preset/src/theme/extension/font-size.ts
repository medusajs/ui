import { ThemeConfig } from "tailwindcss/types/config"

export const fontSize: Partial<ThemeConfig> = {
  extend: {
    fontSize: {
      xs: ["0.75rem", "1.25rem"], // 12px / 20px
      sm: ["0.813rem", "1.25rem"], // 13px / 20px
      regular: ["0.875rem", "1.5rem"], // 14px / 24px
      lg: ["1rem", "1.75rem"], // 16px / 28px
      xl: ["1.125rem", "2rem"], // 18px / 32px
    },
  },
}
