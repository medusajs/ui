import { Clock } from "@medusajs/icons"
import * as React from "react"

type AmPm = "am" | "pm"

type NumberInputProps = React.ComponentPropsWithoutRef<"input">

function isValidNumber(num: unknown): num is number {
  return num !== null && num !== false && !Number.isNaN(Number(num))
}

function safeMin(...args: unknown[]) {
  return Math.min(...args.filter(isValidNumber))
}

function safeMax(...args: unknown[]) {
  return Math.max(...args.filter(isValidNumber))
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    return <input ref={ref} className="appearance-none" {...props} />
  }
)

type HourInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof NumberInput>,
  "min" | "max" | "name" | "nameForClass"
> & {
  amPm: AmPm
  maxTime?: string
  minTime?: string
  value?: string | null
}

const HourInput = React.forwardRef<HTMLInputElement, HourInputProps>(
  ({ amPm, maxTime, minTime, value, ...props }, ref) => {
    const maxHour = safeMin(
      12,
      maxTime &&
        (() => {
          const [maxHourResult, maxAmPm] = convert24to12(getHours(maxTime))

          if (maxAmPm !== amPm) {
            // pm is always after am, so we should ignore validation
            return null
          }

          return maxHourResult
        })()
    )

    const minHour = safeMax(
      1,
      minTime &&
        (() => {
          const [minHourResult, minAmPm] = convert24to12(getHours(minTime))

          if (
            // pm is always after am, so we should ignore validation
            minAmPm !== amPm ||
            // If minHour is 12 am/pm, user should be able to enter 12, 1, ..., 11.
            minHourResult === 12
          ) {
            return null
          }

          return minHourResult
        })()
    )

    const value12 = value ? convert24to12(value)[0].toString() : ""

    return (
      <NumberInput
        ref={ref}
        min={minHour}
        max={maxHour}
        name="hour12"
        value={value12}
        {...props}
      />
    )
  }
)

// type MinuteInputProps = {
//   hour?: string | null
//   maxTime?: string
//   minTime?: string
//   showLeadingZeros?: boolean
// } & Omit<React.ComponentProps<typeof Input>, "max" | "min" | "name">

// export default function MinuteInput({
//   hour,
//   maxTime,
//   minTime,
//   showLeadingZeros = true,
//   ...otherProps
// }: MinuteInputProps) {
//   function isSameHour(date: string | Date) {
//     return hour === getHours(date).toString()
//   }

//   const maxMinute = safeMin(
//     59,
//     maxTime && isSameHour(maxTime) && getMinutes(maxTime)
//   )
//   const minMinute = safeMax(
//     0,
//     minTime && isSameHour(minTime) && getMinutes(minTime)
//   )

//   return (
//     <Input
//       max={maxMinute}
//       min={minMinute}
//       name="minute"
//       showLeadingZeros={showLeadingZeros}
//       {...otherProps}
//     />
//   )
// }

const TimeInput = React.forwardRef<HTMLInputElement, any>((props, ref) => {
  const [time, setTime] = React.useState<Date | undefined>(new Date())
  const [amPm, setAmPm] = React.useState<AmPm>("am")

  const setHour = (stringHour: string) => {
    const hour = parseInt(stringHour, 10)

    if (!isNaN(hour)) {
      const hour24 = convert12to24(hour, amPm)

      setTime((time) => {
        if (!time) {
          return undefined
        }

        const newTime = new Date(time)

        newTime.setHours(hour24)

        return newTime
      })
    }
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <HourInput
          amPm={amPm}
          value={time?.getHours().toString()}
          onChange={(e) => setHour(e.target.value)}
        />
        <span>:</span>
        <input type="text" />
        <input type="text" />
      </div>
      <button>
        <Clock />
      </button>
      <input type="hidden" ref={ref} {...props} />
    </div>
  )
})
TimeInput.displayName = "TimeInput"

function getHours(date: Date | string): number {
  if (date instanceof Date) {
    return date.getHours()
  }

  if (typeof date === "string") {
    const datePieces = date.split(":")

    if (datePieces.length >= 2) {
      const hoursString = datePieces[0]

      if (hoursString) {
        const hours = parseInt(hoursString, 10)

        if (!isNaN(hours)) {
          return hours
        }
      }
    }
  }

  throw new Error(`Failed to get hours from date: ${date}.`)
}

function getMinutes(date: Date | string): number {
  if (date instanceof Date) {
    return date.getMinutes()
  }

  if (typeof date === "string") {
    const datePieces = date.split(":")

    if (datePieces.length >= 2) {
      const minutesString = datePieces[1] || "0"
      const minutes = parseInt(minutesString, 10)

      if (!isNaN(minutes)) {
        return minutes
      }
    }
  }

  throw new Error(`Failed to get minutes from date: ${date}.`)
}

function convert24to12(hour24: string | number): [number, AmPm] {
  const hour12 = Number(hour24) % 12 || 12

  return [hour12, Number(hour24) < 12 ? "am" : "pm"]
}

function convert12to24(hour12: string | number, amPm: AmPm): number {
  let hour24 = Number(hour12)

  if (amPm === "am" && hour24 === 12) {
    hour24 = 0
  } else if (amPm === "pm" && hour24 < 12) {
    hour24 += 12
  }

  return hour24
}

export { TimeInput }
