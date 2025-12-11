import type { Metadata } from "next"
import BlogPostClient from "./client"

const blogPosts: Record<string, any> = {
  "type-safe-ai": {
    title: "Building Type-Safe AI Applications with PORTAL",
    date: "2024-01-15",
    author: "Ronald Chu Ming Zu",
    category: "Tutorial",
    readTime: "8 min",
    image: "/type-safe-ai-development.jpg",
  },
  "streaming-responses": {
    title: "Real-Time Streaming Responses: A Complete Guide",
    date: "2024-01-12",
    author: "Ronald Chu Ming Zu",
    category: "Guide",
    readTime: "10 min",
    image: "/streaming-ai-responses.jpg",
  },
  "multi-provider": {
    title: "Multi-Provider AI: OpenAI, Claude, Gemini, and Beyond",
    date: "2024-01-10",
    author: "Ronald Chu Ming Zu",
    category: "Feature",
    readTime: "12 min",
    image: "/multi-provider-ai.jpg",
  },
  "tools-functions": {
    title: "Mastering Tools and Function Calling in PORTAL",
    date: "2024-01-08",
    author: "Ronald Chu Ming Zu",
    category: "Advanced",
    readTime: "15 min",
    image: "/ai-tools-functions.jpg",
  },
  agents: {
    title: "Building Autonomous AI Agents with Agentic Loops",
    date: "2024-01-05",
    author: "Ronald Chu Ming Zu",
    category: "Advanced",
    readTime: "14 min",
    image: "/autonomous-ai-agents.jpg",
  },
  "rag-systems": {
    title: "RAG Systems: Enhancing AI with Knowledge Bases",
    date: "2024-01-03",
    author: "Ronald Chu Ming Zu",
    category: "Tutorial",
    readTime: "11 min",
    image: "/rag-knowledge-retrieval.jpg",
  },
  "production-patterns": {
    title: "Production Patterns: Deploying PORTAL at Scale",
    date: "2024-01-01",
    author: "Ronald Chu Ming Zu",
    category: "Guide",
    readTime: "13 min",
    image: "/production-deployment-scale.jpg",
  },
  "multimodal-ai": {
    title: "Multimodal AI: Text, Images, and Audio with PORTAL",
    date: "2023-12-29",
    author: "Ronald Chu Ming Zu",
    category: "Feature",
    readTime: "9 min",
    image: "/multimodal-ai-media.jpg",
  },
  "cost-optimization": {
    title: "Cost Optimization: Getting More from Your AI Budget",
    date: "2023-12-26",
    author: "Ronald Chu Ming Zu",
    category: "Best Practices",
    readTime: "7 min",
    image: "/cost-optimization-budget.jpg",
  },
  "future-ai": {
    title: "The Future of AI Development: What's Coming in PORTAL",
    date: "2023-12-23",
    author: "Ronald Chu Ming Zu",
    category: "News",
    readTime: "8 min",
    image: "/future-ai-development.jpg",
  },
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const post = blogPosts[params.id]
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | PORTAL Blog`,
    description: `Read "${post.title}" by ${post.author} on the PORTAL blog. ${post.category} - ${post.readTime} read.`,
    keywords: [post.category, "PORTAL", "AI", "Tutorial", post.title],
    openGraph: {
      title: post.title,
      description: `Read "${post.title}" by ${post.author}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
      url: `https://portal.ai/blog/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: `${post.category} by ${post.author}`,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return <BlogPostClient params={params} />
}
