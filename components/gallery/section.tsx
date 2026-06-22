import type * as React from "react"

import { Heading } from "@/components/primitives/heading"
import { Text } from "@/components/primitives/text"

/**
 * Cluster da galeria do Design System.
 * Mostra título, descrição e a lista de componentes (nome + caminho de import)
 * para deixar claro o que o Claude Code deve importar ao construir telas.
 */
export function GallerySection({
  title,
  description,
  imports,
  children,
}: {
  title: string
  description?: string
  imports: { name: string; from: string }[]
  children: React.ReactNode
}) {
  return (
    <section className="dark flex flex-col gap-6 rounded-2xl border border-[#2a2a2a] bg-[#0c0c0c] p-8 text-white">
      <div className="flex flex-col gap-3 border-b border-[#2a2a2a] pb-5">
        <div className="flex flex-col gap-1">
          <Heading as={2} size={4}>
            {title}
          </Heading>
          {description ? <Text color="muted">{description}</Text> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {imports.map((imp) => (
            <code
              key={imp.name}
              className="rounded-full border border-[#2a2a2a] bg-[#161616] px-3 py-1 font-mono text-xs text-[#cfcfcf]"
            >
              <span className="text-white">{imp.name}</span>
              <span className="text-[#6a6a6a]">{` — ${imp.from}`}</span>
            </code>
          ))}
        </div>
      </div>
      {children}
    </section>
  )
}

/** Rótulo de um item dentro de um cluster: nome do componente + descrição curta. */
export function GalleryItem({
  name,
  note,
  children,
}: {
  name: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <Text as="span" size={3} weight="medium" className="font-mono text-white">
          {name}
        </Text>
        {note ? (
          <Text as="span" size={3} color="muted">
            {note}
          </Text>
        ) : null}
      </div>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  )
}
