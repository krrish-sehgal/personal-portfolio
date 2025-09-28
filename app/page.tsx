import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { CareerTimeline } from "@/components/timeline"
import { Achievements } from "@/components/achievements"
import { ImportantLinks } from "@/components/links"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section id="about" className="w-full max-w-none px-4 py-16 md:py-24">
        <About />
      </section>
      <section id="timeline" className="w-full max-w-none px-4 py-16 md:py-24">
        <CareerTimeline />
      </section>
      <section id="achievements" className="w-full max-w-none px-4 py-16 md:py-24">
        <Achievements />
      </section>
      <section id="links" className="w-full max-w-none px-4 py-16 md:py-24">
        <ImportantLinks />
      </section>
      <footer className="border-t border-border/60 py-10 text-center text-sm text-muted-foreground">
        {"© "}
        {new Date().getFullYear()}
        {" Your Name. Built with Next.js."}
      </footer>
    </main>
  )
}
