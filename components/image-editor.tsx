"use client"

import { useState } from "react"
import {
  XIcon,
  MousePointer2Icon,
  PencilIcon,
  EraserIcon,
  WandSparklesIcon,
  ArrowRightIcon,
  Maximize2Icon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const tools = [
  { id: "select", label: "Select", icon: MousePointer2Icon },
  { id: "brush", label: "Brush", icon: PencilIcon },
  { id: "erase", label: "Erase", icon: EraserIcon },
]

export function ImageEditor() {
  const [activeTool, setActiveTool] = useState("brush")
  const [strength, setStrength] = useState(58)
  const [prompt, setPrompt] = useState("")

  return (
    <div className="flex w-full max-w-[498px] flex-col gap-4">
      {/* Main editor card */}
      <div className="relative overflow-hidden rounded-[20px] border border-[#515151] bg-[#1F1F1F]/80 p-5 shadow-2xl backdrop-blur-[10px]">
        {/* gradient accent border glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px] opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #853FFF 0%, #472F71 100%)",
          }}
        />

        {/* Header */}
        <div className="relative mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WandSparklesIcon className="size-5 text-[#E2FF3F]" />
            <h2 className="text-lg font-semibold text-white">Edit</h2>
          </div>
          <button
            type="button"
            aria-label="Close editor"
            className="flex size-8 items-center justify-center rounded-md text-[#CECECE] transition-colors hover:bg-white/10"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Canvas */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[20px]">
          <img
            src="/images/editor-sample.png"
            alt="Landscape being edited"
            className="size-full object-cover"
          />

          {/* Selection mask overlay */}
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            viewBox="0 0 458 458"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="selection-stroke"
                x1="215"
                y1="232"
                x2="415"
                y2="398"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#853FFF" />
                <stop offset="1" stopColor="#472F71" />
              </linearGradient>
            </defs>
            <path
              d="M335 260C343 238 367 227 388 235C410 243 421 267 413 289C411 294 409 298 407 301C399 320 386 333 371 343C358 355 346 364 329 373C312 381 293 388 266 395C244 401 221 388 215 366C209 344 222 321 244 315C270 308 283 303 292 299C300 295 306 290 318 280L320 278L323 277C326 274 328 272 329 271C330 270 330 270 330 269L331 268C332 266 333 264 334 262C334 261 335 261 335 260Z"
              fill="#853FFF"
              fillOpacity="0.2"
              stroke="url(#selection-stroke)"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>

          {/* Left tool rail */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon
              const isActive = activeTool === tool.id
              return (
                <button
                  key={tool.id}
                  type="button"
                  aria-label={tool.label}
                  aria-pressed={isActive}
                  onClick={() => setActiveTool(tool.id)}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md text-[#CECECE] transition-colors",
                    isActive
                      ? "bg-[#7D3BF1] text-white"
                      : "bg-black/40 backdrop-blur-sm hover:bg-black/60",
                  )}
                >
                  <Icon className="size-4" />
                </button>
              )
            })}
          </div>

          {/* Zoom badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md border border-[#7B7B7B] bg-black/50 px-2 py-1 text-xs text-[#CECECE] backdrop-blur-sm">
            <Maximize2Icon className="size-3" />
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Floating prompt bar */}
      <div className="rounded-[20px] border border-[#515151] bg-[#1F1F1F]/80 p-4 backdrop-blur-[10px]">
        {/* Strength slider */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-[#CECECE]">Strength</span>
            <span className="font-medium text-white">{strength}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
            aria-label="Edit strength"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#4A4A4A] accent-white [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D9D9D9]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #D9D9D9 " +
                strength +
                "%, #4A4A4A " +
                strength +
                "%)",
            }}
          />
        </div>

        {/* Prompt input */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your edit..."
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#7B7B7B]"
          />
          <button
            type="button"
            aria-label="Generate edit"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#853FFF] text-black transition-opacity hover:opacity-90"
          >
            <ArrowRightIcon className="size-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  )
}
