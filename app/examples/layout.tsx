import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Examples | PORTAL AI Development",
  description:
    "Real-world production-ready examples using PORTAL. Chatbots, RAG systems, data analysis, code generation, research agents, and content generation.",
  keywords: ["PORTAL examples", "AI chatbot", "RAG example", "AI agent example", "Code generation", "Production AI"],
  openGraph: {
    title: "PORTAL Examples - Real-World AI Applications",
    description: "Production-ready code examples for AI applications",
    url: "https://portal.ai/examples",
  },
}

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return children
}
