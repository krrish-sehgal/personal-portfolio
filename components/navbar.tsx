"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        scrolled ? "border-b border-border/60" : ""
      }`}
      aria-label="Primary"
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="font-mono text-sm text-muted-foreground hover:text-foreground" aria-label="Go to top">
          {"{ BTC · Portfolio }"}
        </a>
        <div className="flex items-center gap-1">
          <a href="#about">
            <Button variant="ghost" className="text-foreground">
              About
            </Button>
          </a>
          <a href="#timeline">
            <Button variant="ghost" className="text-foreground">
              Timeline
            </Button>
          </a>
          <a href="#achievements">
            <Button variant="ghost" className="text-foreground">
              Achievements
            </Button>
          </a>
          <a href="#links">
            <Button variant="ghost" className="text-foreground">
              Links
            </Button>
          </a>
        </div>
      </nav>
    </header>
  )
}
