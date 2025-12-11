"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const examples = [
  {
    id: "chatbot",
    title: "AI Chatbot",
    description: "Build a conversational AI chatbot with streaming responses",
    tags: ["Streaming", "Chat", "Production"],
    complexity: "Beginner",
    href: "/examples/chatbot",
    codeSnippet: `const response = await portal.ai({
  model: 'gpt-4',
  messages: [{ role: 'user', content: userInput }],
  stream: true,
})`,
  },
  {
    id: "rag",
    title: "RAG Application",
    description: "Retrieval Augmented Generation with knowledge base",
    tags: ["RAG", "Embeddings", "Advanced"],
    complexity: "Intermediate",
    href: "/examples/rag",
    codeSnippet: `const docs = await retriever.search(query)
const response = await portal.ai({
  model: 'gpt-4',
  tools: [{ name: 'search', function: retriever.search }],
})`,
  },
  {
    id: "agent",
    title: "Research Agent",
    description: "Autonomous agent that researches topics and generates reports",
    tags: ["Agents", "Tools", "Advanced"],
    complexity: "Advanced",
    href: "/examples/agent",
    codeSnippet: `const agent = new Agent({
  tools: [webSearch, dataAnalysis, summarize],
  model: 'gpt-4',
  maxIterations: 10,
})`,
  },
  {
    id: "code-gen",
    title: "Code Generator",
    description: "Generate code from natural language descriptions",
    tags: ["Code", "Generation", "Tools"],
    complexity: "Intermediate",
    href: "/examples/code-gen",
    codeSnippet: `const response = await portal.ai({
  model: 'gpt-4',
  tools: [{ name: 'execute_code', ... }],
  prompt: 'Generate a React component for ...'
})`,
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description: "Analyze datasets and generate insights automatically",
    tags: ["Analysis", "Data", "Tools"],
    complexity: "Intermediate",
    href: "/examples/data-analysis",
    codeSnippet: `const response = await portal.ai({
  model: 'gpt-4',
  tools: [{ name: 'run_python', ... }],
  prompt: 'Analyze this dataset and find patterns'
})`,
  },
  {
    id: "content",
    title: "Content Generation",
    description: "Generate blog posts, emails, and marketing copy",
    tags: ["Content", "Marketing", "Streaming"],
    complexity: "Beginner",
    href: "/examples/content",
    codeSnippet: `const response = await portal.ai({
  model: 'gpt-4',
  stream: true,
  prompt: 'Write a blog post about...'
})`,
  },
]

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Real-World Examples</h1>
          <p className="text-xl text-muted-foreground">Production-ready examples and implementations using PORTAL</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <Link key={example.id} href={example.href}>
              <Card className="p-6 h-full hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold">{example.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      example.complexity === "Beginner"
                        ? "bg-green-500/20 text-green-400"
                        : example.complexity === "Intermediate"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {example.complexity}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{example.description}</p>

                <div className="mb-4">
                  <pre className="bg-secondary p-3 rounded text-xs overflow-x-auto">
                    <code>{example.codeSnippet}</code>
                  </pre>
                </div>

                <div className="flex flex-wrap gap-2">
                  {example.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
