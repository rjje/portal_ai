"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ChatbotExample() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
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
          <h1 className="text-4xl font-bold mb-4">AI Chatbot Example</h1>
          <p className="text-xl text-muted-foreground mb-6">
            A production-ready conversational AI chatbot with streaming responses using PORTAL AI SDK
          </p>

          <div className="bg-secondary/50 border border-border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Real-time streaming responses</li>
              <li>✓ Type-safe message handling</li>
              <li>✓ Automatic conversation management</li>
              <li>✓ Error handling and retry logic</li>
            </ul>
          </div>
        </div>

        <Card className="mb-8">
          <div className="h-[500px] flex flex-col">
            <div className="border-b border-border p-4 bg-muted/30">
              <h3 className="font-semibold">Live Demo</h3>
              <p className="text-sm text-muted-foreground">Try the chatbot below</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground mt-8">
                  <p>Start a conversation by typing a message below</p>
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
                  placeholder="Type your message..."
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
          <h3 className="font-semibold mb-4">Implementation Code</h3>
          <pre className="bg-background p-4 rounded overflow-x-auto text-xs">
            <code>{`import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

export default function ChatbotExample() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  return (
    <div className="chat-container">
      {messages.map((msg) => (
        <div key={msg.id} className={msg.role}>
          {msg.parts.map((part) => 
            part.type === 'text' ? <p>{part.text}</p> : null
          )}
        </div>
      ))}
      
      <form onSubmit={(e) => {
        e.preventDefault()
        const input = new FormData(e.currentTarget).get('message')
        sendMessage({ text: input })
      }}>
        <input name="message" disabled={status === 'in_progress'} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}`}</code>
          </pre>
        </div>
      </div>
      <Footer />
    </main>
  )
}
