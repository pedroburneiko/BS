"use client"

import * as React from "react"

import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Field } from "@/components/ui/panel-field"
import { Stepper } from "@/components/ui/stepper"
import { Input } from "@/components/ui/input"
import { SingleSelect, MultiSelect, PillToolbar } from "@/components/dark-selects"

/* ------------------------------- Section shell ------------------------------ */

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-border pb-4">
        <Heading as="h2" size={4}>
          {title}
        </Heading>
        {description ? (
          <Text size={2} color="muted">
            {description}
          </Text>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function Subsection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <Text size={1} color="gray" weight="medium" className="uppercase tracking-wide">
        {label}
      </Text>
      {children}
    </div>
  )
}

/* --------------------------------- Tokens ---------------------------------- */

const colorTokens = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "destructive", className: "bg-destructive" },
  { name: "border", className: "bg-border" },
  { name: "ring", className: "bg-ring" },
]

/* ------------------------------- Form sample ------------------------------- */

function FormSample() {
  const carneOptions = [
    { label: "Hambúrguer", value: "hamburguer" },
    { label: "Linguiça", value: "linguica" },
    { label: "Frango", value: "frango" },
    { label: "Picanha", value: "picanha" },
  ]
  const pontoOptions = [
    { label: "Mal passada", value: "mal" },
    { label: "Ao ponto", value: "ponto" },
    { label: "Bem passada", value: "bem" },
  ]
  const acompanhamentos = [
    { label: "Alface", value: "alface", disabled: true },
    { label: "Tomate", value: "tomate" },
    { label: "Cebola branca", value: "cebola-branca", disabled: true },
    { label: "Cebola Roxa", value: "cebola-roxa" },
    { label: "Vinagrete", value: "vinagrete" },
  ]

  const [proteina, setProteina] = React.useState("hamburguer")
  const [ponto, setPonto] = React.useState("ponto")
  const [extras, setExtras] = React.useState(["tomate", "cebola-roxa", "vinagrete"])

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5">
      <Field inline label="Proteína" hint="Escolha o corte principal">
        <SingleSelect options={carneOptions} value={proteina} onValueChange={setProteina} />
      </Field>
      <Field inline label="Ponto da carne">
        <SingleSelect options={pontoOptions} value={ponto} onValueChange={setPonto} />
      </Field>
      <Field inline label="Acompanhamentos" hint="Itens em cinza estão indisponíveis">
        <MultiSelect options={acompanhamentos} values={extras} onValuesChange={setExtras} />
      </Field>
      <Field inline label="Quantidade de carnes" hint="Mínimo 1, máximo 6">
        <Stepper defaultValue={2} min={1} max={6} aria-label="Quantidade de carnes" />
      </Field>
      <Field inline label="Observações">
        <Input placeholder="Sem cebola, por favor" />
      </Field>
    </div>
  )
}

/* ------------------------------ Design System ------------------------------ */

export function DesignSystem() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16">
      <header className="flex flex-col gap-2">
        <Text size={1} color="gray" weight="medium" className="uppercase tracking-widest">
          BS · Design System
        </Text>
        <Heading as="h1" size={1}>
          Sistema de Design
        </Heading>
        <Text size={3} color="muted">
          Fundamentos, primitivos de formulário e padrões reutilizáveis do projeto.
        </Text>
      </header>

      <Section
        id="typography"
        title="Tipografia"
        description="Heading (títulos, tamanhos 1–8) e Text (parágrafos/labels, tamanhos 1–6)."
      >
        <Subsection label="Heading">
          <div className="flex flex-col gap-2">
            {([1, 2, 3, 4, 5, 6, 7, 8] as const).map((size) => (
              <div key={size} className="flex items-baseline gap-4">
                <Text size={1} color="gray" className="w-8 shrink-0 tabular-nums">
                  {size}
                </Text>
                <Heading size={size}>The quick brown fox</Heading>
              </div>
            ))}
          </div>
        </Subsection>

        <Subsection label="Text — tamanhos">
          <div className="flex flex-col gap-2">
            {([1, 2, 3, 4, 5, 6] as const).map((size) => (
              <div key={size} className="flex items-baseline gap-4">
                <Text size={1} color="gray" className="w-8 shrink-0 tabular-nums">
                  {size}
                </Text>
                <Text size={size}>The quick brown fox jumps over the lazy dog</Text>
              </div>
            ))}
          </div>
        </Subsection>

        <Subsection label="Text — cores">
          <div className="flex flex-col gap-1">
            <Text color="default">default — texto principal</Text>
            <Text color="muted">muted — texto secundário</Text>
            <Text color="gray">gray — dicas e legendas</Text>
            <Text color="red">red — erros e alertas</Text>
          </div>
        </Subsection>
      </Section>

      <Section
        id="colors"
        title="Cores"
        description="Tokens semânticos definidos em globals.css."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {colorTokens.map((token) => (
            <div key={token.name} className="flex flex-col gap-2">
              <div
                className={`h-16 w-full rounded-lg border border-border ${token.className}`}
              />
              <Text size={1} color="muted" className="font-mono">
                {token.name}
              </Text>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="forms"
        title="Formulários"
        description="Field (wrapper label + dica + controle), Stepper e os Selects escuros."
      >
        <Subsection label="Field + Stepper + Selects">
          <FormSample />
        </Subsection>

        <Subsection label="Pill toolbar">
          <PillToolbar />
        </Subsection>
      </Section>
    </div>
  )
}
