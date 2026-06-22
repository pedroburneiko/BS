import * as React from "react"

import { cn } from "@/lib/utils"
import { Text } from "@/components/primitives/text"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rótulo do campo. */
  label?: React.ReactNode
  /** Dica/descrição auxiliar exibida abaixo (ou ao lado) do rótulo. */
  hint?: React.ReactNode
  /** Mensagem de erro. Quando presente, o campo entra em estado de erro. */
  error?: React.ReactNode
  /** Marca o campo como obrigatório (adiciona *). */
  required?: boolean
  /**
   * Layout do campo.
   * - "vertical": rótulo em cima, controle embaixo (padrão).
   * - "horizontal": grid de 2 colunas (rótulo | controle), usado em painéis.
   */
  orientation?: "vertical" | "horizontal"
  /** id do controle, usado para ligar o <label>. */
  htmlFor?: string
  /** O controle do campo (input, select, stepper, etc). */
  children: React.ReactNode
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      className,
      label,
      hint,
      error,
      required,
      orientation = "vertical",
      htmlFor,
      children,
      ...props
    },
    ref,
  ) => {
    const isHorizontal = orientation === "horizontal"

    const labelBlock = (label || hint) && (
      <div className={cn("flex flex-col gap-0.5", isHorizontal && "justify-center")}>
        {label && (
          <Text as="label" size={3} weight="medium" htmlFor={htmlFor}>
            {label}
            {required && <span className="ml-0.5 text-destructive">*</span>}
          </Text>
        )}
        {hint && (
          <Text size={4} color="muted">
            {hint}
          </Text>
        )}
      </div>
    )

    return (
      <div
        ref={ref}
        data-orientation={orientation}
        data-error={error ? "" : undefined}
        className={cn(
          "group/field",
          isHorizontal
            ? "grid grid-cols-2 items-center gap-x-4 gap-y-1"
            : "flex flex-col gap-1.5",
          className,
        )}
        {...props}
      >
        {labelBlock}
        <div className={cn(isHorizontal && "flex justify-end")}>{children}</div>
        {error && (
          <Text
            size={4}
            color="red"
            className={cn(isHorizontal && "col-span-2 text-right")}
          >
            {error}
          </Text>
        )}
      </div>
    )
  },
)
Field.displayName = "Field"
