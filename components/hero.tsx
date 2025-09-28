import { BitcoinBackground } from "./bitcoin-background"
import site from "@/data/site.json"

export function Hero() {
  // derive animation intensity into visual tuning (kept subtle)
  const intensity = site.hero?.animationIntensity || "medium"
  const config = {
    opacity: intensity === "low" ? "opacity-40" : intensity === "high" ? "opacity-70" : "opacity-60",
    density: intensity === "low" ? 40 : intensity === "high" ? 80 : 60,
    speed: intensity === "low" ? 0.3 : intensity === "high" ? 0.5 : 0.4,
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <BitcoinBackground
          className={`h-[60vh] w-full ${config.opacity}`}
          density={config.density}
          speed={config.speed}
          network
          coins
          sparkles
          btcSymbols
          nodeCount={28}
          coinCount={10}
          sparkleCount={24}
          symbolCount={16}
        />
      </div>

      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center w-full max-w-none">
        <p className="font-mono text-sm text-muted-foreground">{site.hero.role}</p>
        <h1 className="text-balance mt-4 text-4xl font-bold leading-tight md:text-6xl lg:text-8xl xl:text-9xl w-full">{site.hero.name}</h1>
        <p className="text-pretty mt-4 max-w-6xl text-muted-foreground md:text-lg lg:text-xl xl:text-2xl w-full">{site.hero.tagline}</p>
        <div className="mt-8 flex gap-3">
          <a
            href={site.hero.primaryCta.url}
            className="rounded-md bg-primary px-5 py-2.5 text-primary-foreground transition-colors hover:opacity-90"
            aria-label={site.hero.primaryCta.label}
            target={site.hero.primaryCta.url.startsWith("http") ? "_blank" : undefined}
            rel={site.hero.primaryCta.url.startsWith("http") ? "noreferrer" : undefined}
          >
            {site.hero.primaryCta.label}
          </a>
          {site.hero.secondaryCta?.url ? (
            <a
              href={site.hero.secondaryCta.url}
              className="rounded-md border border-border bg-secondary px-5 py-2.5 text-foreground transition-colors hover:border-primary"
              aria-label={site.hero.secondaryCta.label}
            >
              {site.hero.secondaryCta.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
