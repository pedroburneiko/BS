"use client"

import * as React from "react"
import {
  SquareIcon,
  CopyIcon,
  CircleAlertIcon,
  TrashIcon,
  ShareIcon,
  ShoppingBagIcon,
  MoreHorizontalIcon,
  Loader2Icon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  SettingsIcon,
  ChevronUpIcon,
  SparklesIcon,
} from "lucide-react"

import { Heading } from "@/components/primitives/heading"
import { Text } from "@/components/primitives/text"
import { Field } from "@/components/primitives/field"
import { Stepper } from "@/components/primitives/stepper"
import { Container, Grid, GridItem, GridOverlay } from "@/components/primitives/grid"
import {
  EditBar,
  EditBarSection,
  EditBarRow,
  EditBarButton,
} from "@/components/primitives/edit-bar"
import { Input } from "@/components/ui/input"
import { SingleSelect, MultiSelect, PillSelect } from "@/components/dark-selects"
import { ImageEditor } from "@/components/image-editor"
import { GallerySection, GalleryItem } from "@/components/gallery/section"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Input com o mesmo stroke/corner/altura dos selects e do Stepper do DS
const pillInput =
  "h-11 w-56 rounded-full border-[#2a2a2a] bg-[#161616] px-5 text-sm text-white transition-colors placeholder:text-[#8a8a8a] hover:border-[#3a3a3a] focus-visible:border-[#3a3a3a] focus-visible:ring-0"

const COLOR_TOKENS = [
  "--background",
  "--foreground",
  "--primary",
  "--secondary",
  "--muted",
  "--accent",
  "--border",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
]

const ICONS = [
  { Icon: CopyIcon, name: "Copy" },
  { Icon: CircleAlertIcon, name: "CircleAlert" },
  { Icon: TrashIcon, name: "Trash" },
  { Icon: ShareIcon, name: "Share" },
  { Icon: ShoppingBagIcon, name: "ShoppingBag" },
  { Icon: MoreHorizontalIcon, name: "MoreHorizontal" },
  { Icon: Loader2Icon, name: "Loader2" },
  { Icon: PlusIcon, name: "Plus" },
  { Icon: MinusIcon, name: "Minus" },
  { Icon: ArrowLeftIcon, name: "ArrowLeft" },
  { Icon: ArrowRightIcon, name: "ArrowRight" },
  { Icon: CheckIcon, name: "Check" },
  { Icon: ChevronDownIcon, name: "ChevronDown" },
  { Icon: ChevronRightIcon, name: "ChevronRight" },
  { Icon: SearchIcon, name: "Search" },
  { Icon: SettingsIcon, name: "Settings" },
]

// Specs da escala de títulos (sincronizado com globals.css)
const HEADING_SPECS = [
  { label: "Display", size: 1 as const, as: 1 as const, fontSize: "56px / 3.5rem", weight: "Semibold 600", lineHeight: "1.05", letterSpacing: "-0.02em" },
  { label: "Heading 1", size: 2 as const, as: 1 as const, fontSize: "40px / 2.5rem", weight: "Semibold 600", lineHeight: "1.1", letterSpacing: "-0.02em" },
  { label: "Heading 2", size: 3 as const, as: 2 as const, fontSize: "32px / 2rem", weight: "Semibold 600", lineHeight: "1.15", letterSpacing: "-0.018em" },
  { label: "Heading 3", size: 4 as const, as: 3 as const, fontSize: "24px / 1.5rem", weight: "Semibold 600", lineHeight: "1.2", letterSpacing: "-0.014em" },
  { label: "Heading 4", size: 5 as const, as: 4 as const, fontSize: "20px / 1.25rem", weight: "Semibold 600", lineHeight: "1.3", letterSpacing: "-0.01em" },
  { label: "Heading 5", size: 6 as const, as: 5 as const, fontSize: "18px / 1.125rem", weight: "Semibold 600", lineHeight: "1.4", letterSpacing: "-0.006em" },
  { label: "Heading 6", size: 7 as const, as: 6 as const, fontSize: "16px / 1rem", weight: "Semibold 600", lineHeight: "1.5", letterSpacing: "0em" },
]

