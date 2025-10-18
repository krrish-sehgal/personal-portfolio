"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  showNavLinks?: boolean;
}

export function Navbar({ showNavLinks = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#timeline", label: "Timeline" },
    { href: "#projects", label: "Projects" },
    { href: "#open-source", label: "Open Source" },
    { href: "#achievements", label: "Achievements" },
    { href: "#links", label: "Links" },
  ];

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
          <>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className="text-foreground hover:text-[#F7931A] hover:border-[#F7931A] border border-transparent transition-all"
                  >
                    {link.label}
                  </Button>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:text-[#F7931A] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </>
        )}
      </nav>

      {/* Mobile Navigation Menu */}
      {showNavLinks && mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-md text-foreground hover:text-[#F7931A] hover:bg-[#F7931A]/10 transition-all border border-transparent hover:border-[#F7931A]/30"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
