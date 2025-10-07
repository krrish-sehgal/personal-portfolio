"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, GitPullRequest } from "lucide-react";
import Link from "next/link";

export function OpenSourcePreview() {
  // Sample data - in a real app, this could come from an API or props
  const stats = {
    totalRepos: "50+",
    totalPRs: "50+",
    totalStars: "100+",
    contributions: "300+",
  };

  const bitcoinProjects = [
    {
      name: "Caravan Bitcoin",
      description:
        "Bitcoin multi-signature wallet coordination tool - Contributing to PSBT workflows and transaction handling",
      org: "caravan-bitcoin",
      icon: "₿",
    },
    {
      name: "GetAlby",
      description:
        "Bitcoin Lightning wallet browser extension - Building features for seamless Lightning Network payments",
      org: "getAlby",
      icon: "⚡",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50/30 to-yellow-50/30 dark:from-orange-950/20 dark:to-yellow-950/20">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            Open Source Contributions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            Active contributor to various open source projects with a focus on
            blockchain, AI, and security
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
              <div className="text-2xl font-bold text-[#F7931A] mb-2">
                {stats.totalRepos}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Repositories
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F7931A]/20 hover:border-[#F7931A]/40 transition-colors">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#F7931A] mb-2">
                {stats.totalPRs}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Merged PRs
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F7931A]/20 hover:border-[#F7931A]/40 transition-colors">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#F7931A] mb-2">
                {stats.totalStars}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stars Earned
              </p>
            </CardContent>
          </Card>
          <Card className="text-center border-[#F7931A]/20 hover:border-[#F7931A]/40 transition-colors">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#F7931A] mb-2">
                {stats.contributions}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Contributions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Bitcoin Projects */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            🪙 Featured Bitcoin Contributions
          </h3>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {bitcoinProjects.map((project, index) => (
              <Link key={index} href={`/open-source/${project.org}`}>
                <Card className="border-[#F7931A]/30 hover:border-[#F7931A] transition-all hover:shadow-xl hover:shadow-[#F7931A]/20 cursor-pointer group h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{project.icon}</div>
                      <CardTitle className="text-xl text-gray-900 dark:text-gray-100 group-hover:text-[#F7931A] transition-colors">
                        {project.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="bg-[#F7931A]/10 text-[#F7931A] border-[#F7931A]/20"
                      >
                        Bitcoin
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-[#F7931A] group-hover:translate-x-1 transition-transform">
                        <span>View Contributions</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
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
            🔥 Explore live PR feeds, organization contributions, and detailed
            statistics
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
