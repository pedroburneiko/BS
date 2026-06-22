import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva("font-sans leading-relaxed", {
  variants: {
    // size 1 = maior, size 6 = menor
    size: {
      1: "text-lg",
      2: "text-base",
      3: "text-sm",
      4: "text-xs",
      5: "text-[0.6875rem]",
      6: "text-[0.625rem]",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      gray: "text-foreground/60",
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

type TextElement = "p" | "span" | "label" | "div"

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  /** Elemento renderizado. Por padrão usa <p>. */
  as?: TextElement
  /** Renderiza o filho como elemento (composição). */
  asChild?: boolean
  /** Quando as="label", liga o rótulo a um controle pelo id. */
  htmlFor?: string
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, color, weight, as = "p", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : (as as React.ElementType)
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ size, color, weight }), className)}
        {...props}
      />
    )
  },
)
Text.displayName = "Text"

export { textVariants }
