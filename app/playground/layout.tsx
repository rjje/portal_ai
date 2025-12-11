import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Playground | PORTAL AI Interactive Testing",
  description:
    "Interactive PORTAL AI playground. Test different models, configure providers, and experiment with streaming, tools, and multi-provider setups.",
  keywords: ["AI playground", "PORTAL playground", "AI testing", "Interactive demo", "Model testing"],
  openGraph: {
    title: "PORTAL Playground - Test AI Models",
    description: "Interactive testing environment for PORTAL AI",
    url: "https://portal.ai/playground",
  },
}

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children
}
