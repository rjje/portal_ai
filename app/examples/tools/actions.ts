"use server"

import { streamText, tool, convertToModelMessages } from "ai"
import { z } from "zod"
import { createStreamableValue } from "ai/rsc"

export async function streamToolChat(messages: any[]) {
  const stream = createStreamableValue()
  ;(async () => {
    const result = await streamText({
      model: "openai/gpt-5-mini",
      messages: convertToModelMessages(messages),
      tools: {
        getWeather: tool({
          description: "Get the weather for a location",
          inputSchema: z.object({
            location: z.string(),
          }),
          execute: async ({ location }) => {
            console.log(`Getting weather for ${location}`)
            return {
              location,
              temperature: 72,
              conditions: "sunny",
            }
          },
        }),
        calculator: tool({
          description: "Perform mathematical calculations",
          inputSchema: z.object({
            operation: z.enum(["add", "subtract", "multiply", "divide"]),
            a: z.number(),
            b: z.number(),
          }),
          execute: async ({ operation, a, b }) => {
            const operations = {
              add: a + b,
              subtract: a - b,
              multiply: a * b,
              divide: b !== 0 ? a / b : "Cannot divide by zero",
            }
            return {
              result: operations[operation],
              expression: `${a} ${operation} ${b} = ${operations[operation]}`,
            }
          },
        }),
        searchKnowledge: tool({
          description: "Search the PORTAL knowledge base",
          inputSchema: z.object({
            query: z.string(),
          }),
          execute: async ({ query }) => {
            return {
              query,
              results: [
                "PORTAL AI provides type-safe tool calling and streaming support.",
                "PORTAL Query makes server state management seamless with automatic caching.",
                "PORTAL Form handles complex form validation with full TypeScript support.",
              ],
            }
          },
        }),
      },
    })

    for await (const chunk of result.textStream) {
      stream.update(chunk)
    }

    stream.done()
  })()

  return stream.value
}
