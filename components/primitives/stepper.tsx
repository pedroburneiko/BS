"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Valor controlado. */
  value?: number
  /** Valor inicial (modo não controlado). */
  defaultValue?: number
  /** Callback disparado quando o valor muda. */
  onValueChange?: (value: number) => void
  /** Valor mínimo permitido. */
  min?: number
  /** Valor máximo permitido. */
  max?: number
  /** Incremento por clique. */
  step?: number
  /** Desabilita os controles. */
  disabled?: boolean
  /** Rótulo acessível para o controle. */
  "aria-label"?: string
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = Number.POSITIVE_INFINITY,
      step = 1,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined
    const [internalValue, setInternalValue] = React.useState(() =>
      clamp(defaultValue, min, max),
    )
    const value = isControlled ? clamp(controlledValue, min, max) : internalValue

    const setValue = React.useCallback(
      (next: number) => {
        const clamped = clamp(next, min, max)
        if (!isControlled) setInternalValue(clamped)
        onValueChange?.(clamped)
      },
      [isControlled, min, max, onValueChange],
    )

    const decrement = () => setValue(value - step)
    const increment = () => setValue(value + step)

    const canDecrement = !disabled && value > min
    const canIncrement = !disabled && value < max

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border border-border bg-card p-1",
          disabled && "opacity-50",
          className,
        )}
        {...props}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={decrement}
          disabled={!canDecrement}
          aria-label="Diminuir"
        >
          <MinusIcon className="size-4" />
        </Button>
        <span
          role="spinbutton"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={Number.isFinite(max) ? max : undefined}
          aria-label={props["aria-label"]}
          className="min-w-8 text-center text-sm font-medium tabular-nums text-foreground"
        >
          {value}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={increment}
          disabled={!canIncrement}
          aria-label="Aumentar"
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>
    )
  },
)
Stepper.displayName = "Stepper"
