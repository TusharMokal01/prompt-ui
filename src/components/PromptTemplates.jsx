import { templates } from "../data/templates"

export default function PromptTemplates({ onSelect, loading, activeIndex }) {

  return (

    <div className="space-y-2">

      <h3 className="text-sm text-gray-400 mb-2">
        Prompt Templates
      </h3>

      {templates.map((t, i) => (

        <button
          key={i}
          disabled={loading}
          onClick={() => onSelect(t, i)}
          className="w-full text-left text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition"
        >

          {loading && activeIndex === i
            ? "Generating..."
            : t
          }

        </button>

      ))}

    </div>

  )
}