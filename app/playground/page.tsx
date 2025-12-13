"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useChat } from "@ai-sdk/react"

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "tools" | "completion">("chat")
  const [provider, setProvider] = useState("openai/gpt-5-mini")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)

  const chatInstance = useChat({
    api: "/api/chat",
  })

  const toolsInstance = useChat({
    api: "/api/tools",
  })

  const activeInstance = activeTab === "tools" ? toolsInstance : chatInstance
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setInput } = activeInstance

  const [completionInput, setCompletionInput] = useState("")
  const [completionOutput, setCompletionOutput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleCompletion = async () => {
    if (!completionInput.trim()) return

    setIsGenerating(true)
    setCompletionOutput("")

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: completionInput,
          model: provider,
          temperature,
          maxTokens,
        }),
      })

      const data = await response.json()
      setCompletionOutput(data.text || data.error || "No response")
    } catch (err) {
      setCompletionOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleQuickExample = (prompt: string, tab: "chat" | "tools") => {
    setActiveTab(tab)
    setTimeout(() => {
      if (tab === "tools") {
        toolsInstance.setInput(prompt)
        setTimeout(() => toolsInstance.append({ role: "user", content: prompt }), 50)
      } else {
        chatInstance.setInput(prompt)
        setTimeout(() => chatInstance.append({ role: "user", content: prompt }), 50)
      }
    }, 100)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PORTAL Playground</h1>
          <p className="text-xl text-muted-foreground">Interactive AI testing powered by Vercel AI SDK v5</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Configuration</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded text-sm"
                  >
                    <option value="openai/gpt-5-mini">GPT-5 Mini</option>
                    <option value="openai/gpt-5">GPT-5</option>
                    <option value="anthropic/claude-sonnet-4.5">Claude Sonnet 4.5</option>
                    <option value="xai/grok-4-fast">Grok 4 Fast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Temperature: {temperature}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(Number.parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Max Tokens: {maxTokens}</label>
                  <input
                    type="range"
                    min="100"
                    max="4000"
                    step="100"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      Status: <span className="text-accent">{isLoading ? "Loading..." : "Ready"}</span>
                    </p>
                    <p>Messages: {messages.length}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive Interface */}
          <div className="lg:col-span-3">
            <Card className="flex flex-col">
              <div className="border-b border-border p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={`px-4 py-2 rounded transition-colors ${
                      activeTab === "chat" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveTab("tools")}
                    className={`px-4 py-2 rounded transition-colors ${
                      activeTab === "tools"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    Tools
                  </button>
                  <button
                    onClick={() => setActiveTab("completion")}
                    className={`px-4 py-2 rounded transition-colors ${
                      activeTab === "completion"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    Completion
                  </button>
                </div>
              </div>

              {activeTab === "completion" ? (
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prompt</label>
                    <textarea
                      value={completionInput}
                      onChange={(e) => setCompletionInput(e.target.value)}
                      placeholder="Enter your prompt here..."
                      className="w-full h-32 px-3 py-2 bg-input border border-border rounded resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleCompletion}
                    disabled={isGenerating || !completionInput.trim()}
                    className="w-full"
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>

                  {completionOutput && (
                    <div className="mt-4 p-4 bg-muted rounded">
                      <h4 className="font-medium mb-2">Response:</h4>
                      <p className="text-sm whitespace-pre-wrap">{completionOutput}</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground mt-8">
                        <p className="mb-2">
                          {activeTab === "chat"
                            ? "Start chatting with PORTAL AI"
                            : "Try asking to check the weather or perform calculations"}
                        </p>
                        {activeTab === "tools" && (
                          <div className="text-xs space-y-1 mt-4">
                            <p>Available tools:</p>
                            <p>• Weather lookup</p>
                            <p>• Calculator</p>
                            <p>• Knowledge search</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-secondary px-4 py-2 rounded-lg">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    )}
                    {error && <div className="text-center text-red-500 text-sm">Error: {error.message}</div>}
                  </div>

                  <div className="border-t border-border p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder={
                          activeTab === "tools" ? "Ask me to check weather or calculate..." : "Type your message..."
                        }
                        disabled={isLoading}
                        className="flex-1 px-3 py-2 bg-input border border-border rounded"
                      />
                      <Button type="submit" disabled={isLoading}>
                        Send
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Quick Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Chat", prompt: "Tell me about PORTAL AI capabilities", tab: "chat" as const },
              { label: "Weather", prompt: "What's the weather in San Francisco?", tab: "tools" as const },
              { label: "Calculate", prompt: "Calculate 156 multiplied by 23", tab: "tools" as const },
              { label: "Search", prompt: "Search for information about PORTAL Query", tab: "tools" as const },
            ].map((example) => (
              <Button
                key={example.label}
                variant="outline"
                onClick={() => handleQuickExample(example.prompt, example.tab)}
                className="h-auto py-4 flex-col gap-2"
              >
                <span className="font-medium">{example.label}</span>
                <span className="text-xs text-muted-foreground">{example.prompt}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
