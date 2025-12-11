"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const toolCategories = [
  {
    title: "Server Tools",
    description: "Execute backend functions safely with schema validation",
    tools: [
      { name: "Database Queries", icon: "🗄️", desc: "Type-safe database access" },
      { name: "API Calls", icon: "🌐", desc: "Invoke external services" },
      { name: "File Operations", icon: "📁", desc: "Read and write files safely" },
      { name: "Computations", icon: "⚙️", desc: "Heavy processing tasks" },
    ],
  },
  {
    title: "Client Tools",
    description: "User-facing interactions and approvals",
    tools: [
      { name: "UI Components", icon: "🎨", desc: "Render dynamic interfaces" },
      { name: "User Input", icon: "⌨️", desc: "Collect and validate input" },
      { name: "Approvals", icon: "✅", desc: "Request user confirmation" },
      { name: "Notifications", icon: "🔔", desc: "Alert and inform users" },
    ],
  },
  {
    title: "Agentic Loops",
    description: "Autonomous reasoning and execution",
    tools: [
      { name: "Tool Calling", icon: "🔗", desc: "Chain tool executions" },
      { name: "Error Recovery", icon: "🛟", desc: "Handle and recover from errors" },
      { name: "Context Management", icon: "🧠", desc: "Maintain state across calls" },
      { name: "Reasoning Tokens", icon: "💭", desc: "Extended thinking capabilities" },
    ],
  },
]

export default function ToolsShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Advanced Tool System</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tool architecture for building intelligent, responsive AI applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {toolCategories.map((category, idx) => (
            <Card key={idx} className="border border-border">
              <CardHeader>
                <CardTitle className="text-2xl">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition"
                    >
                      <span className="text-xl">{tool.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{tool.name}</p>
                        <p className="text-xs text-muted-foreground">{tool.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
