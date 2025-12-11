"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen, Github, MessageSquare, Zap, FileText } from "lucide-react"

const resources = [
  {
    title: "Complete Documentation",
    description:
      "Comprehensive guides covering all PORTAL features, APIs, adapters, and best practices for production AI applications.",
    icon: BookOpen,
    cta: "Read Docs",
  },
  {
    title: "GitHub Repository",
    description:
      "Full source code, examples, issues tracker, and contribution guidelines for PORTAL AI. Follow development and contribute.",
    icon: Github,
    cta: "View GitHub",
  },
  {
    title: "API Reference",
    description:
      "Complete API documentation with TypeScript types, function signatures, and detailed parameter descriptions.",
    icon: FileText,
    cta: "API Docs",
  },
  {
    title: "Community Discord",
    description:
      "Join thousands of developers building with PORTAL. Get help, share projects, and connect with the community.",
    icon: MessageSquare,
    cta: "Join Discord",
  },
  {
    title: "Playground",
    description:
      "Interactive sandbox to experiment with PORTAL features, test different adapters, and prototype AI applications.",
    icon: Zap,
    cta: "Open Playground",
  },
  {
    title: "Examples Repository",
    description:
      "Ready-to-use examples covering chat interfaces, tool calling, streaming, multimodal content, and more.",
    icon: BookOpen,
    cta: "View Examples",
  },
]

export default function Resources() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Resources & Support</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master PORTAL and build powerful AI applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <div
                key={resource.title}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-secondary bg-transparent w-full justify-between"
                >
                  {resource.cta}
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
