import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva("text-balance font-heading tracking-tight text-foreground", {
  variants: {
    // size 1 = maior, size 8 = menor
    size: {
      1: "text-5xl md:text-6xl",
      2: "text-4xl md:text-5xl",
      3: "text-3xl md:text-4xl",
      4: "text-2xl md:text-3xl",
      5: "text-xl md:text-2xl",
      6: "text-lg md:text-xl",
      7: "text-base md:text-lg",
      8: "text-sm md:text-base",
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
