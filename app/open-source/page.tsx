import { Suspense } from "react"
import OpenSourceDashboard from "@/components/open-source-dashboard"
import { cn } from "@/lib/utils"
import BitcoinBackground from "@/components/bitcoin-background"
import { Navbar } from "@/components/navbar"

export const metadata = {
  title: "Open Source – Bitcoin Contributions",
  description:
    "Dashboard of GitHub pull requests and contributions, categorized by type and organization, with Bitcoin-themed charts.",
}

export default function OpenSourcePage() {
  return (
    <main className={cn("relative min-h-[100svh] bg-background text-foreground")}>
      <Navbar showNavLinks={false} />
      {/* Decorative background (respects reduced motion if your component implements it) */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        {/* If BitcoinBackground exposes props, you can tweak intensity here */}
        <BitcoinBackground />
      </div>

      <section className="container mx-auto px-4 py-10 md:py-14">
        <header className="mb-8 md:mb-10">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Open Source Contributions</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Live GitHub stats for <span className="font-medium">krrish-sehgal</span> — PRs categorized by type,
            organization breakdown, and monthly activity.
          </p>
        </header>

        <Suspense fallback={<div className="text-muted-foreground">Loading dashboard…</div>}>
          <OpenSourceDashboard username="krrish-sehgal" />
        </Suspense>
      </section>
    </main>
  )
}
