"use client"

import * as React from "react"

import { Heading } from "@/components/primitives/heading"
import { Text } from "@/components/primitives/text"
import { Field } from "@/components/primitives/field"
import { Stepper } from "@/components/primitives/stepper"
import { Input } from "@/components/ui/input"

// Input com o mesmo stroke/corner/altura dos selects e do Stepper do DS
const pillInput =
  "h-11 w-48 rounded-full border-[#2a2a2a] bg-[#161616] px-5 text-sm text-white transition-colors placeholder:text-[#8a8a8a] hover:border-[#3a3a3a] focus-visible:border-[#3a3a3a] focus-visible:ring-0"

export function PrimitivesDemo() {
  const [carnes, setCarnes] = React.useState(2)

  return (
    <section className="dark mx-auto w-full max-w-2xl rounded-2xl border border-[#2a2a2a] bg-[#0c0c0c] p-8 text-white">
      <div className="flex flex-col gap-1">
        <Heading as={2} size={4}>
          Primitivos
        </Heading>
        <Text color="muted">Heading, Text, Field e Stepper.</Text>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-[#2a2a2a] pt-6">
        <Text size={4} color="muted" weight="medium" className="uppercase tracking-wide">
          Escala tipográfica
        </Text>
        <Heading size={1}>Display</Heading>
        <Heading size={2} as={1}>
          Heading 1
        </Heading>
        <Heading size={3}>Heading 2</Heading>
        <Heading size={4} as={3}>
          Heading 3
        </Heading>
        <Heading size={5} as={4}>
          Heading 4
        </Heading>
        <Heading size={6} as={5}>
          Heading 5
        </Heading>
        <Heading size={7} as={6}>
          Heading 6
        </Heading>
        <Text size={1}>Body large — parágrafo em Inter com leitura confortável.</Text>
        <Text>Body — texto padrão usado na maior parte da interface.</Text>
        <Text size={3} color="muted">
          Caption — informações secundárias e dicas.
        </Text>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-[#2a2a2a] pt-6">
        <Field
          orientation="horizontal"
          label="Nome do pedido"
          htmlFor="nome"
          hint="Aparece no comprovante"
        >
          <Input id="nome" placeholder="Ex: Mesa 4" className={pillInput} />
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
          <Input id="email" placeholder="voce@exemplo.com" className={pillInput} />
        </Field>
      </div>
    </section>
  )
}
