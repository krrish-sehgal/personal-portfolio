import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { CareerTimeline } from "@/components/timeline";
import { ProjectsPreview } from "@/components/projects-preview";
import { OpenSourcePreview } from "@/components/open-source-preview";
import { Achievements } from "@/components/achievements";
import { ImportantLinks } from "@/components/links";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section id="about" className="w-full max-w-none px-4 py-12 md:py-16">
        <About />
      </section>
      <section id="timeline" className="w-full max-w-none px-4 py-12 md:py-16">
        <CareerTimeline />
      </section>
      <section
        id="projects"
        className="w-full max-w-none px-4 py-12 md:py-16 bg-muted/30"
      >
        <ProjectsPreview />
      </section>
      <section id="open-source" className="w-full max-w-none">
        <OpenSourcePreview />
      </section>
      <section
        id="achievements"
        className="w-full max-w-none px-4 py-12 md:py-16"
      >
        <Achievements />
      </section>
      <section id="links" className="w-full max-w-none px-4 py-12 md:py-16">
        <ImportantLinks />
      </section>
      <footer className="border-t border-border/60 py-10 text-center text-sm text-muted-foreground">
        {"© "}
        {new Date().getFullYear()}
        {" Krrish Sehgal. Built with Next.js."}
      </footer>
    </main>
  );
}
