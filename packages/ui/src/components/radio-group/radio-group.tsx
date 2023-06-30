import * as Primitives from "@radix-ui/react-radio-group"
import React from "react"
// import LockIcon from "../../fundamentals/icons/lock-icon"
import { Tooltip } from "@/components/tooltip"
import { clx } from "@/utils/clx"
import { Label } from "@/components/label"
import { Text } from "@/components/text"

type RadioGroupRootProps = React.ComponentPropsWithoutRef<
  typeof Primitives.Root
> &
  React.RefAttributes<HTMLDivElement>

type RadioGroupItemProps = {
  label: string
  sublabel?: string
  description?: string
  disabledTooltip?: string
} & Primitives.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>

type RadioGroupSimpleItemProps = {
  label?: string
  description?: string
} & Primitives.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>

type DotProps = Primitives.RadioGroupItemProps &
  React.RefAttributes<HTMLButtonElement>

const Root = React.forwardRef<HTMLDivElement, RadioGroupRootProps>(
  ({ children, orientation, ...rest }, ref) => (
    <Primitives.Root
      ref={ref}
      className={clx({ "flex gap-2": orientation === "horizontal" })}
      {...rest}
    >
      {children}
    </Primitives.Root>
  )
)

Root.displayName = "RadioGroupRoot"

const Item = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  (
    {
      label,
      sublabel,
      description,
      className,
      disabled,
      disabledTooltip,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <label
        className={clx(
          "rounded-lg border-gray-200 p-4 mb-2 gap-4 relative flex cursor-pointer items-center border",
          { "bg-gray-100 text-gray-400": disabled },
          className
        )}
        htmlFor={rest.value}
      >
        {!disabled ? (
          <Primitives.Item
            {...rest}
            id={rest.value}
            disabled={disabled}
            className={clx(
              "outline-0",
              "shadow-gray-300 rounded-full h-[20px] w-[20px] shrink-0 shadow-[0_0_0_1px]"
            )}
            ref={ref}
          >
            <Primitives.Indicator
              className={clx(
                "indicator relative flex h-full w-full items-center justify-center",
                "after:bg-interactive after:rounded-full after:absolute after:inset-0 after:m-auto after:block after:h-[12px] after:w-[12px]"
              )}
            />
            {/* Outline indicator: purely stylistical */}
            <Primitives.Indicator
              //  we want to hide this indicator from screen readers because the previous one is enough
              aria-hidden="true"
              className={clx(
                "shadow-interactive rounded-lg absolute inset-0 shadow-[0_0_0_2px]"
              )}
            />
          </Primitives.Item>
        ) : (
          <Tooltip content={disabledTooltip}>
            Lock
            {/* <LockIcon size={20} className="text-grey-40" /> */}
          </Tooltip>
        )}
        <div className="truncate">
          <div className="flex items-center ">
            <Label className="truncate">{label}</Label>
            {sublabel && (
              <Label className="text-gray-500 ml-1">{sublabel}</Label>
            )}
          </div>
          {description && (
            <Text
              className={clx("text-gray-500 mt-1 truncate", {
                "text-grey-400": disabled,
              })}
            >
              {description}
            </Text>
          )}
          {children}
        </div>
      </label>
    )
  }
)

Item.displayName = "RadioGroupItem"

const SimpleItem = React.forwardRef<
  HTMLButtonElement,
  RadioGroupSimpleItemProps
>(({ label, description, className, ...rest }, ref) => {
  return (
    <label
      className={clx(
        "mr-6 flex items-center last:mr-0 mb-1 last:mb-0",
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
      <div className="ml-3 w-full cursor-pointer">
        {label && <Label>{label}</Label>}
        {description && (
          <Label className="text-gray-500 ml-1">{description}</Label>
        )}
      </div>
    </label>
  )
})

SimpleItem.displayName = "RadioGroupSimpleItem"

const Dot: React.FC<DotProps> = React.forwardRef<HTMLButtonElement, DotProps>(
  ({ className, ...rest }, ref) => {
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
  }
)

Dot.displayName = "RadioGroupDot"

const RadioGroup = { Root, Item, SimpleItem, Dot }

export { RadioGroup }
