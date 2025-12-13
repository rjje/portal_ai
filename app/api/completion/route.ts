import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { prompt, model = "openai/gpt-5-mini", temperature = 0.7, maxTokens = 1000 } = await req.json()

  try {
    const { text } = await generateText({
      model,
      prompt,
      maxTokens,
      temperature,
      abortSignal: req.signal,
    })

    return Response.json({ text, success: true })
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Generation failed",
        success: false,
      },
      { status: 500 },
    )
  }
}
