"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Type-Safe AI Tools",
    description:
      "Define tools once with schemas and execute them automatically across server and client with full type inference",
    icon: "🔐",
    tags: ["Tools", "Type Safety"],
  },
  {
    title: "Streaming Responses",
    description:
      "Real-time streaming of AI responses with chunked data processing for instant feedback and interactivity",
    icon: "⚡",
    tags: ["Streaming", "Performance"],
  },
  {
    title: "Multi-Provider Support",
    description:
      "Unified interface across OpenAI, Anthropic, Google Gemini, Ollama, and custom adapters with zero lock-in",
    icon: "🔄",
    tags: ["Adapters", "Flexibility"],
  },
  {
    title: "Agentic Architecture",
    description:
      "Advanced tool calling loops with approval flows, error handling, and iterative reasoning for autonomous AI",
    icon: "🤖",
    tags: ["Agents", "Advanced"],
  },
  {
    title: "Multimodal Content",
    description: "Support for text, images, audio, documents, and thinking tokens in a unified message format",
    icon: "🎨",
    tags: ["Content", "Rich Media"],
  },
  {
    title: "Production Ready",
    description:
      "Devtools integration, observability hooks, error boundaries, and enterprise-grade reliability patterns",
    icon: "🏢",
    tags: ["Enterprise", "Monitoring"],
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Powerful AI Capabilities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build sophisticated AI applications with confidence and control
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="border border-border hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
