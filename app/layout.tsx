import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PORTAL: PROJECT OPERATION TECHNOLOGY ANYWHERE LIBRARY | Type-Safe AI SDK",
  description:
    "PORTAL - Advanced AI development library by PORTAL INTERNATIONAL LLC (Ronald Chu Ming Zu). Build production-grade type-safe AI applications with streaming, multi-provider support, tools, agents, RAG, and enterprise integrations. Open source TypeScript framework for modern AI development.",
  keywords: [
    "AI SDK",
    "Type-Safe AI",
    "Streaming API",
    "Tool Calling",
    "Multi-Provider AI",
    "Open Source",
    "TypeScript",
    "LLM Framework",
    "AI Development",
    "Agent Framework",
    "RAG Systems",
    "Claude AI",
    "OpenAI Integration",
    "Agentic Loops",
    "AI Platform",
  ],
  authors: [
    {
      name: "Ronald Chu Ming Zu",
      url: "https://portal.ai",
    },
    {
      name: "PORTAL International LLC",
    },
  ],
  creator: "PORTAL International LLC",
  publisher: "PORTAL International LLC",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portal.ai",
    title: "PORTAL - The Complete AI Development Library",
    description:
      "Build intelligent applications with type-safe tools, streaming, and multi-provider support across OpenAI, Anthropic, Google, and more.",
    siteName: "PORTAL - PROJECT OPERATION TECHNOLOGY ANYWHERE LIBRARY",
    images: [
      {
        url: "https://portal.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PORTAL AI Development Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PORTAL - Advanced AI Development Framework",
    description: "Type-safe, production-ready AI development library",
    creator: "@PortalAI",
    images: ["https://portal.ai/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://portal.ai",
  },
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  category: "Technology",
    generator: 'v0.app'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PORTAL: PROJECT OPERATION TECHNOLOGY ANYWHERE LIBRARY",
              description:
                "Advanced type-safe AI development library with streaming, multi-provider support, and agent capabilities",
              url: "https://portal.ai",
              applicationCategory: "DeveloperApplication",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "250",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "PORTAL International LLC",
                url: "https://portal.ai",
              },
              creator: {
                "@type": "Person",
                name: "Ronald Chu Ming Zu",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PORTAL International LLC",
              url: "https://portal.ai",
              logo: "https://portal.ai/logo.png",
              description: "PORTAL INTERNATIONAL LLC - Advanced AI development platform and library",
              founder: {
                "@type": "Person",
                name: "Ronald Chu Ming Zu",
              },
              sameAs: ["https://github.com/portal", "https://twitter.com/PortalAI"],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
