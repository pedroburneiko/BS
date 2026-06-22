import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva("text-balance font-semibold tracking-tight text-foreground", {
  variants: {
    size: {
      1: "text-4xl font-bold md:text-5xl",
      2: "text-3xl font-bold md:text-4xl",
      3: "text-2xl md:text-3xl",
      4: "text-xl md:text-2xl",
      5: "text-lg md:text-xl",
      6: "text-base md:text-lg",
      7: "text-sm",
      8: "text-xs uppercase tracking-wide",
    },
    weight: {
      bold: "font-bold",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: 3,
    weight: "semibold",
  },
})

type HeadingProps = React.ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }

function Heading({ className, size, weight, as = "h2", asChild = false, ...props }: HeadingProps) {
  const Comp = asChild ? Slot.Root : as

  return (
    <Comp
      data-slot="heading"
      className={cn(headingVariants({ size, weight, className }))}
      {...props}
    />
  )
}

export { Heading, headingVariants }
