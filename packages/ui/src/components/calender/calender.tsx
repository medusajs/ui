import { ChevronLeftMini, ChevronRightMini } from "@medusajs/icons"
import * as React from "react"
import { DayPicker, DayProps, useDayRender } from "react-day-picker"

import { buttonVariants } from "@/components/button"
import { clx } from "@/utils/clx"
import { labelVariants } from "../label"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clx("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-y-2 sm:gap-x-6 sm:gap-y-0",
        month: "space-y-2",
        caption: "flex justify-center relative items-center",
        caption_label: clx(
          labelVariants({ size: "small", weight: "plus" }),
          "absolute bottom-0 left-0 right-0 top-1 flex items-center justify-center"
        ),
        nav: "h-9 space-x-1 flex items-center bg-ui-bg-base-pressed rounded-md w-full h-full justify-between p-0.5",
        nav_button: clx(
          buttonVariants({ variant: "secondary", format: "icon" }),
          "h-8 w-8"
        ),
        nav_button_previous: "!absolute left-0.5",
        nav_button_next: "!absolute right-0.5",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full gap-x-2",
        head_cell: clx(
          labelVariants({ size: "small", weight: "plus" }),
          "text-ui-fg-muted m-0 box-border flex h-8 w-8 items-center justify-center p-0"
        ),
        row: "flex w-full mt-2 gap-x-2",
        cell: clx(
          labelVariants({
            size: "small",
            weight: "plus",
          }),
          "relative rounded-md p-0 text-center focus-within:relative focus-within:z-20"
        ),
        day: clx(
          labelVariants({
            size: "small",
            weight: "plus",
          }),
          "bg-ui-bg-base hover:bg-ui-bg-base-hover h-8 w-8 rounded-md p-0 text-center transition-colors"
        ),
        day_selected:
          "bg-ui-bg-interactive text-ui-fg-on-color hover:bg-ui-bg-interactive focus:bg-ui-bg-interactive",
        day_outside: "text-ui-fg-disabled aria-selected:text-ui-fg-on-color",
        day_disabled: "text-ui-fg-disabled",
        day_range_middle:
          "aria-selected:!bg-ui-bg-highlight aria-selected:!text-ui-fg-interactive",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftMini />,
        IconRight: ({ ...props }) => <ChevronRightMini />,
        Day: Day,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

const Day = ({ date, displayMonth }: DayProps) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { activeModifiers, buttonProps, divProps, isButton, isHidden } =
    useDayRender(date, displayMonth, ref)

  const { selected, today, disabled, range_middle } = activeModifiers

  if (isHidden) {
    return <></>
  }

  if (!isButton) {
    return <div {...divProps} />
  }

  const {
    children: buttonChildren,
    className: buttonClassName,
    ...buttonPropsRest
  } = buttonProps

  return (
    <button
      ref={ref}
      {...buttonPropsRest}
      className={clx("relative", buttonClassName)}
    >
      {buttonChildren}
      {today && (
        <span
          className={clx(
            "absolute right-[5px] top-[5px] h-1 w-1 rounded-full",
            {
              "bg-ui-fg-interactive": !selected,
              "bg-ui-fg-on-color": selected,
              "!bg-ui-fg-interactive": selected && range_middle,
              "bg-ui-fg-disabled": disabled,
            }
          )}
        />
      )}
    </button>
  )
}

export { Calendar }
