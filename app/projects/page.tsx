import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";

export default function ProjectsPage() {
  return (
    <main>
      <Navbar showNavLinks={false} />
      <section className="w-full max-w-none px-4 py-12 md:py-16">
        <Projects />
      </section>
      <footer className="border-t border-border/60 py-10 text-center text-sm text-muted-foreground">
        {"© "}
        {new Date().getFullYear()}
        {" Krrish Sehgal. Built with Next.js."}
      </footer>
    </main>
  );
}