// Specs dos estilos de corpo (sincronizado com text.tsx)
const TEXT_SPECS = [
  { label: "Body large — parágrafo confortável de leitura.", size: 1 as const, color: "default" as const, fontSize: "18px / 1.125rem", weight: "Regular 400", lineHeight: "1.625", letterSpacing: "-0.006em" },
  { label: "Body — texto padrão da interface.", size: 2 as const, color: "default" as const, fontSize: "16px / 1rem", weight: "Regular 400", lineHeight: "1.625", letterSpacing: "-0.006em" },
  { label: "Caption — informações secundárias e dicas.", size: 3 as const, color: "muted" as const, fontSize: "14px / 0.875rem", weight: "Regular 400", lineHeight: "1.625", letterSpacing: "-0.006em" },
  { label: "Erro — mensagem de validação.", size: 3 as const, color: "red" as const, fontSize: "14px / 0.875rem", weight: "Regular 400", lineHeight: "1.625", letterSpacing: "-0.006em" },
]

function TypeSpec({
  font,
  size,
  weight,
  lineHeight,
  letterSpacing,
}: {
  font: string
  size: string
  weight: string
  lineHeight: string
  letterSpacing: string
}) {
  const items = [
    { k: "Fonte", v: font },
    { k: "Tamanho", v: size },
    { k: "Peso", v: weight },
    { k: "Entrelinhas", v: lineHeight },
    { k: "Entreletras", v: letterSpacing },
  ]
  return (
    <dl className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.6875rem] leading-normal text-[#8a8a8a]">
      {items.map(({ k, v }) => (
        <div key={k} className="flex gap-1.5">
          <dt className="text-[#6a6a6a]">{k}:</dt>
          <dd className="text-[#bdbdbd]">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

const SELECT_OPTIONS = [
  { label: "Opção 1", value: "1" },
  { label: "Opção 2", value: "2" },
  { label: "Opção 3", value: "3" },
]

const editBarControlClass = "w-[160px] px-4 py-2.5"

function EditBarShowcase() {
  const [values, setValues] = React.useState<Record<string, string>>({})
  const set = (key: string) => (v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }))

  return (
    <EditBar
      className="h-[560px] w-full"
      footer={<EditBarButton>Gerar imagem</EditBarButton>}
    >
      <EditBarSection title="Produto" className="mb-6">
        <EditBarRow label="Produto">
          <SingleSelect
            className={editBarControlClass}
            options={SELECT_OPTIONS}
            value={values.produto}
            onValueChange={set("produto")}
          />
        </EditBarRow>
        <EditBarRow label="Quantidade de proteína">
          <Stepper defaultValue={1} min={0} max={10} aria-label="Quantidade de proteína" />
        </EditBarRow>
        <EditBarRow label="Tipo de carne">
          <SingleSelect
            className={editBarControlClass}
            options={SELECT_OPTIONS}
            value={values.tipoCarne}
            onValueChange={set("tipoCarne")}
          />
        </EditBarRow>
        <EditBarRow label="Queijo">
          <SingleSelect
            className={editBarControlClass}
            options={SELECT_OPTIONS}
            value={values.queijo}
            onValueChange={set("queijo")}
          />
        </EditBarRow>
        <EditBarRow label="Quantidade de bacon" noDivider>
          <Stepper defaultValue={1} min={0} max={10} aria-label="Quantidade de bacon" />
        </EditBarRow>
      </EditBarSection>

      <EditBarSection title="Cena">
        <EditBarRow label="Apresentação">
          <SingleSelect
            className={editBarControlClass}
            options={SELECT_OPTIONS}
            value={values.apresentacao}
            onValueChange={set("apresentacao")}
          />
        </EditBarRow>
        <EditBarRow label="Destaque" noDivider>
          <SingleSelect
            className={editBarControlClass}
            options={SELECT_OPTIONS}
            value={values.destaque}
            onValueChange={set("destaque")}
          />
        </EditBarRow>
      </EditBarSection>
    </EditBar>
  )
}

export function DesignSystemGallery() {
  const [carnes, setCarnes] = React.useState(2)
  const [protein, setProtein] = React.useState("hamburguer")
  const [toppings, setToppings] = React.useState<string[]>(["tomate", "cebola-roxa", "vinagrete"])
  const [ratio, setRatio] = React.useState("1:1")
  const [size, setSize] = React.useState("1K")
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])

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
          <div className="flex flex-col gap-5">
            {HEADING_SPECS.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-1">
                <Heading size={spec.size} as={spec.as}>
                  {spec.label}
                </Heading>
                <TypeSpec
                  font="Inter"
                  size={spec.fontSize}
                  weight={spec.weight}
                  lineHeight={spec.lineHeight}
                  letterSpacing={spec.letterSpacing}
                />
              </div>
            ))}
          </div>
        </GalleryItem>

        <GalleryItem name="<Text>" note="size 1–6, color muted/gray/red">
          <div className="flex flex-col gap-5">
            {TEXT_SPECS.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-1">
                <Text size={spec.size} color={spec.color}>
                  {spec.label}
                </Text>
                <TypeSpec
                  font="Inter"
                  size={spec.fontSize}
                  weight={spec.weight}
                  lineHeight={spec.lineHeight}
                  letterSpacing={spec.letterSpacing}
                />
              </div>
            ))}
          </div>
        </GalleryItem>
      </GallerySection>

      {/* 2. Tokens de cor */}
      <GallerySection
        title="Tokens de cor"
        description="Variáveis CSS do tema. Use via classes utilitárias (bg-primary, text-muted-foreground...)."
        imports={[{ name: "globals.css", from: "@/app/globals.css" }]}
      >
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
          {COLOR_TOKENS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <div
                className="relative aspect-square w-full rounded-lg after:absolute after:inset-0 after:rounded-lg after:border after:border-white/10"
                style={{ background: `var(${variant})` }}
              />
              <div className="w-full truncate text-center font-mono text-[0.6rem] text-[#8a8a8a]">
                {variant}
              </div>
            </div>
          ))}
        </div>
      </GallerySection>

      {/* Grid do projeto */}
      <GallerySection
        title="Grid do projeto"
        description="Grid_new — 14 colunas, 1 linha, tipo Stretch, margem 20px e gutter 20px."
        imports={[
          { name: "Container", from: "@/components/primitives/grid" },
          { name: "Grid", from: "@/components/primitives/grid" },
          { name: "GridItem", from: "@/components/primitives/grid" },
          { name: "GridOverlay", from: "@/components/primitives/grid" },
        ]}
      >
        <div className="flex flex-col gap-6">
          <TypeSpec
            font="Grid_new"
            size="14 colunas · 1 linha"
            weight="Stretch"
            lineHeight="margem 20px"
            letterSpacing="gutter 20px"
          />

          <GalleryItem name="<GridOverlay>" note="14 colunas visíveis (#00BFFF 20%)">
            <Container className="relative w-full overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#161616] py-6">
              <GridOverlay />
              <Grid className="relative">
                {Array.from({ length: 14 }).map((_, i) => (
                  <GridItem key={i} className="flex h-16 items-center justify-center">
                    <span className="font-mono text-[0.65rem] text-[#8a8a8a]">{i + 1}</span>
                  </GridItem>
                ))}
              </Grid>
            </Container>
          </GalleryItem>

          <GalleryItem name="<GridItem span>" note="exemplo de layout responsivo">
            <Container className="w-full rounded-lg border border-[#2a2a2a] bg-[#161616] py-6">
              <Grid>
                <GridItem span={4} className="flex h-16 items-center justify-center rounded-md bg-[#222]">
                  <span className="font-mono text-[0.65rem] text-[#cfcfcf]">span 4</span>
                </GridItem>
                <GridItem span={6} className="flex h-16 items-center justify-center rounded-md bg-[#222]">
                  <span className="font-mono text-[0.65rem] text-[#cfcfcf]">span 6</span>
                </GridItem>
                <GridItem span={4} className="flex h-16 items-center justify-center rounded-md bg-[#222]">
                  <span className="font-mono text-[0.65rem] text-[#cfcfcf]">span 4</span>
                </GridItem>
              </Grid>
            </Container>
          </GalleryItem>
        </div>
      </GallerySection>

      {/* Barra de edição */}
      <GallerySection
        title="Barra de edição"
        description="EditBar — painel de edição (Bar_New) com seções, linhas rótulo|controle e CTA. Ocupa a largura de 3 colunas do grid, reutilizando SingleSelect, Stepper e Field."
        imports={[
          { name: "EditBar", from: "@/components/primitives/edit-bar" },
          { name: "EditBarSection", from: "@/components/primitives/edit-bar" },
          { name: "EditBarRow", from: "@/components/primitives/edit-bar" },
          { name: "EditBarButton", from: "@/components/primitives/edit-bar" },
        ]}
      >
        <GalleryItem name="<EditBar>" note="span 3 colunas do grid (layout de página real)">
          <div className="w-full overflow-x-auto rounded-lg border border-[#2a2a2a] bg-[#161616]">
            <Container className="py-6" style={{ width: 1600 }}>
              <Grid className="h-[560px]">
                <GridItem span={3}>
                  <EditBarShowcase />
                </GridItem>
                <GridItem
                  span={11}
                  className="flex items-center justify-center rounded-xl border border-dashed border-[#2a2a2a] text-sm text-[#6a6a6a]"
                >
                  Área de pré-visualização (11 colunas)
                </GridItem>
              </Grid>
            </Container>
          </div>
        </GalleryItem>
      </GallerySection>

      {/* 3. Ícones */}
      <GallerySection
        title="Ícones"
        description="Conjunto base do lucide-react, tamanho 16px, herdando currentColor."
        imports={[{ name: "lucide-react", from: "lucide-react" }]}
      >
        <div className="flex flex-wrap gap-3">
          {ICONS.map(({ Icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-1">
              <Card className="flex size-9 items-center justify-center bg-[#161616] p-0 shadow-none">
                <Icon className="size-4 text-white" />
              </Card>
              <span className="font-mono text-[0.6rem] text-[#6a6a6a]">{name}</span>
            </div>
          ))}
        </div>
      </GallerySection>

      {/* 4. Campos de formulário */}
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

      {/* 5. Selects */}
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

      {/* 6. Botões & badges */}
      <GallerySection
        title="Botões & Badges"
        description="Variantes de ação e rótulos de status."
        imports={[
          { name: "Button", from: "@/components/ui/button" },
          { name: "Badge", from: "@/components/ui/badge" },
        ]}
      >
        <GalleryItem name="<Button>" note="variant default/secondary/outline/ghost">
          <div className="flex flex-wrap gap-2">
            <Button>
              <SparklesIcon fill="currentColor" stroke="none" />
              Gerar AI
            </Button>
            <Button>Criar com AI</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </GalleryItem>

        <GalleryItem name="<Badge>" note="variant default/secondary/outline">
          <div className="flex flex-wrap gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </GalleryItem>
      </GallerySection>

      {/* 7. Cards & itens */}
      <GallerySection
        title="Cards & Itens"
        description="Contêineres de conteúdo e linhas de item com ação."
        imports={[
          { name: "Card", from: "@/components/ui/card" },
          { name: "Item", from: "@/components/ui/item" },
        ]}
      >
        <GalleryItem name="<Item>" note="título + descrição + ação">
          <Item variant="outline" className="max-w-md">
            <ItemContent>
              <ItemTitle>Two-factor authentication</ItemTitle>
              <ItemDescription className="text-pretty">
                Verify via email or phone number.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="secondary">
                Enable
              </Button>
            </ItemActions>
          </Item>
        </GalleryItem>
      </GallerySection>

      {/* 8. Controles */}
      <GallerySection
        title="Controles"
        description="Entradas de seleção e ajuste: slider, switch, checkbox e radio."
        imports={[
          { name: "Slider", from: "@/components/ui/slider" },
          { name: "Switch", from: "@/components/ui/switch" },
          { name: "Checkbox", from: "@/components/ui/checkbox" },
          { name: "RadioGroup", from: "@/components/ui/radio-group" },
        ]}
      >
        <div className="flex flex-col gap-6">
          <GalleryItem name="<Slider>">
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={1000}
              min={0}
              step={10}
              className="w-full max-w-md"
              aria-label="Slider"
            />
          </GalleryItem>

          <div className="flex flex-wrap items-end gap-10">
            <GalleryItem name="<Switch>">
              <Switch defaultChecked />
            </GalleryItem>

            <GalleryItem name="<Checkbox>">
              <div className="flex gap-3">
                <Checkbox defaultChecked />
                <Checkbox />
              </div>
            </GalleryItem>

            <GalleryItem name="<RadioGroup>">
              <RadioGroup defaultValue="apple" className="flex w-fit gap-3">
                <RadioGroupItem value="apple" />
                <RadioGroupItem value="banana" />
              </RadioGroup>
            </GalleryItem>
          </div>
        </div>
      </GallerySection>

      {/* 9. Entradas de texto */}
      <GallerySection
        title="Entradas de texto"
        description="Input com addon e área de texto multilinha."
        imports={[
          { name: "InputGroup", from: "@/components/ui/input-group" },
          { name: "Textarea", from: "@/components/ui/textarea" },
        ]}
      >
        <div className="flex max-w-md flex-col gap-4">
          <GalleryItem name="<InputGroup>" note="addon com ícone">
            <InputGroup>
              <InputGroupInput placeholder="Name" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <SearchIcon />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </GalleryItem>

          <GalleryItem name="<Textarea>">
            <Textarea placeholder="Message" className="resize-none" />
          </GalleryItem>
        </div>
      </GallerySection>

      {/* 10. Sobreposições & grupos */}
      <GallerySection
        title="Sobreposições & Grupos"
        description="Diálogos de confirmação, grupos de botão e menus suspensos."
        imports={[
          { name: "AlertDialog", from: "@/components/ui/alert-dialog" },
          { name: "ButtonGroup", from: "@/components/ui/button-group" },
          { name: "DropdownMenu", from: "@/components/ui/dropdown-menu" },
        ]}
      >
        <div className="flex flex-wrap items-end gap-10">
          <GalleryItem name="<AlertDialog>">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Alert Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you want to allow the USB accessory to connect to this device and your data?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                  <AlertDialogAction>Allow</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </GalleryItem>

          <GalleryItem name="<ButtonGroup>" note="com <DropdownMenu>">
            <ButtonGroup>
              <Button variant="outline">Button Group</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <ChevronUpIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-fit">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                    <DropdownMenuItem>Block User</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">Delete Conversation</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </GalleryItem>
        </div>
      </GallerySection>

      {/* 11. Editor de imagem */}
      <GallerySection
        title="Editor de imagem"
        description="Card completo de edição com rail de ferramentas, slider e prompt."
        imports={[{ name: "ImageEditor", from: "@/components/image-editor" }]}
      >
        <div className="flex justify-center">
          <ImageEditor />
        </div>
      </GallerySection>
    </div>
  )
}
