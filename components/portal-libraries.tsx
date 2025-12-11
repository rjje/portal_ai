"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const libraries = [
  {
    name: "PORTAL AI",
    status: "alpha",
    description: "Powerful, type-safe AI SDK with unified provider interface",
    features: ["Type-safe tool calling", "Streaming support", "Multi-provider support", "Approval flows"],
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "PORTAL Query",
    status: "stable",
    description: "Async state management and server-state utilities",
    features: ["Caching", "Synchronization", "Background updates", "DevTools"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "PORTAL Form",
    status: "stable",
    description: "Type-safe form state management",
    features: ["Validation", "Error handling", "Field arrays", "Full TypeScript"],
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "PORTAL Router",
    status: "stable",
    description: "Type-safe routing for React applications",
    features: ["Search params", "Loaders", "File-based routing", "Code splitting"],
    color: "from-orange-500 to-red-500",
  },
  {
    name: "PORTAL Store",
    status: "alpha",
    description: "Reactive framework-agnostic data store",
    features: ["Immutable updates", "Subscriptions", "DevTools", "Framework adapters"],
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "PORTAL Table",
    status: "stable",
    description: "Headless UI for building powerful tables",
    features: ["Sorting", "Filtering", "Pagination", "Column visibility"],
    color: "from-indigo-500 to-blue-500",
  },
]

const statusColors = {
  alpha: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  beta: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  stable: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

export default function PortalLibraries() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built on PORTAL Universe</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            PORTAL integrates the best libraries from the PORTAL Universe to provide a powerful, type-safe AI
            development platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraries.map((lib) => (
            <Card key={lib.name} className="border border-border hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-xl">{lib.name}</CardTitle>
                    <CardDescription>{lib.description}</CardDescription>
                  </div>
                </div>
                <Badge className={statusColors[lib.status as keyof typeof statusColors]}>{lib.status}</Badge>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lib.features.map((feature) => (
                    <li key={feature} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 bg-card border border-border rounded-lg">
          <h3 className="text-xl font-bold mb-4">Integration Highlights</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">✓</span>
              <span>
                <strong>AI-Powered Chat:</strong> PORTAL AI for type-safe tool calling and streaming
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">✓</span>
              <span>
                <strong>Real-time Updates:</strong> PORTAL Query for cache management and background syncing
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">✓</span>
              <span>
                <strong>Form Handling:</strong> PORTAL Form for validated, type-safe forms
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">✓</span>
              <span>
                <strong>State Management:</strong> PORTAL Store for reactive data across the app
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
