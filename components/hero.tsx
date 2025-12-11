"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-15"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-6 inline-block">
          <span className="text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full">
            ✨ PORTAL: PROJECT OPERATION TECHNOLOGY ANYWHERE LIBRARY
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
          The Complete AI Development Library
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
          Build production-grade AI applications with type-safe tools, streaming responses, multi-provider support, and
          enterprise-grade integrations. Everything you need for intelligent applications, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-foreground font-semibold">
            Get Started Now
          </Button>
          <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
            Explore Documentation
          </Button>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground mb-6">Trusted by developers and enterprises</p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              TypeScript First
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Framework Agnostic
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Zero Vendor Lock-in
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Open Source
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
