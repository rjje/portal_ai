import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | PORTAL AI Platform",
  description:
    "Articles, tutorials, and insights on AI development with PORTAL. Learn about type-safe AI, streaming, agents, RAG, production patterns, and more.",
  keywords: ["AI blog", "PORTAL tutorials", "AI development guide", "AI agent patterns", "RAG systems", "Type-safe AI"],
  alternates: {
    canonical: "https://portal.ai/blog",
  },
  openGraph: {
    title: "PORTAL Blog - AI Development Articles",
    description: "In-depth articles on building AI applications with PORTAL",
    url: "https://portal.ai/blog",
    type: "website",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
