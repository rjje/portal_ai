"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [provider, setProvider] = useState("openai")

  const handleSend = () => {
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content: "Demo response - This is an interactive playground. Configure your API keys to get real responses.",
      },
    ])
    setInput("")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PORTAL Playground</h1>
          <p className="text-xl text-muted-foreground">Interactive testing environment for PORTAL AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Configuration</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Provider</label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded"
                  >
                    <option value="openai">OpenAI</option>
                    <option value="claude">Claude</option>
                    <option value="gemini">Gemini</option>
                    <option value="ollama">Ollama</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">API Key</label>
                  <input
                    type="password"
                    placeholder="Enter API key"
                    className="w-full px-3 py-2 bg-input border border-border rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <select className="w-full px-3 py-2 bg-input border border-border rounded">
                    <option>gpt-4</option>
                    <option>gpt-3.5-turbo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Temperature</label>
                  <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full" />
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-96 flex flex-col">
              <div className="border-b border-border p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={`px-4 py-2 rounded ${
                      activeTab === "chat" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveTab("tools")}
                    className={`px-4 py-2 rounded ${
                      activeTab === "tools" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    Tools
                  </button>
                  <button
                    onClick={() => setActiveTab("streaming")}
                    className={`px-4 py-2 rounded ${
                      activeTab === "streaming" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    Streaming
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground mt-8">
                    Start a conversation to see messages here
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded ${
                          msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 bg-input border border-border rounded"
                  />
                  <Button onClick={handleSend}>Send</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
