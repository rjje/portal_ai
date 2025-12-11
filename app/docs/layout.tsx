import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation | PORTAL AI Development Library",
  description:
    "Complete guides and API references for building AI applications with PORTAL. Learn type-safe development, streaming, tools, agents, RAG systems, and multi-provider integration.",
  keywords: ["PORTAL documentation", "AI API reference", "Type-safe AI", "Developer guide", "Tutorial"],
  openGraph: {
    title: "PORTAL Documentation",
    description: "Complete guides for PORTAL AI development",
    url: "https://portal.ai/docs",
  },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children
}
