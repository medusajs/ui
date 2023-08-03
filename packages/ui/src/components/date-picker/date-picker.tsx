import { CalendarMini } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-popover"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/button"
import { Calendar } from "@/components/calender"
import { clx } from "@/utils/clx"

type DatePickerMode = "single" | "range"

type DatePreset = {
  label: string
  date: Date
}

type DateRangePreset = {
  label: string
  dateRange: DateRange
}

type DatePickerProps =
  | {
      mode: "single"
      presets?: DatePreset[]
      defaultValue?: Date
      value?: Date
      onChange?: (date: Date) => void
    }
  | {
      mode: "range"
      presets?: DateRangePreset[]
      defaultValue?: DateRange
      value?: DateRange
      onChange?: (dateRange: DateRange) => void
    }

type RangeProps = {
  presets?: DateRangePreset[]
  defaultValue?: DateRange
  value?: DateRange
  onChange?: (dateRange: DateRange) => void
}

type SingleProps = {
  presets?: DatePreset[]
  defaultValue?: Date
  value?: Date
  onChange?: (date: Date) => void
}

const SingleDatePicker = ({ defaultValue, value, onChange }: SingleProps) => {
  return <Calendar mode="single" />
}

const RangeDatePicker = ({ defaultValue, value, onChange }: RangeProps) => {
  return <Calendar mode="range" />
}

const DatePicker = ({
  mode,
  presets,
  defaultValue,
  value,
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    mode !== "single"
      ? undefined
      : (value as Date) ?? (defaultValue as Date) ?? undefined
  )
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  return (
    <Primitives.Root>
      <Primitives.Trigger>
        <Button variant="secondary">
          <CalendarMini />
          Pick a date
        </Button>
      </Primitives.Trigger>
      <Primitives.Content className="shadow-elevation-flyout rounded-lg">
        <Calendar mode={mode} selected={mode === "single" ? date : range} />
        <div
          className={clx(
            "border-ui-border-base flex w-full items-center gap-x-2 border-t p-3",
            {
              "justify-between": m === "single",
              "justify-end": m === "range",
            }
          )}
        >
          <Button
            variant={"secondary"}
            className={clx({
              "w-full": m === "single",
            })}
          >
            Cancel
          </Button>
          <Button
            className={clx({
              "w-full": m === "single",
            })}
          >
            Apply
          </Button>
        </div>
      </Primitives.Content>
    </Primitives.Root>
  )
}

export { DatePicker }
