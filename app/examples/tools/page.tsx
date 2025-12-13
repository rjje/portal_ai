"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useChat } from "@ai-sdk/react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ToolsExample() {
  const { messages, sendMessage, status } = useChat({
    api: "/api/tools",
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/examples"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Examples
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">AI Tools & Function Calling</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Demonstrate type-safe tool calling with weather lookup, calculator, and knowledge search
          </p>

          <div className="bg-secondary/50 border border-border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Available Tools:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                🌤️ <strong>Weather Tool</strong> - Get current weather for any location
              </li>
              <li>
                🔢 <strong>Calculator</strong> - Perform mathematical operations
              </li>
              <li>
                🔍 <strong>Knowledge Search</strong> - Search PORTAL documentation
              </li>
            </ul>
          </div>
        </div>

        <Card className="mb-8">
          <div className="h-[500px] flex flex-col">
            <div className="border-b border-border p-4 bg-muted/30">
              <h3 className="font-semibold">Live Tool Calling Demo</h3>
              <p className="text-sm text-muted-foreground">
                Try: "What's the weather in Tokyo?" or "Calculate 156 times 23"
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground mt-8">
                  <p className="mb-4">Ask me to check weather, perform calculations, or search knowledge</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendMessage({ text: "What's the weather in San Francisco?" })}
                    >
                      Check Weather
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendMessage({ text: "Calculate 789 multiplied by 456" })}
                    >
                      Calculate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendMessage({ text: "Search for information about PORTAL AI" })}
                    >
                      Search Knowledge
                    </Button>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                      }`}
                    >
                      {msg.parts.map((part, idx) => {
                        if (part.type === "text") {
                          return (
                            <p key={idx} className="text-sm whitespace-pre-wrap">
                              {part.text}
                            </p>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                ))
              )}
              {status === "in_progress" && (
                <div className="flex justify-start">
                  <div className="bg-secondary px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const input = formData.get("message") as string
                  if (input?.trim()) {
                    sendMessage({ text: input })
                    e.currentTarget.reset()
                  }
                }}
                className="flex gap-2"
              >
                <Input
                  name="message"
                  placeholder="Ask me to use tools..."
                  disabled={status === "in_progress"}
                  className="flex-1"
                />
                <Button type="submit" disabled={status === "in_progress"}>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </Card>

        <div className="bg-secondary/30 border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Tool Definition Code</h3>
          <pre className="bg-background p-4 rounded overflow-x-auto text-xs">
            <code>{`import { streamText, tool } from 'ai'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: messages,
    tools: {
      getWeather: tool({
        description: 'Get the weather for a location',
        inputSchema: z.object({
          location: z.string()
        }),
        execute: async ({ location }) => {
          // In a real application, you would call a weather API here.
          // For demonstration purposes, we'll return mock data.
          console.log(\`Getting weather for \${location}\`)
          return {
            location,
            temperature: 72,
            conditions: 'sunny',
          }
        },
      }),
      calculate: tool({
        description: 'Performs a mathematical calculation',
        inputSchema: z.object({
          expression: z.string()
        }),
        execute: async ({ expression }) => {
          // In a real application, you would use a robust expression parser.
          // For demonstration purposes, we'll use eval, which is generally not recommended for untrusted input.
          console.log(\`Calculating \${expression}\`)
          try {
            const result = eval(expression)
            return { result }
          } catch (error) {
            return { error: 'Invalid expression' }
          }
        },
      }),
      searchKnowledge: tool({
        description: 'Searches PORTAL documentation',
        inputSchema: z.object({
          query: z.string()
        }),
        execute: async ({ query }) => {
          console.log(\`Searching knowledge for \${query}\`)
          // In a real application, you would call a knowledge base API here.
          return {
            results: \`Information about \${query} found in PORTAL documentation.\`,
          }
        },
      }),
    },
  })
  
  return result.toUIMessageStreamResponse()
}`}</code>
          </pre>
        </div>
      </div>
      <Footer />
    </main>
  )
}
