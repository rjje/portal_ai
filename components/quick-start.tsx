"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function QuickStart() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("https://api.portal.io/v1")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Table of Contents */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Table of Contents</h3>
          <ul className="space-y-2">
            {["Setup", "Endpoints", "Usage", "Rate Limiting", "Examples"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-accent hover:text-accent/80 transition text-sm">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Start Guide */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Start</h3>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Get started with PORTAL API in minutes. Access your data with a simple REST API call.
              </p>

              {/* API Endpoint */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">API Base URL</label>
                <div className="flex gap-2">
                  <code className="flex-1 bg-secondary p-3 rounded text-sm text-foreground border border-border">
                    https://api.portal.io/v1
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="border-border hover:bg-secondary bg-transparent"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">Works with REST clients, SDKs, and custom applications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
