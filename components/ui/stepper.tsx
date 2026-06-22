"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type StepperProps = {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  className?: string
  "aria-label"?: string
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function Stepper({
  value,
  defaultValue = 0,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  onValueChange,
  className,
  ...props
}: StepperProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(clamp(defaultValue, min, max))
  const current = isControlled ? clamp(value, min, max) : internal

  const setValue = (next: number) => {
    const clamped = clamp(next, min, max)
    if (!isControlled) setInternal(clamped)
    onValueChange?.(clamped)
  }

  return (
    <div
      data-slot="stepper"
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl border border-border bg-background p-1",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setValue(current - step)}
        disabled={current <= min}
        aria-label="Decrease"
      >
        <MinusIcon />
      </Button>
      <span
        className="min-w-8 text-center text-sm font-medium tabular-nums text-foreground"
        aria-live="polite"
        {...props}
      >
        {current}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setValue(current + step)}
        disabled={current >= max}
        aria-label="Increase"
      >
        <PlusIcon />
      </Button>
    </div>
  )
}

export { Stepper }
