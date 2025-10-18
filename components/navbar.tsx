"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  showNavLinks?: boolean;
}

export function Navbar({ showNavLinks = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        scrolled ? "border-b border-border/60" : ""
      }`}
      aria-label="Primary"
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <a
          href="/"
          className="group flex items-center gap-2 font-mono text-sm font-medium transition-all hover:scale-105"
          aria-label="Go to home"
        >
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-[#F7931A] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12h18M3 12l6-6m-6 6l6 6"
            />
          </svg>
          <span className="text-foreground group-hover:text-[#F7931A] transition-colors">
            {"{ BTC · Portfolio }"}
          </span>
        </a>
        {showNavLinks && (
          <div className="flex items-center gap-1">
            <a href="#about">
              <Button
                variant="ghost"
                className="text-foreground hover:text-[#F7931A] hover:border-[#F7931A] border border-transparent transition-all"
              >
                About
              </Button>
            </a>
            <a href="#timeline">
              <Button
                variant="ghost"
                className="text-foreground hover:text-[#F7931A] hover:border-[#F7931A] border border-transparent transition-all"
              >
                Timeline
              </Button>
            </a>
            <a href="#projects">
              <Button
                variant="ghost"
                className="text-foreground hover:text-[#F7931A] hover:border-[#F7931A] border border-transparent transition-all"
              >
                Projects
              </Button>
            </a>
            <a href="#open-source">
              <Button
                variant="ghost"
                className="text-foreground hover:text-[#F7931A] hover:border-[#F7931A] border border-transparent transition-all"
              >
                Open Source
              </Button>
            </a>
            <a href="#achievements">
              <Button
                variant="ghost"
                className="text-foreground hover:text-[#F7931A] hover:border-[#F7931A] border border-transparent transition-all"
              >
                Achievements
              </Button>
            </a>
            <a href="#links">
              <Button
                variant="ghost"
                className="text-foreground hover:text-[#F7931A] hover:border-[#F7931A] border border-transparent transition-all"
              >
                Links
              </Button>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
