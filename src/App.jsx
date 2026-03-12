import { useState, useEffect } from "react"

import Sidebar from "./components/Sidebar"
import Preview from "./components/Preview"
import CodeViewer from "./components/CodeViewer"

import { generateUI } from "./services/openrouter"

import saasVideo from "./assets/examples/saaslandingpage.mp4"
import adminDashboard from "./assets/examples/admindashboard.mp4"
import ecommerce from "./assets/examples/ecommerce.mp4"

export default function App() {

  const [prompt, setPrompt] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const [page, setPage] = useState(
    window.location.hash.replace("#", "") || "generator"
  )

  useEffect(() => {

    function handleHashChange() {
      const newPage = window.location.hash.replace("#", "") || "generator"
      setPage(newPage)
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }

  }, [])

  function navigate(newPage) {

    window.location.hash = newPage
    setPage(newPage)

  }

  async function handleGenerate(newPrompt = null, index = null) {

    const finalPrompt = newPrompt || prompt

    if (!finalPrompt) return

    try {

      setActiveIndex(index)
      setLoading(true)
      setPrompt(finalPrompt)

      const result = await generateUI(finalPrompt)

      setCode(result)

    } catch (err) {

      console.error(err)

      setCode(`
function GeneratedComponent(){
  return(
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-red-500">
        Failed to generate UI
      </h1>
    </div>
  )
}
`)

    } finally {

      setLoading(false)
      setActiveIndex(null)

    }

  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white">

      {/* NAVBAR */}

      <nav className="border-b border-white/10 backdrop-blur-xl bg-white/5">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1
            onClick={() => navigate("generator")}
            className="text-xl font-bold cursor-pointer"
          >
            PromptUI
          </h1>

          <div className="flex gap-6 text-sm">

            <button
              onClick={() => navigate("generator")}
              className="hover:text-indigo-400"
            >
              Generator
            </button>

            <button
              onClick={() => navigate("examples")}
              className="hover:text-indigo-400"
            >
              Examples
            </button>

            <button
              onClick={() => navigate("about")}
              className="hover:text-indigo-400"
            >
              About
            </button>

          </div>

        </div>

      </nav>

      {/* MAIN */}

      <div className="flex flex-1">

        {page === "generator" && (
          <Sidebar
            onGenerate={handleGenerate}
            loading={loading}
            activeIndex={activeIndex}
          />
        )}

        <main className="flex-1 p-8 space-y-6">

          {/* HERO */}

          {page === "generator" && (

            <div className="text-center mb-8">

              <h1 className="text-4xl font-bold mb-3">
                Turn your ideas into beautiful web pages
              </h1>

              <p className="text-gray-400">
                Describe your UI and let AI generate the code instantly.
              </p>

            </div>

          )}

          {/* PROMPT INPUT */}

          {page === "generator" && (

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: SaaS landing page with hero, pricing and footer"
                className="w-full h-24 bg-black/30 border border-white/20 rounded-lg p-3 text-sm outline-none"
              />

              <div className="mt-4 flex justify-end">

                <button
                  onClick={() => handleGenerate()}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate UI"}
                </button>

              </div>

            </div>

          )}

          {/* PREVIEW */}

          {page === "generator" && (
            <Preview code={code} />
          )}

          {/* CODE VIEWER */}

          {page === "generator" && (
            <CodeViewer code={code} />
          )}

          {/* EXAMPLES */}

          {page === "examples" && (

            <div className="max-w-6xl mx-auto">

              <h2 className="text-3xl font-bold mb-8 text-center">
                Example UIs You Can Generate
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition">

                  <video
                    src={saasVideo}
                    className="h-44 w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />

                  <div className="p-4">

                    <h3 className="font-semibold">
                      SaaS Landing Page
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Hero, pricing and features section
                    </p>

                  </div>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition">

                  <video
                  src={adminDashboard}
                  className="h-44 w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  />

                  <div className="p-4">

                    <h3 className="font-semibold">
                      Admin Dashboard
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Charts, tables and analytics layout
                    </p>

                  </div>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition">

                  <video
                  src={ecommerce}
                  className="h-44 w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  />

                  <div className="p-4">

                    <h3 className="font-semibold">
                      Ecommerce Store
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Product grid and shopping layout
                    </p>

                  </div>

                </div>

              </div>

            </div>

          )}

          {/* ABOUT */}

          {page === "about" && (

            <div className="max-w-3xl mx-auto text-center space-y-6">

              <h2 className="text-3xl font-bold">
                About This Project
              </h2>

              <p className="text-gray-400">
                This AI UI Builder generates modern React + Tailwind
                interfaces from simple prompts.
              </p>

              <p className="text-gray-400">
                Built using React, Vite, Bun, Tailwind CSS and OpenRouter AI.
              </p>

              <a
                href="https://tusharmokal.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Visit My Portfolio
              </a>

            </div>

          )}

        </main>

      </div>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl py-4 text-center text-sm text-gray-400">

        Made with ❤️ by <span className="font-semibold">Tushar Mokal</span> using
        React, Vite, Bun and Tailwind CSS

        <div className="mt-1">
          © {new Date().getFullYear()} Tushar Mokal. All rights reserved.
        </div>

      </footer>

    </div>
  )
}