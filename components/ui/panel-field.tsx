import * as React from "react"

import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"

type FieldProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  hint?: React.ReactNode
  /** Renders label and control side-by-side in a 2-column grid (panel layout). */
  inline?: boolean
  htmlFor?: string
}

function Field({
  className,
  label,
  hint,
  inline = false,
  htmlFor,
  children,
  ...props
}: FieldProps) {
  return (
    <div
      data-slot="panel-field"
      className={cn(
        inline
          ? "grid grid-cols-2 items-center gap-x-4 gap-y-1"
          : "flex flex-col gap-1.5",
        className
      )}
      {...props}
    >
      <div className={cn("flex flex-col gap-0.5", inline && "min-w-0")}>
        <Text as="label" size={2} weight="medium" htmlFor={htmlFor}>
          {label}
        </Text>
        {hint ? (
          <Text size={1} color="gray">
            {hint}
          </Text>
        ) : null}
      </div>
      <div className={cn("min-w-0", inline && "justify-self-end")}>{children}</div>
    </div>
  )
}

export { Field }
