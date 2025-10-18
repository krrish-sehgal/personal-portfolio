import { Suspense } from "react";
import OpenSourceDashboard from "@/components/open-source-dashboard";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Open Source – Bitcoin Contributions",
  description:
    "Dashboard of GitHub pull requests and contributions, categorized by type and organization, with Bitcoin-themed charts.",
};

export default function OpenSourcePage() {
  return (
    <main className={cn("relative bg-background text-foreground min-h-screen")}>
      <Navbar showNavLinks={false} />

      <section className="container mx-auto px-4 py-10 md:py-14 max-w-7xl overflow-x-hidden">
        <header className="mb-8 md:mb-10">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Open Source Contributions
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Live GitHub stats for{" "}
            <span className="font-medium">krrish-sehgal</span> — PRs categorized
            by type, organization breakdown, and monthly activity.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#F7931A]" />
              <p className="text-muted-foreground">Loading dashboard…</p>
            </div>
          }
        >
          <OpenSourceDashboard username="krrish-sehgal" />
        </Suspense>
      </section>
    </main>
  );
}
