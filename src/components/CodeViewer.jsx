export default function CodeViewer({ code }) {

  function copyCode() {
    navigator.clipboard.writeText(code)
  }

  function downloadCode() {

    const blob = new Blob([code], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "GeneratedComponent.jsx"
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="mt-6 backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl">

      <div className="flex justify-between p-3 border-b border-white/10">

        <span className="text-sm text-gray-300">
          JSX Code
        </span>

        <div className="flex gap-2">

          <button
            onClick={copyCode}
            className="text-xs bg-white/10 px-2 py-1 rounded"
          >
            Copy
          </button>

          <button
            onClick={downloadCode}
            className="text-xs bg-white/10 px-2 py-1 rounded"
          >
            Download
          </button>

        </div>

      </div>

      <pre className="p-4 text-sm text-green-400 overflow-auto whitespace-pre-wrap">
        {code}
      </pre>

    </div>
  )
}