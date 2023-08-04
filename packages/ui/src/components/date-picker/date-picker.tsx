import { Calendar as CalendarIcon } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-popover"
import { format } from "date-fns"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/components/calender"
import { clx } from "../../utils/clx"
import { Button } from "../button"
import { labelVariants } from "../label"

const MAX_ALLOWED_YEAR = 9999
const MIN_ALLOWED_YEAR = 1800

type DatePickerProps = (
  | {
      mode?: "single"
      presets?: DatePreset[]
      defaultValue?: Date
      value?: Date
      onChange?: (date: Date | undefined) => void
    }
  | {
      mode: "range"
      presets?: DateRangePreset[]
      defaultValue?: DateRange
      value?: DateRange
      onChange?: (dateRange: DateRange | undefined) => void
    }
) & {
  timePicker?: boolean
  fromYear?: number
  toYear?: number
  fromMonth?: Date
  toMonth?: Date
  fromDay?: Date
  toDay?: Date
}

const DatePicker = ({
  mode = "single",
  fromYear = new Date().getFullYear() - 120,
  toYear = new Date().getFullYear() + 100,
  ...props
}: DatePickerProps) => {
  const { fromMonth, toMonth, fromDay, toDay, presets } = props

  if (fromYear && fromYear < MIN_ALLOWED_YEAR) {
    throw new Error(
      `fromYear must be greater than or equal to ${MIN_ALLOWED_YEAR}.`
    )
  }

  if (toYear && toYear > MAX_ALLOWED_YEAR) {
    throw new Error(`toYear must be less than or equal to ${MAX_ALLOWED_YEAR}.`)
  }

  if (fromYear && toYear && fromYear > toYear) {
    throw new Error("fromYear must be less than or equal to toYear.")
  }

  if (fromMonth && toMonth && fromMonth > toMonth) {
    throw new Error("fromMonth must be less than or equal to toMonth.")
  }

  if (fromDay && toDay && fromDay > toDay) {
    throw new Error("fromDay must be less than or equal to toDay.")
  }

  if (presets && presets.length > 0) {
    const fromYearToUse = fromYear ?? MIN_ALLOWED_YEAR
    const toYearToUse = toYear ?? MAX_ALLOWED_YEAR

    presets.forEach((preset) => {
      if ("date" in preset) {
        const presetYear = preset.date.getFullYear()

        if (presetYear < fromYearToUse) {
          throw new Error(
            `Preset date ${preset.date} is before fromYear ${fromYearToUse}.`
          )
        }

        if (presetYear > toYearToUse) {
          throw new Error(
            `Preset date ${preset.date} is after toYear ${toYearToUse}.`
          )
        }

        if (fromMonth) {
          const presetMonth = preset.date.getMonth()

          if (presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset date ${preset.date} is before fromMonth ${fromMonth}.`
            )
          }
        }

        if (toMonth) {
          const presetMonth = preset.date.getMonth()

          if (presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset date ${preset.date} is after toMonth ${toMonth}.`
            )
          }
        }

        if (fromDay) {
          const presetDay = preset.date.getDate()

          if (presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset date ${preset.date} is before fromDay ${fromDay}.`
            )
          }
        }

        if (toDay) {
          const presetDay = preset.date.getDate()

          if (presetDay > toDay.getDate()) {
            throw new Error(
              `Preset date ${preset.date} is after toDay ${toDay}.`
            )
          }
        }
      }

      if ("dateRange" in preset) {
        const fromYear = preset.dateRange.from?.getFullYear()
        const toYear = preset.dateRange.to?.getFullYear()

        if (fromYear && fromYear < fromYearToUse) {
          throw new Error(
            `Preset dateRange from date ${preset.dateRange.from} is before fromYear ${fromYearToUse}.`
          )
        }

        if (toYear && toYear > toYearToUse) {
          throw new Error(
            `Preset dateRange to date ${preset.dateRange.to} is after toYear ${toYearToUse}.`
          )
        }

        if (fromMonth) {
          const presetMonth = preset.dateRange.from?.getMonth()

          if (presetMonth && presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset dateRange from date ${preset.dateRange.from} is before fromMonth ${fromMonth}.`
            )
          }
        }

        if (toMonth) {
          const presetMonth = preset.dateRange.to?.getMonth()

          if (presetMonth && presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset dateRange to date ${preset.dateRange.to} is after toMonth ${toMonth}.`
            )
          }
        }

        if (fromDay) {
          const presetDay = preset.dateRange.from?.getDate()

          if (presetDay && presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset dateRange from date ${preset.dateRange.from} is before fromDay ${fromDay}.`
            )
          }
        }

        if (toDay) {
          const presetDay = preset.dateRange.to?.getDate()

          if (presetDay && presetDay > toDay.getDate()) {
            throw new Error(
              `Preset dateRange to date ${preset.dateRange.to} is after toDay ${toDay}.`
            )
          }
        }
      }
    })
  }

  if (mode === "single") {
    return (
      <SingleDatePicker
        fromYear={fromYear}
        toYear={toYear}
        {...(props as SingleProps)}
      />
    )
  }

  return <RangeDatePicker {...(props as RangeProps)} />
}

