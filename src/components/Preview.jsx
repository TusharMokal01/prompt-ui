export default function Preview({ code }) {

  function sanitizeJSX(jsx) {

    if (!jsx) return ""

    // extract return content
    const match = jsx.match(/return\s*\(([\s\S]*)\);?/)

    let html = match ? match[1] : jsx

    html = html

      // convert className
      .replace(/className/g, "class")

      // remove jsx comments
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")

      // remove ternary expressions
      .replace(/\{[^{}]*\?[^{}]*:[^{}]*\}/g, "")

      // remove logical expressions
      .replace(/\{[^{}]*&&[^{}]*\}/g, "")

      // remove map loops
      .replace(/\{[\s\S]*?\.map\([\s\S]*?\)\}/g, `
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-gray-200 h-32 rounded"></div>
          <div class="bg-gray-200 h-32 rounded"></div>
          <div class="bg-gray-200 h-32 rounded"></div>
        </div>
      `)

      // remove arrow functions
      .replace(/\{\(\)\s*=>[\s\S]*?\}/g, "")

      // remove remaining JS expressions
      .replace(/\{[\s\S]*?\}/g, "")

      // remove fragments
      .replace(/<>/g, "")
      .replace(/<\/>/g, "")

      // remove event handlers
      .replace(/on[A-Z][a-zA-Z]+=\{[\s\S]*?\}/g, "")

      // fix self closing tags
      .replace(/<img([^>]*)\/>/g, "<img $1>")
      .replace(/<input([^>]*)\/>/g, "<input $1>")

    return html.trim()
  }

  const html = sanitizeJSX(code)

  const previewHTML = `
  <html>
    <head>

      <script src="https://cdn.tailwindcss.com"></script>

      <style>
        body{
          background:#111827;
          padding:24px;
          font-family:sans-serif;
        }
      </style>

    </head>

    <body>

      <div class="max-w-5xl mx-auto">
        ${html || "<p style='color:white'>Preview will appear here</p>"}
      </div>

      <script>

        // prevent navigation
        document.querySelectorAll("a").forEach(link=>{
          link.addEventListener("click",e=>e.preventDefault())
        })

        // prevent form submission
        document.querySelectorAll("form").forEach(form=>{
          form.addEventListener("submit",e=>e.preventDefault())
        })

      </script>

    </body>
  </html>
  `

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5">

      <h2 className="text-white mb-3 font-semibold">
        Live Preview
      </h2>

      <iframe
        className="w-full h-[520px] rounded-lg border border-white/10"
        srcDoc={previewHTML}
        title="preview"
      />

    </div>
  )
}