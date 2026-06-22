import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva("leading-relaxed text-pretty", {
  variants: {
    size: {
      1: "text-xs",
      2: "text-sm",
      3: "text-base",
      4: "text-lg",
      5: "text-xl",
      6: "text-2xl",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      gray: "text-muted-foreground/70",
      red: "text-destructive",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: 3,
    color: "default",
    weight: "normal",
  },
})

type TextProps = React.ComponentProps<"p"> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean
    as?: "p" | "span" | "label" | "div"
  }

function Text({ className, size, color, weight, as = "p", asChild = false, ...props }: TextProps) {
  const Comp = asChild ? Slot.Root : as

  return (
    <Comp
      data-slot="text"
      className={cn(textVariants({ size, color, weight, className }))}
      {...props}
    />
  )
}

export { Text, textVariants }