const Display = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    placeholder?: string
  }
>(({ className, children, placeholder, ...props }, ref) => {
  return (
    <Primitives.Trigger asChild>
      <button
        ref={ref}
        className={clx(
          "border-ui-border-base bg-ui-bg-subtle hover:bg-ui-bg-subtle-hover active:bg-ui-bg-subtle-pressed focus:border-ui-border-interactive focus:shadow-borders-active grid w-full grid-cols-[20px_1fr] items-center gap-x-2 rounded-md border px-3 py-[9px] outline-none transition-all",
          labelVariants({
            size: "small",
          })
        )}
        {...props}
      >
        <CalendarIcon className="text-ui-fg-muted h-5 w-5" />
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left">
          {children ? (
            children
          ) : placeholder ? (
            <span className="text-ui-fg-muted">{placeholder}</span>
          ) : null}
        </span>
      </button>
    </Primitives.Trigger>
  )
})
Display.displayName = "DatePicker.Display"

const Flyout = React.forwardRef<
  React.ElementRef<typeof Primitives.Content>,
  React.ComponentProps<typeof Primitives.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <Primitives.Content
      ref={ref}
      sideOffset={4}
      align="start"
      className={clx(
        "shadow-elevation-flyout rounded-lg",
        labelVariants({ size: "small" }),
        className
      )}
      {...props}
    >
      {children}
    </Primitives.Content>
  )
})
Flyout.displayName = "DatePicker.Flyout"

interface Preset {
  label: string
}

interface DatePreset extends Preset {
  date: Date
}

interface DateRangePreset extends Preset {
  dateRange: DateRange
}

type PresetContainerProps<TPreset extends Preset, TValue> = {
  presets: TPreset[] | TPreset[]
  onSelect: (value: TValue) => void
  currentValue?: TValue
}

