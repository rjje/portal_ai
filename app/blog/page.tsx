"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const blogPosts = [
  {
    id: "type-safe-ai",
    title: "Building Type-Safe AI Applications with PORTAL",
    excerpt: "Learn how type safety in PORTAL ensures your AI applications are robust and maintainable from the start.",
    date: "2024-01-15",
    author: "Ronald Chu Ming Zu",
    readTime: "8 min",
    category: "Tutorial",
    image: "/type-safe-ai-development.jpg",
  },
  {
    id: "streaming-responses",
    title: "Real-Time Streaming Responses: A Complete Guide",
    excerpt: "Explore how to implement efficient streaming responses for real-time AI interactions with your users.",
    date: "2024-01-12",
    author: "Ronald Chu Ming Zu",
    readTime: "10 min",
    category: "Guide",
    image: "/streaming-ai-responses.jpg",
  },
  {
    id: "multi-provider",
    title: "Multi-Provider AI: OpenAI, Claude, Gemini, and Beyond",
    excerpt: "Switch between AI providers seamlessly using PORTAL's unified interface and tooling.",
    date: "2024-01-10",
    author: "Ronald Chu Ming Zu",
    readTime: "12 min",
    category: "Feature",
    image: "/multi-provider-ai.jpg",
  },
  {
    id: "tools-functions",
    title: "Mastering Tools and Function Calling in PORTAL",
    excerpt: "Deep dive into how tools enable your AI to take actions and interact with external systems.",
    date: "2024-01-08",
    author: "Ronald Chu Ming Zu",
    readTime: "15 min",
    category: "Advanced",
    image: "/ai-tools-functions.jpg",
  },
  {
    id: "agents",
    title: "Building Autonomous AI Agents with Agentic Loops",
    excerpt: "Create intelligent agents that can plan, execute, and iterate towards complex goals automatically.",
    date: "2024-01-05",
    author: "Ronald Chu Ming Zu",
    readTime: "14 min",
    category: "Advanced",
    image: "/autonomous-ai-agents.jpg",
  },
  {
    id: "rag-systems",
    title: "RAG Systems: Enhancing AI with Knowledge Bases",
    excerpt: "Implement Retrieval Augmented Generation to ground your AI in domain-specific knowledge.",
    date: "2024-01-03",
    author: "Ronald Chu Ming Zu",
    readTime: "11 min",
    category: "Tutorial",
    image: "/rag-knowledge-retrieval.jpg",
  },
  {
    id: "production-patterns",
    title: "Production Patterns: Deploying PORTAL at Scale",
    excerpt: "Best practices for deploying PORTAL applications in production environments with high reliability.",
    date: "2024-01-01",
    author: "Ronald Chu Ming Zu",
    readTime: "13 min",
    category: "Guide",
    image: "/production-deployment-scale.jpg",
  },
  {
    id: "multimodal-ai",
    title: "Multimodal AI: Text, Images, and Audio with PORTAL",
    excerpt: "Explore how PORTAL supports multimodal inputs and outputs for richer AI interactions.",
    date: "2023-12-29",
    author: "Ronald Chu Ming Zu",
    readTime: "9 min",
    category: "Feature",
    image: "/multimodal-ai-media.jpg",
  },
  {
    id: "cost-optimization",
    title: "Cost Optimization: Getting More from Your AI Budget",
    excerpt: "Strategies for reducing API costs while maintaining quality in your PORTAL applications.",
    date: "2023-12-26",
    author: "Ronald Chu Ming Zu",
    readTime: "7 min",
    category: "Best Practices",
    image: "/cost-optimization-budget.jpg",
  },
  {
    id: "future-ai",
    title: "The Future of AI Development: What's Coming in PORTAL",
    excerpt: "Insights into upcoming features and the roadmap for next-generation AI applications.",
    date: "2023-12-23",
    author: "Ronald Chu Ming Zu",
    readTime: "8 min",
    category: "News",
    image: "/future-ai-development.jpg",
  },
]

const categories = ["All", ...new Set(blogPosts.map((p) => p.category))]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")

  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PORTAL Blog</h1>
          <p className="text-xl text-muted-foreground">Insights, tutorials, and updates from the PORTAL team</p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="overflow-hidden h-full hover:border-primary transition-colors cursor-pointer">
                <div className="aspect-video relative bg-secondary overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
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

import React from "react"
