export async function generateUI(prompt) {

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content: `
Generate a React functional component using Tailwind CSS.

Rules:
- Return ONLY JSX
- No markdown
- No explanations
- Component name: GeneratedComponent
`
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    }
  )

  const data = await response.json()

  let code = data?.choices?.[0]?.message?.content || ""

  code = code
    .replace(/```jsx/g, "")
    .replace(/```/g, "")
    .trim()

  return code
}