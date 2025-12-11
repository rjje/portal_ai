"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const adapters = [
  {
    name: "OpenAI",
    models: ["GPT-4o", "GPT-4 Turbo", "GPT-4", "GPT-3.5"],
    description: "Industry-leading language models with vision and reasoning capabilities",
    icon: "🤖",
    badge: "Popular",
  },
  {
    name: "Anthropic Claude",
    models: ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 3 Haiku"],
    description: "Advanced models with extended thinking and superior safety properties",
    icon: "🧠",
    badge: "Advanced",
  },
  {
    name: "Google Gemini",
    models: ["Gemini 2.0", "Gemini Pro", "Gemini Vision"],
    description: "Multimodal models with strong reasoning across text, code, and images",
    icon: "🔍",
    badge: "Multimodal",
  },
  {
    name: "Ollama",
    models: ["Llama 2", "Mistral", "Neural Chat", "Custom Models"],
    description: "Run open-source models locally with full control and privacy",
    icon: "🏠",
    badge: "Local",
  },
  {
    name: "Custom Adapters",
    models: ["Build Your Own", "Extend PORTAL", "Integration Ready"],
    description: "Implement custom adapters for proprietary or specialized models",
    icon: "⚙️",
    badge: "Extensible",
  },
  {
    name: "Together AI",
    models: ["All Together Models", "Multiplexing Support"],
    description: "Access multiple open-source models and fine-tuning capabilities",
    icon: "🚀",
    badge: "Flexible",
  },
]

export default function Adapters() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Multi-Provider Support</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unified interface across leading AI providers with zero vendor lock-in
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adapters.map((adapter) => (
            <Card key={adapter.name} className="border border-border hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-4xl">{adapter.icon}</span>
                  <Badge variant="outline" className="border-accent text-accent bg-accent/5">
                    {adapter.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{adapter.name}</CardTitle>
                <CardDescription>{adapter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Available Models:</p>
                  <ul className="space-y-1">
                    {adapter.models.map((model) => (
                      <li key={model} className="text-sm text-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-accent rounded-full"></span>
                        {model}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
