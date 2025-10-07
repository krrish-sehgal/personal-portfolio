import site from "@/data/site.json";

const Achievements = () => {
  const items = site.achievements || [];
  return (
    <div className="w-full max-w-none">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-3">
          Achievements
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Key milestones and recognitions in my journey
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="rounded-xl border-2 border-primary/70 bg-card p-5 shadow-[0_0_20px_rgba(247,147,26,0.14)]"
          >
            <h3 className="text-lg font-semibold">{it.label}</h3>
            {it.value ? (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {it.value}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
export { Achievements };
