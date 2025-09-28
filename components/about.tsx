import Image from "next/image"
import site from "@/data/site.json"

export function About() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 w-full max-w-none">
      <div className="relative aspect-square w-full max-w-none">
        <Image
          src={
            site.profile.headshot.path || "/placeholder.svg?height=600&width=600&query=bitcoin%20developer%20headshot"
          }
          alt={site.profile.headshot.alt || "Profile photo"}
          width={600}
          height={600}
          className="h-full w-full rounded-xl border border-border object-cover"
          priority
        />
      </div>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">About</h2>
        <p className="text-pretty text-muted-foreground leading-relaxed">{site.profile.shortBio}</p>
        <p className="text-pretty text-muted-foreground leading-relaxed">{site.profile.longBio}</p>
        <div className="flex flex-wrap gap-2">
          {site.profile.skills.slice(0, 12).map((s, i) => (
            <span
              key={i}
              className="rounded-md border border-primary/50 bg-secondary px-2.5 py-1 text-xs text-foreground"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={site.hero.primaryCta.url}
            target={site.hero.primaryCta.url.startsWith("http") ? "_blank" : undefined}
            rel={site.hero.primaryCta.url.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-md bg-primary px-5 py-2.5 text-primary-foreground transition-colors hover:opacity-90"
          >
            {site.hero.primaryCta.label}
          </a>
          <a
            href="#links"
            className="rounded-md border border-primary/60 bg-secondary px-5 py-2.5 text-foreground transition-colors hover:border-primary"
          >
            Connect with me
          </a>
        </div>
      </div>
    </div>
  )
}
