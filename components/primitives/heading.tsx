import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva("text-balance font-heading text-foreground", {
  variants: {
    // size 1 = maior (display), size 8 = menor — escala do Design System
    size: {
      1: "text-display",
      2: "text-h1",
      3: "text-h2",
      4: "text-h3",
      5: "text-h4",
      6: "text-h5",
      7: "text-h6",
      8: "text-sm tracking-tight",
    },
    weight: {
      bold: "font-bold",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: 3,
    weight: "bold",
  },
})

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  /** Nível semântico do heading (h1-h6). Por padrão usa h2. */
  as?: HeadingLevel
  /** Renderiza o filho como elemento (composição). */
  asChild?: boolean
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, weight, as = 2, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : (`h${as}` as const)
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ size, weight }), className)}
        {...props}
      />
    )
  },
)
Heading.displayName = "Heading"

export { headingVariants }
