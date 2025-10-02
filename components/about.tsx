import Image from "next/image"
import site from "@/data/site.json"

export function About() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 w-full max-w-6xl mx-auto">
      <div className="relative w-full max-w-md mx-auto">
        <Image
          src={
            site.profile.headshot.path || "/placeholder.svg?height=400&width=400&query=bitcoin%20developer%20headshot"
          }
          alt={site.profile.headshot.alt || "Profile photo"}
          width={400}
          height={400}
          className="w-full h-auto rounded-2xl border-2 border-[#F7931A]/20 object-cover shadow-xl"
          priority
        />
      </div>
      <div className="space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">About Me</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{site.profile.shortBio}</p>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{site.profile.longBio}</p>
        <div className="flex flex-wrap gap-3">
          {site.profile.skills.slice(0, 12).map((s, i) => (
            <span
              key={i}
              className="rounded-lg border border-[#F7931A]/30 bg-[#F7931A]/10 px-3 py-2 text-sm font-medium text-[#F7931A] hover:bg-[#F7931A]/20 transition-colors"
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
