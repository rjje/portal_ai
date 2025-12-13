"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIPlayground() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello! I'm PORTAL AI. I can help you build AI-powered applications with advanced intelligence and type-safe tools. What would you like to do?",
          },
        ],
      },
    ],
  })

  const [input, setInput] = useState("")

  const handleSendMessage = async () => {
    if (!input.trim()) return

    sendMessage({ text: input })
    setInput("")
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Interactive AI Playground</h2>
          <p className="text-lg text-muted-foreground">
            Experience the power of PORTAL AI with advanced capabilities and type-safe development
          </p>
        </div>

        <Card className="border border-border">
          <CardHeader className="border-b border-border bg-muted/30">
            <CardTitle className="text-xl">AI Chat</CardTitle>
            <CardDescription>Powered by PORTAL AI with Type-Safe Tools</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-background">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.parts.map((part, idx) => {
                      if (part.type === "text") {
                        return (
                          <p key={idx} className="text-sm">
                            {part.text}
                          </p>
                        )
                      }
                      return null
                    })}
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(msg.createdAt || Date.now()).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {status === "in_progress" && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border p-4 bg-muted/30">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask PORTAL AI anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={status === "in_progress"}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || status === "in_progress"}
                  className="bg-accent hover:bg-accent/90"
                >
                  Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Press Enter to send • Powered by PORTAL AI</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Query Data", icon: "📊", prompt: "Help me with query data management" },
            { name: "Validate Form", icon: "✓", prompt: "Show me form validation examples" },
            { name: "Route Navigation", icon: "🧭", prompt: "Explain route navigation patterns" },
            { name: "Store State", icon: "💾", prompt: "How does state management work?" },
          ].map((tool) => (
            <Button
              key={tool.name}
              variant="outline"
              className="h-20 flex-col gap-2 hover:border-accent bg-transparent"
              onClick={() => setInput(tool.prompt)}
            >
              <span className="text-2xl">{tool.icon}</span>
              <span className="text-sm font-medium">{tool.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
