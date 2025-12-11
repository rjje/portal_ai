"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">◆</span>
            </div>
            <span className="font-bold text-lg text-foreground">PORTAL</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition">
              Docs
            </Link>
            <Link href="/playground" className="text-sm text-muted-foreground hover:text-foreground transition">
              Playground
            </Link>
            <Link href="/examples" className="text-sm text-muted-foreground hover:text-foreground transition">
              Examples
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition">
              Blog
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-border hover:bg-secondary bg-transparent">
              Sign In
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <Link
              href="/docs"
              className="block text-sm text-muted-foreground hover:text-foreground transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/playground"
              className="block text-sm text-muted-foreground hover:text-foreground transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Playground
            </Link>
            <Link
              href="/examples"
              className="block text-sm text-muted-foreground hover:text-foreground transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Examples
            </Link>
            <Link
              href="/blog"
              className="block text-sm text-muted-foreground hover:text-foreground transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <div className="border-t border-border pt-3 space-y-3">
              <Button variant="outline" size="sm" className="w-full border-border hover:bg-secondary bg-transparent">
                Sign In
              </Button>
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
