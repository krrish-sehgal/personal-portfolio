"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, GitFork, GitPullRequest } from "lucide-react";
import Link from "next/link";

export function OpenSourcePreview() {
  // Sample data - in a real app, this could come from an API or props
  const stats = {
    totalRepos: "50+",
    totalPRs: "50+",
    totalStars: "100+",
    contributions: "300+"
  };

  const featuredProjects = [
    {
      name: "SecureFace",
      description: "Face recognition system with anti-spoofing mechanisms using deep learning",
      language: "Python",
      stars: 15,
      forks: 8,
      url: "https://github.com/krrish-sehgal/SecureFace"
    },
    {
      name: "Deep Guard",
      description: "Advanced deepfake detection system with real-time processing capabilities",
      language: "Python", 
      stars: 12,
      forks: 5,
      url: "https://github.com/krrish-sehgal/DeepGuard"
    },
    {
      name: "OWASP BLT",
      description: "Contributed to AI-driven blockchain rewards system during GSoC 2025",
      language: "JavaScript",
      stars: 25,
      forks: 12,
      url: "https://github.com/OWASP/BLT"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50/30 to-yellow-50/30 dark:from-orange-950/20 dark:to-yellow-950/20">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Open Source Contributions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            Active contributor to various open source projects with a focus on blockchain, AI, and security
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>GSoC 2025 Contributor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#F7931A] rounded-full animate-pulse"></div>
              <span>Summer of Bitcoin 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>50+ Merged PRs</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-[#F7931A]/20 hover:border-[#F7931A]/40 transition-colors">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#F7931A] mb-2">{stats.totalRepos}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Repositories</p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F7931A]/20 hover:border-[#F7931A]/40 transition-colors">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#F7931A] mb-2">{stats.totalPRs}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Merged PRs</p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F7931A]/20 hover:border-[#F7931A]/40 transition-colors">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#F7931A] mb-2">{stats.totalStars}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stars Earned</p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F7931A]/20 hover:border-[#F7931A]/40 transition-colors">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#F7931A] mb-2">{stats.contributions}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contributions</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Projects */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="border-[#F7931A]/20 hover:border-[#F7931A]/40 transition-all hover:shadow-lg hover:shadow-[#F7931A]/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                    {project.name}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-[#F7931A]/10 text-[#F7931A] border-[#F7931A]/20">
                    {project.language}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {project.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      {project.forks}
                    </div>
                  </div>
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F7931A] hover:text-[#F7931A]/80 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to Full Dashboard */}
        <div className="text-center">
          <Link href="/open-source">
            <Button 
              size="lg" 
              className="bg-[#F7931A] hover:bg-[#F7931A]/90 text-white font-medium px-8 py-3 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#F7931A]/25"
            >
              <Github className="mr-2 h-5 w-5" />
              View Full Open Source Dashboard
              <GitPullRequest className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            🔥 Explore live PR feeds, organization contributions, and detailed statistics
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-[#F7931A]">
            <span className="animate-pulse">●</span>
            <span>Live data updates every 5 minutes</span>
            <span className="animate-pulse">●</span>
          </div>
        </div>
      </div>
    </section>
  );
}