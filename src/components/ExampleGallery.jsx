import { examples } from "../data/examples"

export default function ExampleGallery({ onSelect, loading, activeIndex }) {

  return (

    <div>

      <h3 className="text-sm text-gray-400 mb-3">
        AI Examples
      </h3>

      <div className="grid grid-cols-2 gap-3">

        {examples.map((ex, i) => (

          <button
            key={i}
            disabled={loading}
            onClick={() => onSelect(ex.prompt, i)}
            className="text-left bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl text-sm"
          >

            {loading && activeIndex === i
              ? "Generating..."
              : ex.title
            }

          </button>

        ))}

      </div>

    </div>

  )
}