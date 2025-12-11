"use client"

import { notFound } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

const blogPosts: Record<string, any> = {
  "type-safe-ai": {
    title: "Building Type-Safe AI Applications with PORTAL",
    date: "2024-01-15",
    author: "Ronald Chu Ming Zu",
    category: "Tutorial",
    readTime: "8 min",
    image: "/type-safe-ai-development.jpg",
    content: `
## Introduction

Type safety is one of the most valuable features you can have in your AI applications. PORTAL brings TypeScript-first development to the entire AI development lifecycle, ensuring your code is robust, maintainable, and less prone to runtime errors.

## Why Type Safety Matters

When building AI applications, you're dealing with complex data flows between your application and language models. Without type safety, it's easy to:

- Pass incorrectly structured prompts to your models
- Mishandle tool responses
- Create runtime errors in production
- Spend hours debugging subtle type mismatches

PORTAL's type system prevents all of these issues at compile time.

## Getting Started with Type-Safe PORTAL

\`\`\`typescript
import { createAI } from '@portal/sdk'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const portal = createAI({
  model: 'gpt-4',
  messages: [] as Message[],
})
\`\`\`

## Defining Tools with Types

One of the most powerful aspects of PORTAL's type system is how it handles tool definitions:

\`\`\`typescript
const tools = {
  calculateSum: {
    description: 'Add two numbers',
    parameters: {
      a: { type: 'number', description: 'First number' },
      b: { type: 'number', description: 'Second number' },
    },
    execute: (params: { a: number; b: number }) => params.a + params.b,
  },
}
\`\`\`

## Streaming with Type Safety

Streaming is crucial for modern AI apps, and PORTAL keeps your streams fully typed:

\`\`\`typescript
const response = await portal.ai({
  model: 'gpt-4',
  messages: userMessages,
  stream: true,
})

for await (const chunk of response) {
  console.log(chunk.content) // Fully typed!
}
\`\`\`

## Best Practices

1. Define interfaces for your domain objects early
2. Use strict TypeScript settings
3. Leverage inference where possible
4. Test your types with edge cases

## Conclusion

Type safety in PORTAL doesn't just catch bugs—it improves your development experience and makes your code self-documenting.
    `,
  },
  "streaming-responses": {
    title: "Real-Time Streaming Responses: A Complete Guide",
    date: "2024-01-12",
    author: "Ronald Chu Ming Zu",
    category: "Guide",
    readTime: "10 min",
    image: "/streaming-ai-responses.jpg",
    content: `
## Why Streaming Matters

Streaming responses from AI models provides a significantly better user experience. Instead of waiting for the entire response, users see content as it's generated, creating a more interactive and responsive application.

## Implementing Streaming in PORTAL

The simplest way to add streaming to your application:

\`\`\`typescript
const response = await portal.ai({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Write a story' }],
  stream: true,
})

for await (const chunk of response) {
  process.stdout.write(chunk.content)
}
\`\`\`

## Server-Sent Events Integration

PORTAL integrates seamlessly with Server-Sent Events for real-time updates:

\`\`\`typescript
export async function POST(req: Request) {
  const { messages } = await req.json()
  
  return new Response(
    new ReadableStream({
      async start(controller) {
        const response = await portal.ai({
          messages,
          stream: true,
        })
        
        for await (const chunk of response) {
          controller.enqueue(new TextEncoder().encode(JSON.stringify(chunk)))
        }
        controller.close()
      },
    }),
    { headers: { 'Content-Type': 'text/event-stream' } }
  )
}
\`\`\`

## React Integration

Handle streaming in React components with proper cleanup:

\`\`\`typescript
function ChatComponent() {
  const [response, setResponse] = useState('')
  
  const handleStream = async (userInput) => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, userInput] }),
    })
    
    const reader = res.body?.getReader()
    while (true) {
      const { done, value } = await reader?.read() || {}
      if (done) break
      setResponse(prev => prev + new TextDecoder().decode(value))
    }
  }
  
  return <div>{response}</div>
}
\`\`\`

## Performance Optimization

Tips for optimizing streaming performance:

1. Use appropriate chunk sizes
2. Implement backpressure handling
3. Cache partial responses
4. Monitor token usage

## Conclusion

Streaming is essential for modern AI applications. PORTAL makes it simple and efficient.
    `,
  },
  "multi-provider": {
    title: "Multi-Provider AI: OpenAI, Claude, Gemini, and Beyond",
    date: "2024-01-10",
    author: "Ronald Chu Ming Zu",
    category: "Feature",
    readTime: "12 min",
    image: "/multi-provider-ai.jpg",
    content: `
## The Multi-Provider Advantage

Different AI models have different strengths. PORTAL's unified interface lets you:

- Switch providers without rewriting code
- Compare model outputs easily
- Build resilient applications with fallbacks
- Optimize costs by using the right model for each task

## Supported Providers

PORTAL supports all major AI providers out of the box:

- **OpenAI**: GPT-4, GPT-3.5, and more
- **Anthropic**: Claude 3 family
- **Google**: Gemini Pro and Gemini Ultra
- **Ollama**: Local model serving
- **Together AI**: Open source models
- **Custom Providers**: Build your own adapters

## Switching Providers

Changing providers is as simple as updating configuration:

\`\`\`typescript
const portalOpenAI = createPortal({
  provider: 'openai',
  model: 'gpt-4',
})

const portalClaude = createPortal({
  provider: 'anthropic',
  model: 'claude-3-opus',
})
\`\`\`

## Building Provider Agnostic Apps

Design your applications to be provider-agnostic:

\`\`\`typescript
async function generateResponse(content: string, provider?: string) {
  const config = {
    model: provider === 'openai' ? 'gpt-4' : 'claude-3-opus',
    messages: [{ role: 'user', content }],
  }
  
  return await createPortal(config).ai(config)
}
\`\`\`

## Performance Comparison

Compare different providers for your use case:

\`\`\`typescript
const providers = ['openai', 'anthropic', 'google']
const results = await Promise.all(
  providers.map(provider =>
    time(() => createPortal({ provider }).ai({
      messages: testMessages,
    }))
  )
)
\`\`\`

## Cost Optimization Strategy

Use different providers for different scenarios:

- **Claude** for nuanced analysis
- **GPT-4** for general purpose
- **Gemini** for multimodal tasks
- **Local models** for privacy-critical work

## Conclusion

Multi-provider support makes your applications flexible, resilient, and cost-effective.
    `,
  },
  "tools-functions": {
    title: "Mastering Tools and Function Calling in PORTAL",
    date: "2024-01-08",
    author: "Ronald Chu Ming Zu",
    category: "Advanced",
    readTime: "15 min",
    image: "/ai-tools-functions.jpg",
    content: `
## What Are Tools?

Tools (also called functions) allow your AI models to take actions beyond generating text. With tools, your AI can:

- Query databases
- Call external APIs
- Perform calculations
- Execute code
- Interact with any external system

## Defining Tools

PORTAL makes defining tools simple and type-safe:

\`\`\`typescript
const tools = {
  getWeather: {
    description: 'Get current weather for a location',
    parameters: {
      location: { type: 'string', description: 'City name' },
      unit: { type: 'string', enum: ['C', 'F'] },
    },
    execute: async (params) => {
      return await fetchWeather(params.location, params.unit)
    },
  },
}
\`\`\`

## Using Tools with PORTAL

Pass tools to your AI calls:

\`\`\`typescript
const response = await portal.ai({
  model: 'gpt-4',
  messages,
  tools,
})
\`\`\`

## Tool Calling Loop

Implement a loop to handle tool calls:

\`\`\`typescript
async function* executeWithTools(messages, tools) {
  const response = await portal.ai({
    messages,
    tools,
    stream: true,
  })
  
  for await (const chunk of response) {
    if (chunk.toolCall) {
      const tool = tools[chunk.toolCall.name]
      const result = await tool.execute(chunk.toolCall.arguments)
      
      yield {
        toolCall: chunk.toolCall,
        result,
      }
    } else {
      yield chunk
    }
  }
}
\`\`\`

## Advanced Patterns

### Parallel Tool Execution

\`\`\`typescript
const results = await Promise.all(
  toolCalls.map(call => tools[call.name].execute(call.arguments))
)
\`\`\`

### Tool Composition

Build complex tools from simpler ones:

\`\`\`typescript
const complexTool = {
  description: 'Comprehensive data analysis',
  execute: async (params) => {
    const rawData = await fetchData(params.source)
    const processed = await processData(rawData)
    const analysis = await analyzeData(processed)
    return analysis
  },
}
\`\`\`

## Debugging Tools

Track tool execution for debugging:

\`\`\`typescript
const debuggedTools = Object.entries(tools).reduce((acc, [name, tool]) => {
  acc[name] = {
    ...tool,
    execute: async (params) => {
      console.log('Tool called:', name, params)
      const result = await tool.execute(params)
      console.log('Tool result:', result)
      return result
    },
  }
  return acc
}, {})
\`\`\`

## Conclusion

Tools are the key to building intelligent, autonomous systems with PORTAL.
    `,
  },
  agents: {
    title: "Building Autonomous AI Agents with Agentic Loops",
    date: "2024-01-05",
    author: "Ronald Chu Ming Zu",
    category: "Advanced",
    readTime: "14 min",
    image: "/autonomous-ai-agents.jpg",
    content: `
## What Are AI Agents?

AI agents are systems that can perceive their environment, make decisions, and take actions autonomously. PORTAL makes building agents straightforward.

## The Agentic Loop

The core pattern for agents:

1. Observe environment state
2. Think about the problem
3. Plan next actions
4. Execute actions
5. Observe results
6. Repeat until goal achieved

## Implementing an Agent

\`\`\`typescript
async function* agent(goal, tools, maxIterations = 10) {
  let state = { goal, messages: [] }
  let iterations = 0
  
  while (iterations < maxIterations) {
    const response = await portal.ai({
      messages: state.messages,
      tools,
      system: \`Help the user: \${goal}\`,
    })
    
    state.messages.push({ role: 'assistant', content: response })
    yield state
    
    if (!response.toolCall) break
    
    const tool = tools[response.toolCall.name]
    const result = await tool.execute(response.toolCall.arguments)
    state.messages.push({ role: 'user', content: JSON.stringify(result) })
    
    iterations++
  }
}
\`\`\`

## Advanced Agent Patterns

### Memory Management

\`\`\`typescript
class Agent {
  private shortTermMemory = []
  private longTermMemory = new Map()
  
  async execute(goal) {
    const relevant = await this.retrieveMemory(goal)
    const messages = [...relevant, ...this.shortTermMemory]
    
    const response = await portal.ai({ messages })
    this.shortTermMemory.push(response)
    
    if (this.shortTermMemory.length > 5) {
      await this.consolidateMemory()
    }
  }
}
\`\`\`

### Multi-Agent Collaboration

\`\`\`typescript
async function multiAgentSystem(goal) {
  const researcher = new Agent('research', researchTools)
  const analyst = new Agent('analyze', analysisTools)
  const writer = new Agent('write', writingTools)
  
  const research = await researcher.execute(goal)
  const analysis = await analyst.execute(research)
  const output = await writer.execute(analysis)
  
  return output
}
\`\`\`

## Error Handling and Recovery

\`\`\`typescript
async function robustAgent(goal, tools) {
  try {
    return await agent(goal, tools)
  } catch (error) {
    console.error('Agent error:', error)
    // Implement recovery strategy
    return await agent(\`\${goal} (retry)\`, tools)
  }
}
\`\`\`

## Monitoring Agents

Track agent behavior:

\`\`\`typescript
const monitoring = {
  iterations: 0,
  toolCalls: [],
  timeElapsed: 0,
  successRate: 0,
}
\`\`\`

## Conclusion

Agents represent the frontier of AI application development. PORTAL provides the tools to build them effectively.
    `,
  },
  "rag-systems": {
    title: "RAG Systems: Enhancing AI with Knowledge Bases",
    date: "2024-01-03",
    author: "Ronald Chu Ming Zu",
    category: "Tutorial",
    readTime: "11 min",
    image: "/rag-knowledge-retrieval.jpg",
    content: `
## What is RAG?

Retrieval Augmented Generation (RAG) combines retrieval with generation:

1. **Retrieve** relevant documents from a knowledge base
2. **Augment** the prompt with retrieved documents
3. **Generate** responses based on both the query and documents

## Why RAG?

RAG solves several critical problems:

- Outdated training data
- Domain-specific knowledge
- Hallucination reduction
- Verifiable sources

## Implementing RAG with PORTAL

\`\`\`typescript
async function ragQuery(userQuery, knowledge) {
  // 1. Retrieve relevant documents
  const relevant = await knowledge.search(userQuery, { topK: 5 })
  
  // 2. Build augmented prompt
  const augmented = \`
    Here is relevant information:
    \${relevant.map(doc => doc.content).join('\\n')}
    
    User question: \${userQuery}
  \`
  
  // 3. Generate response
  return await portal.ai({
    messages: [{ role: 'user', content: augmented }],
  })
}
\`\`\`

## Building a Knowledge Base

\`\`\`typescript
class KnowledgeBase {
  private embeddings = new Map()
  
  async index(documents) {
    for (const doc of documents) {
      const embedding = await generateEmbedding(doc.content)
      this.embeddings.set(doc.id, embedding)
    }
  }
  
  async search(query, options = {}) {
    const queryEmbedding = await generateEmbedding(query)
    const similarities = Array.from(this.embeddings.entries())
      .map(([id, emb]) => ({
        id,
        similarity: cosineSimilarity(queryEmbedding, emb),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, options.topK || 5)
    
    return similarities
  }
}
\`\`\`

## Advanced RAG Techniques

### Hybrid Retrieval

Combine semantic and keyword search:

\`\`\`typescript
async function hybridSearch(query, kb) {
  const semantic = await kb.semanticSearch(query)
  const keyword = await kb.keywordSearch(query)
  
  return merge(semantic, keyword)
}
\`\`\`

### Contextual Compression

Reduce noise in retrieved documents:

\`\`\`typescript
async function compress(documents, query) {
  return await portal.ai({
    messages: [{
      role: 'user',
      content: \`Summarize these documents in context of: \${query}\`,
    }],
    system: 'Be concise and relevant',
  })
}
\`\`\`

## Conclusion

RAG is essential for building grounded, reliable AI systems.
    `,
  },
  "production-patterns": {
    title: "Production Patterns: Deploying PORTAL at Scale",
    date: "2024-01-01",
    author: "Ronald Chu Ming Zu",
    category: "Guide",
    readTime: "13 min",
    image: "/production-deployment-scale.jpg",
    content: `
## Critical Production Considerations

Deploying PORTAL applications to production requires careful planning:

- Error handling and recovery
- Rate limiting and quotas
- Monitoring and observability
- Cost management
- Data privacy and security

## Error Handling

Implement comprehensive error handling:

\`\`\`typescript
async function robustCall(fn, options = {}) {
  const maxRetries = options.maxRetries || 3
  const backoff = options.backoff || exponentialBackoff
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      
      const delay = backoff(i)
      await sleep(delay)
    }
  }
}
\`\`\`

## Rate Limiting

Protect against API limits:

\`\`\`typescript
class RateLimiter {
  private tokens = 100
  private refillRate = 1 // tokens per second
  private lastRefill = Date.now()
  
  async acquire() {
    const now = Date.now()
    const elapsed = (now - this.lastRefill) / 1000
    this.tokens = Math.min(
      100,
      this.tokens + elapsed * this.refillRate
    )
    
    if (this.tokens < 1) {
      await sleep((1 - this.tokens) / this.refillRate * 1000)
    }
    this.tokens--
  }
}
\`\`\`

## Monitoring

Track application health:

\`\`\`typescript
const metrics = {
  aiCalls: 0,
  avgLatency: 0,
  errors: 0,
  cost: 0,
}

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name.startsWith('portal.ai')) {
      metrics.aiCalls++
      metrics.avgLatency = (metrics.avgLatency + entry.duration) / 2
    }
  }
})
\`\`\`

## Cost Management

\`\`\`typescript
class CostTracker {
  private costs = new Map([
    ['gpt-4', { input: 0.03, output: 0.06 }],
    ['gpt-3.5-turbo', { input: 0.0005, output: 0.0015 }],
  ])
  
  calculateCost(model, inputTokens, outputTokens) {
    const rates = this.costs.get(model)
    return inputTokens * rates.input + outputTokens * rates.output
  }
}
\`\`\`

## Deployment Checklist

- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] Monitoring in place
- [ ] Cost tracking enabled
- [ ] Security audit complete
- [ ] Load testing done
- [ ] Rollback plan ready

## Conclusion

Production-grade PORTAL applications require attention to detail and planning.
    `,
  },
  "multimodal-ai": {
    title: "Multimodal AI: Text, Images, and Audio with PORTAL",
    date: "2023-12-29",
    author: "Ronald Chu Ming Zu",
    category: "Feature",
    readTime: "9 min",
    image: "/multimodal-ai-media.jpg",
    content: `
## Multimodal Understanding

Modern AI models can process multiple modalities:

- Text
- Images
- Audio
- Video

PORTAL provides unified access to these capabilities.

## Working with Images

\`\`\`typescript
const response = await portal.ai({
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Describe this image' },
      { type: 'image', url: 'https://example.com/image.jpg' },
    ],
  }],
})
\`\`\`

## Audio Processing

\`\`\`typescript
const audioFile = await fs.readFile('audio.mp3')
const base64 = audioFile.toString('base64')

const response = await portal.ai({
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Transcribe and summarize' },
      { type: 'audio', data: base64, format: 'mp3' },
    ],
  }],
})
\`\`\`

## Video Analysis

\`\`\`typescript
const frames = await extractFrames('video.mp4', { fps: 1 })

const response = await portal.ai({
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'What happens in this video?' },
      ...frames.map(frame => ({ type: 'image', data: frame })),
    ],
  }],
})
\`\`\`

## Best Practices

1. Compress media before sending
2. Use appropriate formats
3. Optimize for model capabilities
4. Cache results when possible

## Conclusion

Multimodal capabilities open new possibilities for AI applications.
    `,
  },
  "cost-optimization": {
    title: "Cost Optimization: Getting More from Your AI Budget",
    date: "2023-12-26",
    author: "Ronald Chu Ming Zu",
    category: "Best Practices",
    readTime: "7 min",
    image: "/cost-optimization-budget.jpg",
    content: `
## Understanding AI Costs

AI API costs are based on:

- Tokens (input and output)
- Request frequency
- Model complexity
- Provider pricing

## Cost Reduction Strategies

### 1. Model Selection

Use cheaper models when possible:

\`\`\`typescript
// For simple tasks
const simpleModel = 'gpt-3.5-turbo'

// For complex tasks
const advancedModel = 'gpt-4'
\`\`\`

### 2. Prompt Optimization

Shorter prompts = lower costs:

\`\`\`typescript
// Bad: 1000 tokens
const badPrompt = \`
  You are an expert...[long context]
\`

// Good: 100 tokens
const goodPrompt = \`Summarize this text:\`
\`\`\`

### 3. Caching

Cache frequently used requests:

\`\`\`typescript
const cache = new Map()

async function cachedAI(key, fn) {
  if (cache.has(key)) {
    return cache.get(key)
  }
  
  const result = await fn()
  cache.set(key, result)
  return result
}
\`\`\`

### 4. Batch Processing

Process multiple requests together:

\`\`\`typescript
async function batchProcess(items) {
  const batches = chunk(items, 10)
  
  return Promise.all(
    batches.map(batch =>
      portal.ai({ messages: batch })
    )
  )
}
\`\`\`

## Monitoring Costs

Track spending:

\`\`\`typescript
class BudgetMonitor {
  private spent = 0
  private limit = 100
  
  async track(cost) {
    this.spent += cost
    if (this.spent > this.limit) {
      throw new Error('Budget exceeded')
    }
  }
}
\`\`\`

## Conclusion

Smart cost management makes AI accessible at any scale.
    `,
  },
  "future-ai": {
    title: "The Future of AI Development: What's Coming in PORTAL",
    date: "2023-12-23",
    author: "Ronald Chu Ming Zu",
    category: "News",
    readTime: "8 min",
    image: "/future-ai-development.jpg",
    content: `
## Upcoming Features

PORTAL has exciting developments on the roadmap:

### Native Vision Models

Better image understanding and generation:

\`\`\`typescript
const image = await portal.generate.image({
  prompt: 'A beautiful sunset',
  model: 'dall-e-4',
})
\`\`\`

### Extended Context Windows

Larger models with bigger context:

\`\`\`typescript
const response = await portal.ai({
  model: 'gpt-4-extended',
  messages, // Up to 200k tokens!
})
\`\`\`

### Built-in Fine-Tuning

Optimize models for your use case:

\`\`\`typescript
await portal.finetune({
  model: 'gpt-3.5-turbo',
  trainingData: dataset,
  epochs: 3,
})
\`\`\`

### Real-time Collaboration

Agents and humans working together:

\`\`\`typescript
const collab = await portal.collaborate({
  agent: researchAgent,
  human: userInput,
})
\`\`\`

## Community and Feedback

We're building PORTAL with our community. Your feedback shapes our roadmap.

- GitHub Discussions
- Community Forums
- Weekly Office Hours
- Feedback Surveys

## Vision

We believe the future of software is AI-assisted. PORTAL is building the infrastructure for this future.

## Get Involved

- Contribute to PORTAL
- Share your projects
- Participate in discussions
- Help improve documentation

## Conclusion

The future of AI development is collaborative, accessible, and powerful. PORTAL is here to support it.
    `,
  },
}

export default function BlogPostClient({
  post,
  params,
}: {
  post: any
  params: { id: string }
}) {
  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/blog" className="text-primary hover:underline mb-4 block">
            ← Back to Blog
          </Link>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{post.author}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{post.readTime}</span>
          </div>
        </div>

        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full rounded-lg mb-12 aspect-video object-cover"
        />

        <div className="prose prose-invert max-w-none space-y-6">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("##")) {
              return (
                <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }
            if (paragraph.startsWith("```")) {
              const language = paragraph.split("\n")[0].replace("```", "")
              const code = paragraph.split("\n").slice(1, -1).join("\n")
              return (
                <pre key={idx} className="bg-secondary p-4 rounded overflow-x-auto">
                  <code className={`language-${language}`}>{code}</code>
                </pre>
              )
            }
            return (
              <p key={idx} className="text-foreground leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  )
}
