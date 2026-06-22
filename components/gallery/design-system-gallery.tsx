"use client"

import * as React from "react"
import { SquareIcon } from "lucide-react"

import { Heading } from "@/components/primitives/heading"
import { Text } from "@/components/primitives/text"
import { Field } from "@/components/primitives/field"
import { Stepper } from "@/components/primitives/stepper"
import { Input } from "@/components/ui/input"
import { SingleSelect, MultiSelect, PillSelect } from "@/components/dark-selects"
import { ImageEditor } from "@/components/image-editor"
import { Demo } from "@/components/demo"
import { GallerySection, GalleryItem } from "@/components/gallery/section"

// Input com o mesmo stroke/corner/altura dos selects e do Stepper do DS
const pillInput =
  "h-11 w-56 rounded-full border-[#2a2a2a] bg-[#161616] px-5 text-sm text-white transition-colors placeholder:text-[#8a8a8a] hover:border-[#3a3a3a] focus-visible:border-[#3a3a3a] focus-visible:ring-0"

export function DesignSystemGallery() {
  const [carnes, setCarnes] = React.useState(2)
  const [protein, setProtein] = React.useState("hamburguer")
  const [toppings, setToppings] = React.useState<string[]>(["tomate", "cebola-roxa", "vinagrete"])
  const [ratio, setRatio] = React.useState("1:1")
  const [size, setSize] = React.useState("1K")

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 py-10">
      {/* Cabeçalho da galeria */}
      <header className="dark flex flex-col gap-2 px-2 text-white">
        <Text size={4} color="muted" weight="medium" className="uppercase tracking-wide">
          Design System
        </Text>
        <Heading size={2}>Biblioteca de componentes</Heading>
        <Text size={1} color="muted" className="max-w-2xl">
          Componentes organizados por função. Cada bloco indica o nome e o caminho de import para
          usar ao montar novas telas.
        </Text>
      </header>

      {/* 1. Tipografia & texto */}
      <GallerySection
        title="Tipografia & Texto"
        description="Hierarquia de títulos e estilos de corpo em Inter."
        imports={[
          { name: "Heading", from: "@/components/primitives/heading" },
          { name: "Text", from: "@/components/primitives/text" },
        ]}
      >
        <GalleryItem name="<Heading>" note="size 1–8 (1 = display)">
          <div className="flex flex-col gap-2">
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
          </div>
        </GalleryItem>

        <GalleryItem name="<Text>" note="size 1–6, color muted/gray/red">
          <div className="flex flex-col gap-1">
            <Text size={1}>Body large — parágrafo confortável de leitura.</Text>
            <Text>Body — texto padrão da interface.</Text>
            <Text size={3} color="muted">
              Caption — informações secundárias e dicas.
            </Text>
            <Text size={3} color="red">
              Erro — mensagem de validação.
            </Text>
          </div>
        </GalleryItem>
      </GallerySection>

      {/* 2. Campos de formulário */}
      <GallerySection
        title="Campos de formulário"
        description="Wrapper de campo (label | controle) com dica e erro, mais controles de entrada."
        imports={[
          { name: "Field", from: "@/components/primitives/field" },
          { name: "Stepper", from: "@/components/primitives/stepper" },
          { name: "Input", from: "@/components/ui/input" },
        ]}
      >
        <div className="flex max-w-md flex-col gap-4">
          <Field orientation="horizontal" label="Nome do pedido" htmlFor="nome" hint="Aparece no comprovante">
            <Input id="nome" placeholder="Ex: Mesa 4" className={pillInput} />
          </Field>

          <Field orientation="horizontal" label="Quantidade de carnes" htmlFor="carnes">
            <Stepper value={carnes} onValueChange={setCarnes} min={1} max={10} aria-label="Quantidade de carnes" />
          </Field>

          <Field orientation="horizontal" label="E-mail" htmlFor="email" error="Informe um e-mail válido.">
            <Input id="email" placeholder="voce@exemplo.com" className={pillInput} />
          </Field>
        </div>
      </GallerySection>

      {/* 3. Selects */}
      <GallerySection
        title="Selects"
        description="Seletores em pill com stroke escuro para fundos #0c0c0c."
        imports={[
          { name: "SingleSelect", from: "@/components/dark-selects" },
          { name: "MultiSelect", from: "@/components/dark-selects" },
          { name: "PillSelect", from: "@/components/dark-selects" },
        ]}
      >
        <div className="flex flex-wrap items-start gap-10">
          <GalleryItem name="<SingleSelect>">
            <SingleSelect
              options={[
                { label: "Hambúrguer", value: "hamburguer" },
                { label: "Linguiça", value: "linguica" },
                { label: "Frango", value: "frango" },
                { label: "Picanha", value: "picanha" },
              ]}
              value={protein}
              onValueChange={setProtein}
            />
          </GalleryItem>

          <GalleryItem name="<MultiSelect>">
            <MultiSelect
              options={[
                { label: "Alface", value: "alface", disabled: true },
                { label: "Tomate", value: "tomate" },
                { label: "Cebola branca", value: "cebola-branca", disabled: true },
                { label: "Cebola Roxa", value: "cebola-roxa" },
                { label: "Vinagrete", value: "vinagrete" },
              ]}
              values={toppings}
              onValuesChange={setToppings}
            />
          </GalleryItem>

          <GalleryItem name="<PillSelect>" note="compacto, p/ toolbars">
            <div className="flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#161616] px-3 py-2">
              <PillSelect
                icon={<SquareIcon className="size-4 text-white" />}
                options={[
                  { label: "1:1", value: "1:1" },
                  { label: "4:3", value: "4:3" },
                  { label: "16:9", value: "16:9" },
                  { label: "9:16", value: "9:16" },
                ]}
                value={ratio}
                onValueChange={setRatio}
              />
              <div className="h-5 w-px bg-[#2a2a2a]" />
              <PillSelect
                options={[
                  { label: "1K", value: "1K" },
                  { label: "2K", value: "2K" },
                  { label: "4K", value: "4K" },
                ]}
                value={size}
                onValueChange={setSize}
              />
            </div>
          </GalleryItem>
        </div>
      </GallerySection>

      {/* 4. Editor */}
      <GallerySection
        title="Editor de imagem"
        description="Card completo de edição com rail de ferramentas, slider e prompt."
        imports={[{ name: "ImageEditor", from: "@/components/image-editor" }]}
      >
        <div className="flex justify-center">
          <ImageEditor />
        </div>
      </GallerySection>

      {/* 5. Kit shadcn/ui */}
      <GallerySection
        title="Kit shadcn/ui"
        description="Componentes base (botões, cards, inputs, diálogos) com os tokens do tema."
        imports={[{ name: "Demo", from: "@/components/demo" }]}
      >
        <Demo />
      </GallerySection>
    </div>
  )
}
