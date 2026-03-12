import PromptTemplates from "./PromptTemplates"
import ExampleGallery from "./ExampleGallery"

export default function Sidebar({ onGenerate, loading }) {

  return (
    <div className="w-72 h-screen sticky top-0 border-r border-white/10 bg-white/5 backdrop-blur-xl p-4 space-y-6">

      <PromptTemplates
        onSelect={onGenerate}
        loading={loading}
      />

      <ExampleGallery
        onSelect={onGenerate}
        loading={loading}
      />

    </div>
  )
}