import { Time } from "@internationalized/date"
import { Calendar as CalendarIcon, Minus } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-popover"
import { TimeValue } from "@react-aria/datepicker"
import { format } from "date-fns"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/button"
import { Calendar } from "@/components/calendar"
import { TimeInput } from "@/components/time-input"
import { clx } from "@/utils/clx"
import { isBrowserLocaleClockType24h } from "@/utils/is-browser-locale-hour-cycle-24h"

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
          "txt-compact-small grid w-full grid-cols-[20px_1fr] items-center gap-x-2 rounded-md border px-3 py-[9px]",
          "border-ui-border-loud-muted bg-ui-bg-subtle shadow-buttons-secondary outline-none transition-all",
          "disabled:bg-ui-bg-disabled disabled:text-ui-fg-disabled disabled:border-ui-border-base disabled:shadow-none",
          "focus:border-ui-border-interactive focus:shadow-borders-active",
          "hover:bg-ui-bg-subtle-hover",
          "active:bg-ui-bg-subtle-pressed"
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
        "txt-compact-small shadow-elevation-flyout bg-ui-bg-base z-[100] rounded-lg",
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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
    const from1 = range1.from
    const from2 = range2.from

    let equalFrom = false

    if (from1 && from2) {
      const sameFrom = compareDates(from1, from2)

      if (sameFrom) {
        equalFrom = true
      }
    }

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
      const value = currentValue as DateRange | undefined

      return value && compareRanges(value, preset.dateRange)
    } else if (isDatePresets(preset)) {
      const value = currentValue as Date | undefined

      return value && compareDates(value, preset.date)
    }

    return false
  }

  return (
    <ul className="flex flex-col items-start">
      {presets.map((preset, index) => {
        return (
          <li key={index} className="w-full">
            <button
              className={clx(
                "txt-compact-small-plus w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-md p-2 text-left",
                "text-ui-fg-subtle hover:bg-ui-bg-base-hover outline-none transition-all",
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

const formatDate = (date: Date, includeTime?: boolean) => {
  const usesAmPm = !isBrowserLocaleClockType24h()

  if (includeTime) {
    if (usesAmPm) {
      return format(date, "MMM d, yyyy h:mm a")
    }

    return format(date, "MMM d, yyyy HH:mm")
  }

  return format(date, "MMM d, yyyy")
}

type CalendarProps = {
  fromYear?: number
  toYear?: number
  fromMonth?: Date
  toMonth?: Date
  fromDay?: Date
  toDay?: Date
  fromDate?: Date
  toDate?: Date
}

interface PickerProps extends CalendarProps {
  className?: string
  disabled?: boolean
  showTimePicker?: boolean
}

interface SingleProps extends PickerProps {
  presets?: DatePreset[]
  defaultValue?: Date
  value?: Date
  onChange?: (date: Date | undefined) => void
}

const SingleDatePicker = ({
  defaultValue,
  value,
  onChange,
  presets,
  showTimePicker,
  disabled,
  className,
  ...props
}: SingleProps) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    value ?? defaultValue ?? undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)

  const time: TimeValue = React.useMemo(() => {
    const hour = date?.getHours() ?? 0
    const minute = date?.getMinutes() ?? 0

    return new Time(hour, minute, 0)
  }, [date])

  const initialDate = React.useMemo(() => {
    return date
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  React.useEffect(() => {
    if (date) {
      setMonth(date)
    }
  }, [date])

  React.useEffect(() => {
    if (!open) {
      setMonth(date)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleCancel = () => {
    setDate(initialDate)
    setOpen(false)
  }

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    onChange?.(date)
  }

  const handleTimeChange = (time: TimeValue) => {
    if (date) {
      const newDate = new Date(date.getTime())

      newDate.setHours(time.hour)
      newDate.setMinutes(time.minute)
      newDate.setSeconds(time.second)

      setDate(newDate)
      onChange?.(newDate)
    }
  }

  const formattedDate = React.useMemo(() => {
    if (!date) {
      return null
    }

    return formatDate(date, showTimePicker)
  }, [date, showTimePicker])

  return (
    <Primitives.Root open={open} onOpenChange={setOpen}>
      <Display
        placeholder="Pick a date"
        disabled={disabled}
        className={className}
      >
        {formattedDate}
      </Display>
      <Flyout>
        <div className="flex">
          <div className="flex items-start">
            {presets && presets.length > 0 && (
              <div className="relative h-full w-[160px] border-r">
                <div className="absolute inset-0 overflow-y-scroll p-3">
                  <PresetContainer
                    currentValue={date}
                    presets={presets}
                    onSelect={handleDateChange}
                  />
                </div>
              </div>
            )}
            <div>
              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={handleDateChange}
                disabled={disabled}
                {...props}
              />
              {showTimePicker && (
                <div className="border-ui-border-base border-t p-3">
                  <TimeInput
                    aria-label="Time"
                    onChange={handleTimeChange}
                    isDisabled={disabled}
                    value={time}
                  />
                </div>
              )}
              <div className="border-ui-border-base flex items-center gap-x-2 border-t p-3">
                <Button
                  variant="secondary"
                  className="w-full"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="w-full"
                  type="button"
                  onClick={() => setOpen(false)}
                >
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

interface RangeProps extends PickerProps {
  presets?: DateRangePreset[]
  defaultValue?: DateRange
  value?: DateRange
  onChange?: (dateRange: DateRange | undefined) => void
}

const RangeDatePicker = ({
  defaultValue,
  value,
  onChange,
  showTimePicker,
  presets,
  disabled,
  className,
  ...props
}: RangeProps) => {
  const [open, setOpen] = React.useState(false)
  const [range, setRange] = React.useState<DateRange | undefined>(
    value ?? defaultValue ?? undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(range?.from)

  const time = React.useMemo(() => {
    const startHour = range?.from?.getHours() ?? 0
    const startMinute = range?.from?.getMinutes() ?? 0

    const endHour = range?.to?.getHours() ?? 0
    const endMinute = range?.to?.getMinutes() ?? 0

    return {
      start: new Time(startHour, startMinute, 0),
      end: new Time(endHour, endMinute, 0),
    }
  }, [range])

  const initialRange = React.useMemo(() => {
    return range
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  React.useEffect(() => {
    if (range) {
      setMonth(range.from)
    }
  }, [range])

  React.useEffect(() => {
    if (!open) {
      setMonth(range?.from)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleRangeChange = (range: DateRange | undefined) => {
    setRange(range)
    onChange?.(range)
  }

  const handleCancel = () => {
    setRange(initialRange)
    setOpen(false)
  }

  const handleTimeChange = (time: TimeValue, pos: "start" | "end") => {
    if (!range) {
      return
    }

    if (pos === "start") {
      if (!range.from) {
        return
      }

      const newDate = new Date(range.from.getTime())

      newDate.setHours(time.hour)
      newDate.setMinutes(time.minute)

      setRange({
        ...range,
        from: newDate,
      })
    }

    if (pos === "end") {
      if (!range.to) {
        return
      }

      const newDate = new Date(range.to.getTime())

      newDate.setHours(time.hour)
      newDate.setMinutes(time.minute)

      setRange({
        ...range,
        to: newDate,
      })
    }
  }

  const displayRange = React.useMemo(() => {
    if (!range) {
      return null
    }

    return `${range.from ? formatDate(range.from, showTimePicker) : ""} - ${
      range.to ? formatDate(range.to, showTimePicker) : ""
    }`
  }, [range, showTimePicker])

  return (
    <Primitives.Root open={open} onOpenChange={setOpen}>
      <Display
        placeholder="Pick a date"
        disabled={disabled}
        className={className}
      >
        {displayRange}
      </Display>
      <Flyout>
        <div className="flex">
          <div className="flex items-start">
            {presets && presets.length > 0 && (
              <div className="relative h-full w-[160px] border-r">
                <div className="absolute inset-0 overflow-y-scroll p-3">
                  <PresetContainer
                    currentValue={range}
                    presets={presets}
                    onSelect={handleRangeChange}
                  />
                </div>
              </div>
            )}
            <div>
              <Calendar
                mode="range"
                selected={range}
                onSelect={handleRangeChange}
                month={month}
                onMonthChange={setMonth}
                numberOfMonths={2}
                disabled={disabled}
                classNames={{
                  months:
                    "flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-ui-border-base",
                }}
                {...props}
              />
              {showTimePicker && (
                <div className="border-ui-border-base flex items-center justify-evenly gap-x-3 border-t p-3">
                  <div className="flex flex-1 items-center gap-x-2">
                    <span className="text-ui-fg-subtle">Start:</span>
                    <TimeInput
                      value={time.start}
                      onChange={(v) => handleTimeChange(v, "start")}
                      aria-label="Start date time"
                      isDisabled={!range?.from}
                    />
                  </div>
                  <Minus className="text-ui-fg-muted" />
                  <div className="flex flex-1 items-center gap-x-2">
                    <span className="text-ui-fg-subtle">End:</span>
                    <TimeInput
                      value={time.end}
                      onChange={(v) => handleTimeChange(v, "end")}
                      aria-label="End date time"
                      isDisabled={!range?.to}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between border-t p-3">
                <p className={clx("text-ui-fg-subtle txt-compact-small-plus")}>
                  <span className="text-ui-fg-muted">Range:</span>{" "}
                  {displayRange}
                </p>
                <div className="flex items-center gap-x-2">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Flyout>
    </Primitives.Root>
  )
}

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
) &
  PickerProps

const validatePresets = (
  presets: DateRangePreset[] | DatePreset[],
  rules: PickerProps
) => {
  const { toYear, fromYear, fromMonth, toMonth, fromDay, toDay } = rules

  if (presets && presets.length > 0) {
    const fromYearToUse = fromYear
    const toYearToUse = toYear

    presets.forEach((preset) => {
      if ("date" in preset) {
        const presetYear = preset.date.getFullYear()

        if (fromYear && presetYear < fromYear) {
          throw new Error(
            `Preset ${preset.label} is before fromYear ${fromYearToUse}.`
          )
        }

        if (toYear && presetYear > toYear) {
          throw new Error(
            `Preset ${preset.label} is after toYear ${toYearToUse}.`
          )
        }

        if (fromMonth) {
          const presetMonth = preset.date.getMonth()

          if (presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label} is before fromMonth ${fromMonth}.`
            )
          }
        }

        if (toMonth) {
          const presetMonth = preset.date.getMonth()

          if (presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label} is after toMonth ${toMonth}.`
            )
          }
        }

        if (fromDay) {
          const presetDay = preset.date.getDate()

          if (presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset ${preset.label} is before fromDay ${fromDay}.`
            )
          }
        }

        if (toDay) {
          const presetDay = preset.date.getDate()

          if (presetDay > toDay.getDate()) {
            throw new Error(
              `Preset ${preset.label} is after toDay ${format(
                toDay,
                "MMM dd, yyyy"
              )}.`
            )
          }
        }
      }

      if ("dateRange" in preset) {
        const presetFromYear = preset.dateRange.from?.getFullYear()
        const presetToYear = preset.dateRange.to?.getFullYear()

        if (presetFromYear && fromYear && presetFromYear < fromYear) {
          throw new Error(
            `Preset ${preset.label}'s 'from' is before fromYear ${fromYearToUse}.`
          )
        }

        if (presetToYear && toYear && presetToYear > toYear) {
          throw new Error(
            `Preset ${preset.label}'s 'to' is after toYear ${toYearToUse}.`
          )
        }

        if (fromMonth) {
          const presetMonth = preset.dateRange.from?.getMonth()

          if (presetMonth && presetMonth < fromMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label}'s 'from' is before fromMonth ${format(
                fromMonth,
                "MMM, yyyy"
              )}.`
            )
          }
        }

        if (toMonth) {
          const presetMonth = preset.dateRange.to?.getMonth()

          if (presetMonth && presetMonth > toMonth.getMonth()) {
            throw new Error(
              `Preset ${preset.label}'s 'to' is after toMonth ${format(
                toMonth,
                "MMM, yyyy"
              )}.`
            )
          }
        }

        if (fromDay) {
          const presetDay = preset.dateRange.from?.getDate()

          if (presetDay && presetDay < fromDay.getDate()) {
            throw new Error(
              `Preset ${
                preset.dateRange.from
              }'s 'from' is before fromDay ${format(fromDay, "MMM dd, yyyy")}.`
            )
          }
        }

        if (toDay) {
          const presetDay = preset.dateRange.to?.getDate()

          if (presetDay && presetDay > toDay.getDate()) {
            throw new Error(
              `Preset ${preset.label}'s 'to' is after toDay ${format(
                toDay,
                "MMM dd, yyyy"
              )}.`
            )
          }
        }
      }
    })
  }
}

const DatePicker = ({ mode = "single", ...props }: DatePickerProps) => {
  if (props.presets) {
    validatePresets(props.presets, props)
  }

  if (mode === "single") {
    return <SingleDatePicker {...(props as SingleProps)} />
  }

  return <RangeDatePicker {...(props as RangeProps)} />
}

export { DatePicker }
