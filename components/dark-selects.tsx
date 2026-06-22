"use client"

import * as React from "react"
import { ChevronDownIcon, CheckIcon, SquareIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/* ----------------------------- Single select ----------------------------- */

type Option = { label: string; value: string; disabled?: boolean }

export function SingleSelect({
  options,
  value,
  onValueChange,
  placeholder = "Selecione",
  className,
}: {
  options: Option[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "flex w-64 items-center justify-between rounded-full border border-[#2a2a2a] bg-[#161616] px-5 py-3 text-sm text-white outline-none transition-colors hover:border-[#3a3a3a] focus-visible:border-[#3a3a3a]",
          className
        )}
      >
        <span className={cn(!selected && "text-[#8a8a8a]")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDownIcon className="size-4 text-[#8a8a8a]" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-64 gap-0 rounded-2xl border border-[#2a2a2a] bg-[#161616] p-2"
      >
        {options.map((option) => {
          const isSelected = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange?.(option.value)
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-[#cfcfcf] transition-colors hover:bg-white/5",
                isSelected && "bg-white/5 text-white"
              )}
            >
              <span>{option.label}</span>
              {isSelected && <CheckIcon className="size-4 text-white" />}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

/* ----------------------------- Multi select ------------------------------ */

export function MultiSelect({
  options,
  values,
  onValuesChange,
  className,
}: {
  options: Option[]
  values: string[]
  onValuesChange?: (values: string[]) => void
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  function toggle(value: string) {
    if (values.includes(value)) {
      onValuesChange?.(values.filter((v) => v !== value))
    } else {
      onValuesChange?.([...values, value])
    }
  }

  const label =
    values.length === 0
      ? "Selecione"
      : values.length === 1
        ? options.find((o) => o.value === values[0])?.label ?? "1 selecionado"
        : `${values.length} selecionados`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "flex w-64 items-center justify-between rounded-full border border-[#2a2a2a] bg-[#161616] px-5 py-3 text-sm text-white outline-none transition-colors hover:border-[#3a3a3a] focus-visible:border-[#3a3a3a]",
          className
        )}
      >
        <span className={cn(values.length === 0 && "text-[#8a8a8a]")}>
          {label}
        </span>
        <ChevronDownIcon className="size-4 text-[#8a8a8a]" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-64 gap-0 rounded-2xl border border-[#2a2a2a] bg-[#161616] p-2"
      >
        {options.map((option) => {
          const isSelected = values.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => toggle(option.value)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                option.disabled
                  ? "cursor-default text-[#6a6a6a]"
                  : "text-[#cfcfcf] hover:bg-white/5"
              )}
            >
              <span>{option.label}</span>
              {isSelected && !option.disabled && (
                <CheckIcon className="size-4 text-white" />
              )}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

/* --------------------------- Compact pill select -------------------------- */

export function PillSelect({
  options,
  value,
  onValueChange,
  icon,
}: {
  options: Option[]
  value: string
  onValueChange?: (value: string) => void
  icon?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-white outline-none transition-colors hover:bg-white/5">
        {icon}
        <span>{selected?.label ?? value}</span>
        <ChevronDownIcon className="size-3.5 text-[#8a8a8a]" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-32 gap-0 rounded-2xl border border-[#2a2a2a] bg-[#161616] p-2"
      >
        {options.map((option) => {
          const isSelected = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange?.(option.value)
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm text-[#cfcfcf] transition-colors hover:bg-white/5",
                isSelected && "bg-white/5 text-white"
              )}
            >
              <span>{option.label}</span>
              {isSelected && <CheckIcon className="size-3.5 text-white" />}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

export function PillToolbar() {
  const [ratio, setRatio] = React.useState("1:1")
  const [size, setSize] = React.useState("1K")

  return (
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
  )
}

/* --------------------------------- Showcase ------------------------------- */

export function DarkSelects() {
  const [protein, setProtein] = React.useState("hamburguer")
  const [toppings, setToppings] = React.useState<string[]>([
    "tomate",
    "cebola-roxa",
    "vinagrete",
  ])

  return (
    <div className="flex flex-wrap items-start gap-10 rounded-2xl bg-[#0c0c0c] p-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[#8a8a8a]">
          Single select
        </span>
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
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[#8a8a8a]">
          Multi select
        </span>
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
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[#8a8a8a]">
          Pill toolbar
        </span>
        <PillToolbar />
      </div>
    </div>
  )
}
