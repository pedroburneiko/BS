"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Heading } from "@/components/primitives/heading"
import { Text } from "@/components/primitives/text"

/**
 * EditBar — barra/painel de edição (estilo Bar_New).
 *
 * Composição reaproveitando o sistema atual:
 * - <EditBarSection>: cabeçalho de seção com barra de destaque roxa (#853FFF).
 * - <EditBarRow>: linha "rótulo | controle" usando o <Field horizontal>, com
 *   divisor inferior. O controle (SingleSelect, Stepper, etc.) é passado como children.
 * - <EditBarButton>: CTA com o gradiente roxo padrão do projeto.
 *
 * Pensado para ocupar a largura de 3 colunas do grid (use <GridItem span={3}>).
 */

const ACCENT = "#853FFF"

/* ---------------------------------- Root --------------------------------- */

export interface EditBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conteúdo fixo no rodapé (ex.: <EditBarButton>). */
  footer?: React.ReactNode
}

export const EditBar = React.forwardRef<HTMLDivElement, EditBarProps>(
  ({ className, children, footer, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0c0c0c]",
          className,
        )}
        {...props}
      >
        <div className="flex-1 overflow-y-auto px-5 py-6">{children}</div>
        {footer && (
          <div className="border-t border-[#1f1f1f] p-4">{footer}</div>
        )}
      </div>
    )
  },
)
EditBar.displayName = "EditBar"

/* -------------------------------- Section -------------------------------- */

export interface EditBarSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode
}

export const EditBarSection = React.forwardRef<
  HTMLDivElement,
  EditBarSectionProps
>(({ className, title, children, ...props }, ref) => {
  return (
    <section ref={ref} className={cn("flex flex-col", className)} {...props}>
      <div className="mb-2 flex items-center gap-3">
        <span
          aria-hidden
          className="h-5 w-1 rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
        <Heading size={5} as={3} className="font-normal">
          {title}
        </Heading>
      </div>
      <div className="flex flex-col">{children}</div>
    </section>
  )
})
EditBarSection.displayName = "EditBarSection"

/* ---------------------------------- Row ---------------------------------- */

export interface EditBarRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  /** Remove o divisor inferior (útil na última linha). */
  noDivider?: boolean
}

export const EditBarRow = React.forwardRef<HTMLDivElement, EditBarRowProps>(
  ({ className, label, noDivider = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-3 py-3",
          !noDivider && "border-b border-[#1f1f1f]",
          className,
        )}
        {...props}
      >
        <Text as="label" size={3} weight="medium" className="min-w-0 flex-1">
          {label}
        </Text>
        <div className="flex shrink-0 justify-end">{children}</div>
      </div>
    )
  },
)
EditBarRow.displayName = "EditBarRow"

/* --------------------------------- Button -------------------------------- */

export interface EditBarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Mostra o ícone "+" antes do texto (padrão: true). */
  withIcon?: boolean
}

export const EditBarButton = React.forwardRef<
  HTMLButtonElement,
  EditBarButtonProps
>(({ className, children, withIcon = true, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium text-white outline-none transition-opacity hover:opacity-90 focus-visible:opacity-90 disabled:opacity-50",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${ACCENT} 0%, #472F71 100%)`,
      }}
      {...props}
    >
      {withIcon && <PlusIcon className="size-4" strokeWidth={2.4} />}
      {children}
    </button>
  )
})
EditBarButton.displayName = "EditBarButton"
