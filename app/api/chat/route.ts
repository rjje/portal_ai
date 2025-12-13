import { streamText, convertToModelMessages } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const modelMessages = convertToModelMessages(messages)

  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: modelMessages,
    maxTokens: 2000,
    temperature: 0.7,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
