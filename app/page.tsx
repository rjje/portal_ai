import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Features from "@/components/features"
import ToolsShowcase from "@/components/tools-showcase"
import Adapters from "@/components/adapters"
import CodeExamples from "@/components/code-examples"
import Resources from "@/components/resources"
import Footer from "@/components/footer"

export const metadata = {
  title: "PORTAL: PROJECT OPERATION TECHNOLOGY ANYWHERE LIBRARY | Type-Safe AI SDK",
  description:
    "Advanced AI development library by PORTAL INTERNATIONAL LLC (Ronald Chu Ming Zu). Build production-grade type-safe AI applications with streaming, multi-provider support, tools, agents, RAG, and enterprise integrations.",
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "PORTAL - Advanced AI Development Library",
            description:
              "Type-safe, production-ready AI development framework with streaming, multi-provider support, and agentic capabilities",
            url: "https://portal.ai",
            image: "https://portal.ai/og-image.jpg",
            publisher: {
              "@type": "Organization",
              name: "PORTAL International LLC",
              logo: "https://portal.ai/logo.png",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://portal.ai",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Docs",
                  item: "https://portal.ai/docs",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Blog",
                  item: "https://portal.ai/blog",
                },
              ],
            },
          }),
        }}
      />
      <main className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <Features />
        <ToolsShowcase />
        <Adapters />
        <CodeExamples />
        <Resources />
        <Footer />
      </main>
    </>
  )
}
