"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import { generateCompletion } from "./actions" // This import will change

export default function StreamingExample() {
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleStream = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setOutput("")

    try {
      const result = await generateCompletion(prompt)
      setOutput(result || "No response")
    } catch (err) {
      console.error(err)
      setOutput("Error generating completion")
    } finally {
      setIsGenerating(false)
    }
  }

  const examplePrompts = [
    "Write a creative story about a developer building an AI app",
    "Explain quantum computing in simple terms",
    "Generate a marketing email for a new SaaS product",
    "Create a recipe for chocolate chip cookies with detailed instructions",
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/examples"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Examples
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Text Generation Example</h1>
          <p className="text-xl text-muted-foreground mb-6">
            AI-powered text generation using PORTAL AI with the Vercel AI SDK
          </p>

          <div className="bg-secondary/50 border border-border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Generation Features:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ High-quality text generation</li>
              <li>✓ Configurable parameters</li>
              <li>✓ Multiple model support</li>
              <li>✓ Error handling and validation</li>
            </ul>
          </div>
        </div>

        <Card className="mb-8 p-6">
          <h3 className="font-semibold mb-4">Try Text Generation</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter your prompt:</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What would you like me to generate?"
                className="min-h-[100px]"
                disabled={isGenerating}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleStream}
                disabled={isGenerating || !prompt.trim()}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPrompt("")
                  setOutput("")
                }}
                disabled={isGenerating}
              >
                Clear
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {examplePrompts.map((example, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant="outline"
                  onClick={() => setPrompt(example)}
                  disabled={isGenerating}
                  className="text-xs h-auto py-2 text-left justify-start"
                >
                  {example}
                </Button>
              ))}
            </div>

            {(output || isGenerating) && (
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Generated Output:</label>
                <div className="bg-secondary/50 border border-border rounded-lg p-4 min-h-[200px]">
                  <p className="text-sm whitespace-pre-wrap">
                    {output}
                    {isGenerating && <span className="animate-pulse">▊</span>}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="bg-secondary/30 border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Server Action Implementation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The server action below is responsible for generating text completions. It is defined in
            `app/examples/streaming/actions.ts`.
          </p>
          <pre className="bg-background p-4 rounded overflow-x-auto text-xs">
            <code>
              {`// app/examples/streaming/actions.ts
'use server'

import { generateText } from 'ai'

export async function generateCompletion(prompt: string) {
  try {
    const text = await generateText({
      model: 'openai/gpt-5-mini', // or any other model
      prompt,
      maxOutputTokens: 1000,
      temperature: 0.7,
    })

    return text
  } catch (error: any) {
    console.error('Error generating completion:', error)
    return error.message || 'Failed to generate completion'
  }
}`}
            </code>
          </pre>
        </div>
      </div>
      <Footer />
    </main>
  )
}
