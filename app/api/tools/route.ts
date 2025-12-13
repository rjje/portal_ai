import { streamText, tool, convertToModelMessages } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const modelMessages = convertToModelMessages(messages)

  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: modelMessages,
    tools: {
      getWeather: tool({
        description: "Get the weather for a location",
        parameters: z.object({
          location: z.string().describe("The city and state, e.g. San Francisco, CA"),
        }),
        execute: async ({ location }) => {
          // Mock weather data for demonstration
          const temps = [65, 68, 72, 75, 78, 82]
          const conditions = ["sunny", "partly cloudy", "cloudy", "rainy"]

          return {
            location,
            temperature: temps[Math.floor(Math.random() * temps.length)],
            conditions: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: Math.floor(Math.random() * 40) + 40,
          }
        },
      }),
      calculate: tool({
        description: "Performs mathematical calculations",
        parameters: z.object({
          expression: z.string().describe("The mathematical expression to evaluate, e.g. 2 + 2 or 156 * 23"),
        }),
        execute: async ({ expression }) => {
          try {
            // Simple eval for demo - in production use a proper math parser
            const result = eval(expression)
            return { result, expression }
          } catch (error) {
            return { error: "Invalid expression", expression }
          }
        },
      }),
      searchKnowledge: tool({
        description: "Searches PORTAL documentation and knowledge base",
        parameters: z.object({
          query: z.string().describe("The search query"),
        }),
        execute: async ({ query }) => {
          // Mock knowledge search results
          const topics = {
            "portal ai": "PORTAL AI provides type-safe AI development with multi-provider support.",
            "portal query": "PORTAL Query offers powerful data fetching with caching and real-time updates.",
            "portal form": "PORTAL Form delivers intuitive form management with validation.",
            streaming: "PORTAL supports real-time streaming responses for better UX.",
          }

          const key = Object.keys(topics).find((k) => query.toLowerCase().includes(k))
          const result = key
            ? topics[key as keyof typeof topics]
            : `Documentation for "${query}" is available in the PORTAL knowledge base.`

          return { query, result }
        },
      }),
    },
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
