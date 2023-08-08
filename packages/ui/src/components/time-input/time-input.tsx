import {
  AriaTimeFieldProps,
  TimeValue,
  useDateSegment,
  useTimeField,
} from "@react-aria/datepicker"
import {
  useTimeFieldState,
  type DateFieldState,
  type DateSegment,
} from "@react-stately/datepicker"
import * as React from "react"

import { labelVariants } from "@/components/label"
import { clx } from "@/utils/clx"

type TimeSegmentProps = {
  segment: DateSegment
  state: DateFieldState
}

const TimeSegment = ({ segment, state }: TimeSegmentProps) => {
  let ref = React.useRef<HTMLDivElement>(null)
  let { segmentProps } = useDateSegment(segment, state, ref)

  const isColon = segment.type === "literal" && segment.text === ":"
  const isSpace = segment.type === "literal" && segment.text === " "

  const isDecorator = isColon || isSpace

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
      }}
      className={clx(
        "w-full rounded-md border px-2 py-[5px] text-left uppercase tabular-nums",
        "border-ui-border-loud-muted bg-ui-bg-subtle shadow-buttons-secondary text-ui-fg-base outline-none transition-all",
        "focus:border-ui-border-interactive focus:shadow-borders-active",
        "hover:bg-ui-bg-subtle-hover",
        {
          "text-ui-fg-muted !w-fit border-none bg-transparent px-0 shadow-none":
            isDecorator,
          hidden: isSpace,
          "text-ui-fg-disabled bg-ui-bg-disabled border-ui-border-base shadow-none":
            state.isDisabled,
          "!text-ui-fg-muted !bg-transparent": !segment.isEditable,
        }
      )}
    >
      <span
        aria-hidden="true"
        className={clx(
          "text-ui-fg-muted pointer-events-none block w-full text-left",
          labelVariants({
            size: "small",
          }),
          {
            hidden: !segment.isPlaceholder,
            "h-0": !segment.isPlaceholder,
          }
        )}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  )
}

type TimeInputProps = Omit<
  AriaTimeFieldProps<TimeValue>,
  "label" | "shouldForceLeadingZeros" | "description" | "errorMessage"
>

const TimeInput = React.forwardRef<HTMLDivElement, TimeInputProps>(
  ({ hourCycle, ...props }: TimeInputProps, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => innerRef?.current
    )

    let locale = window !== undefined ? window.navigator.language : "en-US"

    const state = useTimeFieldState({
      hourCycle: hourCycle,
      locale: locale,
      shouldForceLeadingZeros: true,
      ...props,
    })

    const { fieldProps } = useTimeField(
      {
        ...props,
        hourCycle: hourCycle,
        shouldForceLeadingZeros: true,
      },
      state,
      innerRef
    )

    return (
      <div {...fieldProps} ref={ref} className="flex w-full gap-x-2">
        {state.segments.map((segment, i) => (
          <TimeSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    )
  }
)

export { TimeInput }
