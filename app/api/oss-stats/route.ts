// Server-only: uses process.env.GITHUB_TOKEN; never exposed to the client.

import { NextResponse } from 'next/server';

// Simple in-memory cache with TTL
class SimpleCache {
  private cache = new Map<string, { data: any; expires: number }>();

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key: string, data: any, ttlMs: number = 600000) { // Default 10 minutes for main stats
    this.cache.set(key, {
      data,
      expires: Date.now() + ttlMs
    });
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new SimpleCache();

export const dynamic = "force-dynamic"

type CountsByType = Record<"feature" | "bugfix" | "docs" | "infra" | "other", number>
type CountsByOrg = Record<string, number>
type MonthSeriesPoint = { month: string; prs: number }

type OssStatsResponse = {
  user: string
  totalPRs: number
  reposCount: number
  orgsCount: number
  countsByType: CountsByType
  countsByOrg: CountsByOrg
  monthlySeries: MonthSeriesPoint[]
  fetchedAt: string
  note?: string
}

function classifyPR(title: string, labels: string[]): keyof CountsByType {
  const t = title.toLowerCase()
  const L = labels.map((l) => l.toLowerCase())

  const has = (k: string) => t.includes(k) || L.some((l) => l.includes(k))

  if (has("bug") || has("fix") || has("hotfix")) return "bugfix"
  if (has("docs") || has("documentation") || has("readme")) return "docs"
  if (has("infra") || has("chore") || has("build") || has("ci") || has("pipeline") || has("devops") || has("test"))
    return "infra"
  if (has("feature") || has("feat") || has("add") || has("implement") || has("support")) return "feature"
  return "other"
}

function monthKey(date: string) {
  // YYYY-MM format
  const d = new Date(date)
  const y = d.getUTCFullYear()
  const m = `${d.getUTCMonth() + 1}`.padStart(2, "0")
  return `${y}-${m}`
}

async function ghFetch(url: string) {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error("Missing GITHUB_TOKEN. Add it in Project Settings → Environment Variables (server only).")
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GitHub API error ${res.status}: ${txt}`)
  }
  return res
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const user = searchParams.get("user") || "krrish-sehgal"

  // Check if we have cached data
  const cacheKey = `oss-stats-${user}`;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200', // Cache for 10 minutes, serve stale for 20 minutes
      }
    });
  }

  // Limit search window to reduce API load, e.g., last 18 months
  const since = new Date()
  since.setUTCMonth(since.getUTCMonth() - 18)
  const sinceIso = since.toISOString().slice(0, 10)

  // Search merged PRs authored by the user since the given date
  // Using GitHub Search API (capped to 1000 results). We’ll paginate a few pages for practicality.
  const perPage = 100
  const maxPages = 3 // up to 300 PRs
  let page = 1

  const items: any[] = []
  let note: string | undefined

  try {
    while (page <= maxPages) {
      const q = encodeURIComponent(`is:pr is:merged author:${user} merged:>=${sinceIso}`)
      const url = `https://api.github.com/search/issues?q=${q}&per_page=${perPage}&page=${page}`
      const res = await ghFetch(url)
      const data = (await res.json()) as {
        items: Array<{
          title: string
          labels: Array<{ name: string }>
          repository_url: string
          created_at: string
          pull_request?: { url: string }
        }>
        total_count: number
      }
      items.push(...data.items)
      // Stop if fewer than perPage returned
      if (data.items.length < perPage) break
      page++
    }

    // Aggregate
    const countsByType: CountsByType = { feature: 0, bugfix: 0, docs: 0, infra: 0, other: 0 }
    const countsByOrg: CountsByOrg = {}
    const countsByMonth = new Map<string, number>()
    const repos = new Set<string>()
    const orgs = new Set<string>()

    for (const it of items) {
      const title = it.title || ""
      const labels = Array.isArray(it.labels) ? it.labels.map((l: any) => l.name || "") : []
      const type = classifyPR(title, labels)
      countsByType[type] += 1

      // repository_url: https://api.github.com/repos/{owner}/{repo}
      const repoMatch = it.repository_url?.match(/repos\/([^/]+)\/([^/]+)$/)
      if (repoMatch) {
        const owner = repoMatch[1]
        const repo = repoMatch[2]
        repos.add(`${owner}/${repo}`)
        orgs.add(owner)
        countsByOrg[owner] = (countsByOrg[owner] || 0) + 1
      }

      const mk = monthKey(it.created_at)
      countsByMonth.set(mk, (countsByMonth.get(mk) || 0) + 1)
    }

    // Normalize monthly series over the last 12 months
    const seriesMonths: string[] = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const dt = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))
      const key = `${dt.getUTCFullYear()}-${`${dt.getUTCMonth() + 1}`.padStart(2, "0")}`
      seriesMonths.push(key)
    }
    const monthlySeries: MonthSeriesPoint[] = seriesMonths.map((m) => ({
      month: m,
      prs: countsByMonth.get(m) || 0,
    }))

    const payload: OssStatsResponse = {
      user,
      totalPRs: items.length,
      reposCount: repos.size,
      orgsCount: orgs.size,
      countsByType,
      countsByOrg,
      monthlySeries,
      fetchedAt: new Date().toISOString(),
      note,
    }

    // Cache the data for 10 minutes
    cache.set(cacheKey, payload, 600000);

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200', // Cache for 10 minutes, serve stale for 20 minutes
      }
    })
  } catch (err: any) {
    const msg = err?.message || "Unknown error"
    return new Response(JSON.stringify({ error: msg }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      status: 500,
    })
  }
}
