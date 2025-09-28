import site from "@/data/site.json"

const Achievements = () => {
  const items = site.achievements || []
  return (
    <div className="w-full max-w-none">
      <h2 className="text-3xl font-bold">Achievements</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="rounded-xl border-2 border-primary/70 bg-card p-5 shadow-[0_0_20px_rgba(247,147,26,0.14)]"
          >
            <h3 className="text-lg font-semibold">{it.label}</h3>
            {it.value ? <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.value}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Achievements
export { Achievements }
