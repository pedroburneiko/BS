import { ImageEditor } from "@/components/image-editor"
import { Demo } from "@/components/demo"
import { DarkSelects } from "@/components/dark-selects"
import { PrimitivesDemo } from "@/components/primitives/primitives-demo"

export default function Page() {
  return (
    <main className="flex flex-col gap-16 bg-[#0c0c0c] p-6">
      <div className="flex justify-center">
        <ImageEditor />
      </div>
      <DarkSelects />
      <PrimitivesDemo />
      <Demo />
    </main>
  )
}
