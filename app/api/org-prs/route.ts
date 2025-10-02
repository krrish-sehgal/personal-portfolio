// API endpoint to fetch PRs for a specific organization

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

  set(key: string, data: any, ttlMs: number = 300000) { // Default 5 minutes
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

interface PullRequest {
  title: string
  url: string
  created_at: string
  merged_at?: string
  state: string
  draft?: boolean
  labels: Array<{ name: string; color: string }>
  repository_url: string
  number: number
}

interface OrgPRsResponse {
  org: string
  username: string
  totalPRs: number
  pullRequests: PullRequest[]
  fetchedAt: string
  pagination: {
    page: number
    perPage: number
    totalPages: number
    hasMore: boolean
  }
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const org = searchParams.get('org');
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = 10;

  if (!org) {
    return NextResponse.json({ error: 'Organization parameter is required' }, { status: 400 });
  }

  const user = "krrish-sehgal"; // Hardcoded username for this portfolio

  // Check if we have cached data
  const cacheKey = `org-prs-${org}-${page}`;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache for 5 minutes, serve stale for 10 minutes
      }
    });
  }

  // Limit search window to reduce API load, e.g., last 18 months
  const since = new Date()
  since.setUTCMonth(since.getUTCMonth() - 18)
  const sinceIso = since.toISOString().slice(0, 10)

  try {
    // Search for PRs by the user in the specific organization
    const searchPerPage = 100 // GitHub search API per page
    let searchPage = 1
    const allItems: any[] = []

    // First, get all PRs to determine total count and for pagination
    while (searchPage <= 10) { // Max of 1000 PRs to avoid rate limits
      const q = encodeURIComponent(`is:pr author:${user} org:${org} created:>=${sinceIso}`)
      const url = `https://api.github.com/search/issues?q=${q}&per_page=${searchPerPage}&page=${searchPage}&sort=created&order=desc`
      const res = await ghFetch(url)
      const data = (await res.json()) as {
        items: Array<{
          title: string
          html_url: string
          created_at: string
          merged_at?: string
          state: string
          labels: Array<{ name: string; color: string }>
          repository_url: string
          number: number
          pull_request?: { url: string }
        }>
        total_count: number
      }
      
      allItems.push(...data.items)
      
      // Stop if fewer than searchPerPage returned or we have enough for current request
      if (data.items.length < searchPerPage) break
      searchPage++
    }

    // First, filter out unwanted PRs and get all valid PRs
    const validPRs: any[] = []
    
    for (const item of allItems) {
      // Extract owner and repo from repository_url
      const repoMatch = item.repository_url?.match(/repos\/([^/]+)\/([^/]+)$/)
      if (!repoMatch) continue
      
      const [, owner, repo] = repoMatch
      
      try {
        // Fetch detailed PR information
        const prUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${item.number}`
        const prRes = await ghFetch(prUrl)
        const prData = await prRes.json()
        
        // Skip closed PRs that are not merged
        if (prData.state === 'closed' && !prData.merged_at) {
          continue
        }
        
        validPRs.push({
          ...item,
          merged_at: prData.merged_at,
          draft: prData.draft || false
        })
      } catch (error) {
        console.error(`Failed to fetch PR details for ${owner}/${repo}#${item.number}:`, error)
        continue
      }
    }

    // Now calculate pagination based on valid PRs
    const totalPRs = validPRs.length
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedValidPRs = validPRs.slice(startIndex, endIndex)

    // Create the final PR objects (we already have the detailed info from filtering)
    const pullRequests: PullRequest[] = paginatedValidPRs.map(item => ({
      title: item.title,
      url: item.html_url,
      created_at: item.created_at,
      merged_at: item.merged_at,
      state: item.state || 'open',
      draft: item.draft || false,
      labels: item.labels || [],
      repository_url: item.repository_url,
      number: item.number
    }))

    const totalPages = Math.ceil(totalPRs / perPage)
    const hasMore = page < totalPages

    const payload: OrgPRsResponse = {
      org,
      username: user,
      totalPRs,
      pullRequests,
      fetchedAt: new Date().toISOString(),
      pagination: {
        page,
        perPage,
        totalPages,
        hasMore
      }
    }

    // Cache the data for 5 minutes
    cache.set(cacheKey, payload, 300000);

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache for 5 minutes, serve stale for 10 minutes
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