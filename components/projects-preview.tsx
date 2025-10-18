"use client";

import site from "@/data/site.json";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProjectsPreview() {
  const projects = site.projects || [];

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-none">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-3">Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Showcasing my work in Bitcoin, blockchain, and full-stack development
        </p>
      </div>

      {/* Horizontal Scrollable List */}
      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        {/* Scroll Indicators - only show when content overflows */}
        <div className="hidden xl:block absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="hidden xl:block absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide xl:scrollbar-visible scroll-smooth px-2 justify-start xl:justify-center">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border bg-card transition-all hover:border-[#F7931A]/50 hover:shadow-lg hover:shadow-[#F7931A]/10 min-w-[280px] sm:min-w-[320px] md:min-w-[380px] lg:min-w-[400px] snap-center flex-shrink-0"
            >
              <CardHeader>
                <CardTitle className="group-hover:text-[#F7931A] transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-[#F7931A]/10 text-[#F7931A] hover:bg-[#F7931A]/20 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 4 && (
                    <Badge variant="secondary" className="bg-muted">
                      +{project.tech.length - 4}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="gap-2">
                {project.repo && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-[#F7931A]/30 hover:border-[#F7931A] hover:bg-[#F7931A]/10"
                  >
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button
                    size="sm"
                    asChild
                    className="bg-[#F7931A] hover:bg-[#F7931A]/90 text-white"
                  >
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>

              {/* Bitcoin-themed accent */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-[#F7931A]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <div className="mt-8 text-center">
        <Link href="/projects">
          <Button
            size="lg"
            variant="outline"
            className="border-[#F7931A]/30 hover:border-[#F7931A] hover:bg-[#F7931A]/10 hover:text-[#F7931A] transition-all group"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <style jsx global>{`
        /* Hide scrollbar on mobile for cleaner look */
        @media (max-width: 768px) {
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }

        /* Show styled scrollbar on desktop */
        @media (min-width: 769px) {
          .scrollbar-visible::-webkit-scrollbar {
            height: 8px;
          }
          .scrollbar-visible::-webkit-scrollbar-track {
            background: hsl(var(--muted));
            border-radius: 4px;
          }
          .scrollbar-visible::-webkit-scrollbar-thumb {
            background: #f7931a;
            border-radius: 4px;
          }
          .scrollbar-visible::-webkit-scrollbar-thumb:hover {
            background: #ff8c00;
          }
          .scrollbar-visible {
            scrollbar-width: thin;
            scrollbar-color: #f7931a hsl(var(--muted));
          }
        }
      `}</style>
    </div>
  );
}
