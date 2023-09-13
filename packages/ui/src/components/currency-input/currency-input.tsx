"use client"

import * as React from "react"
import Primitive from "react-currency-input-field"

import { Text } from "@/components/text"
import { clx } from "@/utils/clx"
import { VariantProps, cva } from "class-variance-authority"

const currencyInputVariants = cva(
  clx(
    "flex items-center gap-x-1",
    "bg-ui-bg-field hover:bg-ui-bg-field-hover border-ui-border-base shadow-buttons-neutral placeholder-ui-fg-muted text-ui-fg-base transition-fg relative w-full rounded-md border",
    "focus-within:border-ui-border-interactive focus-within:shadow-borders-active"
  ),
  {
    variants: {
      size: {
        base: "txt-compact-medium h-10 px-3",
        small: "txt-compact-small h-8 px-2",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
)

interface CurrencyInputProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof Primitive>,
      "prefix" | "suffix" | "size"
    >,
    VariantProps<typeof currencyInputVariants> {
  symbol: string
  code: string
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ size = "base", symbol, code, disabled, onInvalid, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => innerRef.current
    )

    const [valid, setValid] = React.useState(true)

    const onInnerInvalid = React.useCallback(
      (event: React.FormEvent<HTMLInputElement>) => {
        setValid(event.currentTarget.validity.valid)

        if (onInvalid) {
          onInvalid(event)
        }
      },
      [onInvalid]
    )

    return (
      <div
        onClick={() => {
          if (innerRef.current) {
            innerRef.current.focus()
          }
        }}
        className={clx("cursor-text", currencyInputVariants({ size }), {
          "text-ui-fg-disabled !bg-ui-bg-disabled !border-ui-border-base placeholder-ui-fg-disabled cursor-not-allowed !shadow-none":
            disabled,
          "border-ui-border-error focus-within:!shadow-borders-error invalid:focus:!shadow-borders-error":
            props["aria-invalid"] || !valid,
        })}
      >
        <span
          className={clx({
            "py-[9px]": size === "base",
            "py-[5px]": size === "small",
          })}
          role="presentation"
        >
          <Text className="text-ui-fg-muted pointer-events-none select-none uppercase">
            {code}
          </Text>
        </span>
        <Primitive
          className="h-full flex-1 appearance-none bg-transparent text-right outline-none"
          disabled={disabled}
          onInvalid={onInnerInvalid}
          ref={innerRef}
          {...props}
        />
        <span
          className={clx("min-w-[16px]", {
            "py-[9px]": size === "base",
            "py-[5px]": size === "small",
          })}
          role="presentation"
        >
          <Text className="text-ui-fg-muted pointer-events-none select-none">
            {symbol}
          </Text>
        </span>
      </div>
    )
  }
)
CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }
