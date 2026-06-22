import { DesignSystem } from "@/components/design-system"
import { ImageEditor } from "@/components/image-editor"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"

export default function Page() {
  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <DesignSystem />

      <section className="mx-auto mt-16 flex w-full max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-border pb-4">
          <Heading as="h2" size={4}>
            Padrões
          </Heading>
          <Text size={2} color="muted">
            Componentes compostos que combinam os primitivos do sistema.
          </Text>
        </div>
        <div className="flex justify-center rounded-2xl border border-border bg-card p-6">
          <ImageEditor />
        </div>
      </section>
    </main>
  )
}
