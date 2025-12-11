"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"
import Link from "next/link"

const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Begin building with PORTAL",
    items: [
      { name: "Installation", href: "/docs/getting-started/installation" },
      { name: "Quick Start", href: "/docs/getting-started/quick-start" },
      { name: "Configuration", href: "/docs/getting-started/configuration" },
    ],
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    description: "Understand PORTAL fundamentals",
    items: [
      { name: "Type Safety", href: "/docs/core/type-safety" },
      { name: "Tools & Functions", href: "/docs/core/tools" },
      { name: "Streaming", href: "/docs/core/streaming" },
      { name: "Providers", href: "/docs/core/providers" },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Complete API documentation",
    items: [
      { name: "PORTAL.ai()", href: "/docs/api/ai" },
      { name: "Tool Definition", href: "/docs/api/tools" },
      { name: "Message Types", href: "/docs/api/messages" },
      { name: "Response Formats", href: "/docs/api/responses" },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Master advanced patterns",
    items: [
      { name: "Custom Adapters", href: "/docs/advanced/adapters" },
      { name: "Agentic Loops", href: "/docs/advanced/agents" },
      { name: "Multimodal", href: "/docs/advanced/multimodal" },
      { name: "Performance", href: "/docs/advanced/performance" },
    ],
  },
  {
    id: "examples",
    title: "Examples",
    description: "Real-world implementations",
    items: [
      { name: "Chatbot", href: "/docs/examples/chatbot" },
      { name: "Data Analysis", href: "/docs/examples/analysis" },
      { name: "Code Generation", href: "/docs/examples/code-gen" },
      { name: "Research Agent", href: "/docs/examples/research" },
    ],
  },
]

export default function DocsPage() {
  const [expandedSection, setExpandedSection] = useState("getting-started")

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground">Complete guides and references for building with PORTAL</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Documentation</h2>
              <div className="space-y-3">
                {docSections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => setExpandedSection(expandedSection === section.id ? "" : section.id)}
                      className="w-full text-left font-medium hover:text-primary transition-colors py-2"
                    >
                      {section.title}
                    </button>
                    {expandedSection === section.id && (
                      <div className="space-y-2 ml-4">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Overview */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {docSections.map((section) => (
                <div key={section.id} className="bg-card rounded-lg border border-border p-8">
                  <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                  <p className="text-muted-foreground mb-6">{section.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="p-4 bg-secondary rounded hover:bg-accent/20 transition-colors"
                      >
                        <h3 className="font-medium">{item.name}</h3>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
