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

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [page, setPage] = useState(
    window.location.hash.replace("#", "") || "generator"
  )

  useEffect(() => {

    function handleHashChange() {
      const newPage = window.location.hash.replace("#", "") || "generator"
      setPage(newPage)
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => window.removeEventListener("hashchange", handleHashChange)

  }, [])

  function navigate(newPage) {
    window.location.hash = newPage
    setPage(newPage)
    setSidebarOpen(false)
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

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* Mobile Menu */}

            <button
              className="md:hidden text-xl"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <h1
              onClick={() => navigate("generator")}
              className="text-lg md:text-xl font-bold cursor-pointer"
            >
              PromptUI
            </h1>

          </div>

          {/* Desktop Menu */}

          <div className="hidden md:flex gap-6 text-sm">

            <button onClick={() => navigate("generator")} className="hover:text-indigo-400">
              Generator
            </button>

            <button onClick={() => navigate("examples")} className="hover:text-indigo-400">
              Examples
            </button>

            <button onClick={() => navigate("about")} className="hover:text-indigo-400">
              About
            </button>

          </div>

        </div>

      </nav>

      {/* MOBILE NAV MENU */}

      {sidebarOpen && (

        <div className="fixed inset-0 z-50 bg-black/70 md:hidden">

          <div className="w-64 h-full bg-[#020617] p-6">

            <button
              className="mb-6 text-gray-400"
              onClick={() => setSidebarOpen(false)}
            >
              Close
            </button>

            <div className="flex flex-col gap-4">

              <button onClick={() => navigate("generator")}>Generator</button>
              <button onClick={() => navigate("examples")}>Examples</button>
              <button onClick={() => navigate("about")}>About</button>

            </div>

            {page === "generator" && (
              <div className="mt-6">
                <Sidebar
                  onGenerate={handleGenerate}
                  loading={loading}
                  activeIndex={activeIndex}
                />
              </div>
            )}

          </div>

        </div>

      )}

      {/* MAIN */}

      <div className="flex flex-1">

        {/* DESKTOP SIDEBAR */}

        {page === "generator" && (
          <div className="hidden md:block">
            <Sidebar
              onGenerate={handleGenerate}
              loading={loading}
              activeIndex={activeIndex}
            />
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 space-y-6 overflow-x-hidden">

          {/* HERO */}

          {page === "generator" && (

            <div className="text-center mb-6">

              <h1 className="text-2xl md:text-4xl font-bold mb-2">
                Turn your ideas into beautiful web pages
              </h1>

              <p className="text-gray-400 text-sm md:text-base">
                Describe your UI and let AI generate the code instantly.
              </p>

            </div>

          )}

          {/* PROMPT */}

          {page === "generator" && (

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 md:p-6">

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: SaaS landing page with hero, pricing and footer"
                className="w-full h-24 md:h-28 bg-black/30 border border-white/20 rounded-lg p-3 text-sm outline-none"
              />

              <div className="mt-4 flex justify-end">

                <button
                  onClick={() => handleGenerate()}
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-sm"
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

          {/* CODE */}

          {page === "generator" && (
            <CodeViewer code={code} />
          )}

          {/* EXAMPLES */}

          {page === "examples" && (

            <div className="max-w-6xl mx-auto">

              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Example UIs You Can Generate
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {[{
                  video: saasVideo,
                  title: "SaaS Landing Page",
                  desc: "Hero, pricing and features section"
                },
                {
                  video: adminDashboard,
                  title: "Admin Dashboard",
                  desc: "Charts, tables and analytics layout"
                },
                {
                  video: ecommerce,
                  title: "Ecommerce Store",
                  desc: "Product grid and shopping layout"
                }].map((item, i) => (

                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition"
                  >

                    <video
                      src={item.video}
                      className="h-40 w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />

                    <div className="p-4">

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        {item.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* ABOUT */}

          {page === "about" && (

            <div className="max-w-3xl mx-auto text-center space-y-6">

              <h2 className="text-2xl md:text-3xl font-bold">
                About This Project
              </h2>

              <p className="text-gray-400 text-sm md:text-base">
                This AI UI Builder generates modern React + Tailwind
                interfaces from simple prompts.
              </p>

              <p className="text-gray-400 text-sm md:text-base">
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

      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl py-4 text-center text-xs md:text-sm text-gray-400 px-4">

        Made with ❤️ by <span className="font-semibold">Tushar Mokal</span> using
        React, Vite, Bun and Tailwind CSS

        <div className="mt-1">
          © {new Date().getFullYear()} Tushar Mokal
        </div>

      </footer>

    </div>
  )
}