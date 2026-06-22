import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Grid do projeto — "Grid_new"
 * Spec: 14 colunas · 1 linha · tipo Stretch · margem 20px · gutter 20px.
 *
 * - Container: aplica a margem lateral de 20px (--grid-margin).
 * - Grid: layout de 14 colunas com gutter de 20px (--grid-gutter), colunas
 *   esticadas (stretch) para preencher a largura disponível.
 * - GridItem: ocupa N colunas (1–14), com início opcional.
 * - GridOverlay: sobreposição de depuração no padrão #00BFFF a 20%.
 */

export const GRID_COLUMNS = 14
export const GRID_GUTTER = "20px"
export const GRID_MARGIN = "20px"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

/** Aplica a margem lateral de 20px do grid. */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "div"
    return (
      <Comp
        ref={ref}
        className={cn("w-full", className)}
        style={{
          paddingInline: "var(--grid-margin)",
          ...props.style,
        }}
        {...props}
      />
    )
  },
)
Container.displayName = "Container"

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  /** Número de colunas. Padrão 14 (Grid_new). */
  columns?: number
}

/** Grid de 14 colunas esticadas com gutter de 20px. */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, asChild = false, columns = GRID_COLUMNS, style, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "div"
    return (
      <Comp
        ref={ref}
        className={cn("grid", className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: "var(--grid-gutter)",
          ...style,
        }}
        {...props}
      />
    )
  },
)
Grid.displayName = "Grid"

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  /** Quantas colunas o item ocupa (1–14). Padrão 1. */
  span?: number
  /** Linha de coluna inicial (1-based). Opcional. */
  start?: number
}

/** Item do grid: ocupa `span` colunas, com `start` opcional. */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, asChild = false, span = 1, start, style, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "div"
    return (
      <Comp
        ref={ref}
        className={cn(className)}
        style={{
          gridColumn: start ? `${start} / span ${span}` : `span ${span} / span ${span}`,
          ...style,
        }}
        {...props}
      />
    )
  },
)
GridItem.displayName = "GridItem"

export interface GridOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number
}

/**
 * Sobreposição de depuração do grid (igual ao layout guide #00BFFF 20%).
 * Renderize dentro de um container `relative` para visualizar as colunas.
 */
export const GridOverlay = React.forwardRef<HTMLDivElement, GridOverlayProps>(
  ({ className, columns = GRID_COLUMNS, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", className)}
        style={{
          paddingInline: "var(--grid-margin)",
          ...style,
        }}
        {...props}
      >
        <div
          className="grid h-full"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: "var(--grid-gutter)",
          }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={i}
              className="h-full"
              style={{ background: "rgb(var(--grid-overlay) / 0.2)" }}
            />
          ))}
        </div>
      </div>
    )
  },
)
GridOverlay.displayName = "GridOverlay"