const PresetContainer = <TPreset extends Preset, TValue>({
  presets,
  onSelect,
  currentValue,
}: PresetContainerProps<TPreset, TValue>) => {
  const isDateRangePresets = (preset: any): preset is DateRangePreset => {
    return "dateRange" in preset
  }

  const isDatePresets = (preset: any): preset is DatePreset => {
    return "date" in preset
  }

  const handleClick = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      onSelect(preset.dateRange as TValue)
    } else if (isDatePresets(preset)) {
      onSelect(preset.date as TValue)
    }
  }

  const compareDates = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const compareRanges = (range1: DateRange, range2: DateRange) => {
    // compare the from dates but ignore time
    const from1 = range1.from
    const from2 = range2.from

    let equalFrom = false

    if (from1 && from2) {
      const sameFrom = compareDates(from1, from2)

      if (sameFrom) {
        equalFrom = true
      }
    }

    // compare the to dates but ignore time

    const to1 = range1.to
    const to2 = range2.to

    let equalTo = false

    if (to1 && to2) {
      const sameTo = compareDates(to1, to2)

      if (sameTo) {
        equalTo = true
      }
    }

    return equalFrom && equalTo
  }

  const matchesCurrent = (preset: TPreset) => {
    if (isDateRangePresets(preset)) {
      return currentValue === preset.dateRange
    } else if (isDatePresets(preset)) {
      const value = currentValue as Date | undefined

      // Compare dates but ignore time
      return (
        value &&
        value.getDate() === preset.date.getDate() &&
        value.getMonth() === preset.date.getMonth() &&
        value.getFullYear() === preset.date.getFullYear()
      )
    }

    return false
  }

  return (
    <ul className="flex h-full w-full max-w-[160px] flex-1 flex-col items-start overflow-y-scroll border-r p-3">
      {presets.map((preset, index) => {
        return (
          <li key={index} className="w-full">
            <button
              className={clx(
                "text-ui-fg-subtle hover:bg-ui-bg-base-hover w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-md p-2 text-left outline-none transition-all",
                labelVariants({
                  size: "small",
                  weight: "plus",
                }),
                {
                  "!bg-ui-bg-base-pressed": matchesCurrent(preset),
                }
              )}
              onClick={() => handleClick(preset)}
              aria-label={`Select ${preset.label}`}
            >
              {preset.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

type SingleProps = {
  presets?: DatePreset[]
  defaultValue?: Date
  value?: Date
  onChange?: (date: Date | undefined) => void
  timePicker?: boolean
  fromYear?: number
  toYear?: number
  fromMonth?: Date
  toMonth?: Date
  fromDay?: Date
  toDay?: Date
  fromDate?: Date
  toDate?: Date
}

const SingleDatePicker = ({
  defaultValue,
  value,
  onChange,
  presets,
  timePicker,
  ...props
}: SingleProps) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    value ?? defaultValue ?? undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)

  React.useEffect(() => {
    if (date) {
      setMonth(date)
    }
  }, [date])

  React.useEffect(() => {
    if (!open) {
      setMonth(date)
    }
  }, [open])

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    onChange?.(date)
  }

  return (
    <Primitives.Root open={open} onOpenChange={setOpen}>
      <Display placeholder="Pick a date">
        {date && format(date, "MMM d, yyyy")}
      </Display>
      <Flyout>
        <div className="flex">
          <div className="flex items-start">
            {presets && presets.length > 0 && (
              <PresetContainer
                currentValue={date}
                presets={presets}
                onSelect={handleDateChange}
              />
            )}
            <div>
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={handleDateChange}
                {...props}
              />
              {timePicker && (
                <div className="border-ui-border-base border-t">time</div>
              )}
              <div className="flex items-center gap-x-2 border-t p-3">
                <Button variant="secondary" className="w-full">
                  Cancel
                </Button>
                <Button variant="primary" className="w-full">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Flyout>
    </Primitives.Root>
  )
}

type RangeProps = {
  presets?: DateRangePreset[]
  defaultValue?: DateRange
  value?: DateRange
  onChange?: (dateRange: DateRange | undefined) => void
  timePicker?: boolean
}

const RangeDatePicker = ({
  defaultValue,
  value,
  onChange,
  timePicker,
}: RangeProps) => {
  const [range, setRange] = React.useState<DateRange | undefined>(
    value ?? defaultValue ?? undefined
  )

  const handleRangeChange = (range: DateRange | undefined) => {
    setRange(range)
    onChange?.(range)
  }

  return (
    <Primitives.Root>
      <Display placeholder="Pick a date">
        {range &&
          `${range.from && format(range.from, "MMM d, yyyy")} - ${
            range.to && format(range.to, "MMM d, yyyy")
          }`}
      </Display>
      <Flyout>
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleRangeChange}
          numberOfMonths={2}
          classNames={{
            months:
              "flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-ui-border-base",
          }}
        />
        {timePicker && (
          <div className="border-ui-border-base border-t">time</div>
        )}
      </Flyout>
    </Primitives.Root>
  )
}

export { DatePicker }
