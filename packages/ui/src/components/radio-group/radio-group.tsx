import * as Primitives from "@radix-ui/react-radio-group"
import React from "react"
// import LockIcon from "../../fundamentals/icons/lock-icon"
import { Tooltip } from "@/components/tooltip"
import { clx } from "@/utils/clx"

type RadioGroupRootProps = React.ComponentPropsWithoutRef<
  typeof Primitives.Root
> &
  React.RefAttributes<HTMLDivElement>

type RadioGroupItemProps = {
  disabledTooltip?: string
} & Primitives.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>

type DotProps = Primitives.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupRootProps>(
  ({ children, orientation, ...rest }, ref) => (
    <Primitives.Root
      ref={ref}
      className={clx({ "flex gap-4": orientation === "horizontal" })}
      {...rest}
    >
      {children}
    </Primitives.Root>
  )
)

RadioGroup.displayName = "RadioGroupRoot"

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, disabled, disabledTooltip, children, ...rest }, ref) => {
    return (
      <div
        className={clx(
          "p-1 flex relative cursor-pointer items-center",
          className
        )}
      >
        {!disabled ? (
          <Primitives.Item
            {...rest}
            disabled={disabled}
            className={clx(
              "outline-0",
              "shadow-[#D1D5DB] rounded-full h-[20px] w-[20px] shrink-0 shadow-[0_0_0_1px]"
            )}
            ref={ref}
          >
            <Primitives.Indicator
              className={clx(
                "indicator relative flex h-full w-full items-center justify-center",
                "after:bg-interactive after:rounded-full after:absolute after:inset-0 after:m-auto after:block after:h-[12px] after:w-[12px]"
              )}
            />
          </Primitives.Item>
        ) : (
          <Tooltip content={disabledTooltip}>
            Lock
            {/* <LockIcon size={20} className="text-grey-40" /> */}
          </Tooltip>
        )}
      </div>
    )
  }
)

RadioGroupItem.displayName = "RadioGroupItem"

const RadioGroupDot: React.FC<DotProps> = React.forwardRef<
  HTMLButtonElement,
  DotProps
>(({ className, ...rest }, ref) => {
  return (
    <label
      className={clx(
        {
          ["pointer-events-none select-none opacity-50"]: rest.disabled,
        },
        className
      )}
      htmlFor={rest.value}
    >
      <Primitives.Item
        {...rest}
        id={rest.value}
        className={clx(
          "outline-0",
          "rounded-full h-[20px] w-[20px] shrink-0 shadow-[0_0_0_1px] shadow-[#D1D5DB]"
        )}
        ref={ref}
      >
        <Primitives.Indicator
          className={clx(
            "indicator relative flex h-full w-full items-center justify-center",
            "after:bg-interactive after:rounded-full after:absolute after:inset-0 after:m-auto after:block after:h-[12px] after:w-[12px]"
          )}
        />
      </Primitives.Item>
    </label>
  )
})

RadioGroupDot.displayName = "RadioGroupDot"

export { RadioGroup, RadioGroupItem, RadioGroupDot }
