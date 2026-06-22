"use client"

import * as React from "react"

import { Heading } from "@/components/primitives/heading"
import { Text } from "@/components/primitives/text"
import { Field } from "@/components/primitives/field"
import { Stepper } from "@/components/primitives/stepper"
import { Input } from "@/components/ui/input"

export function PrimitivesDemo() {
  const [carnes, setCarnes] = React.useState(2)

  return (
    <section className="mx-auto w-full max-w-2xl rounded-xl border border-border bg-card p-6 text-card-foreground">
      <div className="flex flex-col gap-1">
        <Heading as={2} size={4}>
          Primitivos
        </Heading>
        <Text color="muted">Heading, Text, Field e Stepper.</Text>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
        <Field
          orientation="horizontal"
          label="Nome do pedido"
          htmlFor="nome"
          hint="Aparece no comprovante"
        >
          <Input id="nome" placeholder="Ex: Mesa 4" className="w-48" />
        </Field>

        <Field orientation="horizontal" label="Quantidade de carnes" htmlFor="carnes">
          <Stepper
            value={carnes}
            onValueChange={setCarnes}
            min={1}
            max={10}
            aria-label="Quantidade de carnes"
          />
        </Field>

        <Field
          orientation="horizontal"
          label="E-mail"
          htmlFor="email"
          error="Informe um e-mail válido."
        >
          <Input id="email" placeholder="voce@exemplo.com" className="w-48" />
        </Field>
      </div>
    </section>
  )
}
