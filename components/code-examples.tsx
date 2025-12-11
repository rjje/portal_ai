"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function CodeExamples() {
  const [activeTab, setActiveTab] = useState("basic")
  const [copied, setCopied] = useState(false)

  const examples = {
    basic: {
      language: "TypeScript",
      code: `import { chat } from "@portal/ai"
import { openai } from "@portal/adapters"

const response = await chat({
  model: "openai/gpt-4o",
  messages: [
    { role: "user", content: "Hello, what can you do?" }
  ]
})

console.log(response.content)`,
    },
    tools: {
      language: "TypeScript",
      code: `import { chat, toolDefinition } from "@portal/ai"

const tools = [
  toolDefinition({
    name: "searchDatabase",
    description: "Search the knowledge base",
    schema: z.object({
      query: z.string().describe("Search query")
    }),
    execute: async ({ query }) => {
      return await db.search(query)
    }
  })
]

const response = await chat({
  model: "openai/gpt-4o",
  messages: [{ role: "user", content: "Find users named John" }],
  tools
})`,
    },
    streaming: {
      language: "TypeScript",
      code: `import { createStreamProcessor } from "@portal/ai"

const stream = await chat({
  model: "openai/gpt-4o",
  messages: [{ role: "user", content: "Write a poem" }],
  stream: true
})

const processor = createStreamProcessor()

for await (const chunk of stream) {
  const processed = processor.process(chunk)
  console.log(processed.content)
}`,
    },
    react: {
      language: "TypeScript (React)",
      code: `import { useChat } from "@portal/ai-react"

export function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = 
    useChat({
      api: "/api/chat",
      model: "openai/gpt-4o"
    })

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input 
          value={input} 
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}`,
    },
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(examples[activeTab as keyof typeof examples].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Code Examples</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Get started with PORTAL in minutes. Choose from basic chat, tool-calling, streaming, or React integration
            patterns.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border overflow-x-auto">
            {Object.entries(examples).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === key
                    ? "text-accent border-b-2 border-accent bg-muted/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative">
            <pre className="p-6 text-sm text-foreground overflow-x-auto bg-secondary min-h-96">
              <code>{examples[activeTab as keyof typeof examples].code}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 bg-muted hover:bg-muted/80 rounded-lg transition"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
