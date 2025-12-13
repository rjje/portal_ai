"use server"

import { generateText } from "ai"

export async function generateCompletion(prompt: string) {
  try {
    const text = await generateText({
      model: "openai/gpt-5-mini", // or any other model
      prompt,
      maxOutputTokens: 1000,
      temperature: 0.7,
    })

    return text
  } catch (error: any) {
    console.error("Error generating completion:", error)
    return error.message || "Failed to generate completion"
  }
}
