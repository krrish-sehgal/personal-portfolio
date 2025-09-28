import site from "@/data/site.json"

export function CareerTimeline() {
  const items = site.timeline || []
  return (
    <div className="w-full max-w-none">
      <h2 className="text-3xl font-bold">Career Timeline</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_3fr] w-full">
        <div className="relative hidden md:block">
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border/70" />
        </div>
        <div className="space-y-6">
          {items.map((item, idx) => (
            <TimelineItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

type Item = {
  title: string
  organization: string
  start: string
  end: string
  summary: string
  highlights?: string[]
  links?: { label: string; url: string }[]
}

function TimelineItem(props: Item) {
  const { title, organization, start, end, summary, highlights = [], links = [] } = props
  const yearLabel = start === end ? start : `${start} – ${end}`
  return (
    <article
      className="relative rounded-xl border-2 border-primary/70 bg-card p-5 shadow-[0_0_20px_rgba(247,147,26,0.14)]"
      aria-label={`Timeline entry for ${yearLabel}`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="rounded bg-accent/20 px-2 py-0.5 font-mono text-accent">{yearLabel}</span>
        <span className="font-mono">Block #{Math.abs(hash(start + title)) % 1_000_000}</span>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{organization}</p>
      <p className="mt-3 leading-relaxed text-foreground">{summary}</p>
      {highlights.length > 0 ? (
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
          {highlights.slice(0, 3).map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      ) : null}
      {links.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-3">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-accent underline hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  )
}

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
  return h
}
