// API endpoint to fetch PRs for a specific organization

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
  const org = searchParams.get("org")
  const user = searchParams.get("user") || "krrish-sehgal"

  if (!org) {
    return new Response(JSON.stringify({ error: "Organization parameter is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }

  // Limit search window to reduce API load, e.g., last 18 months
  const since = new Date()
  since.setUTCMonth(since.getUTCMonth() - 18)
  const sinceIso = since.toISOString().slice(0, 10)

  try {
    // Search for PRs by the user in the specific organization
    const perPage = 100
    const maxPages = 2 // up to 200 PRs
    let page = 1
    const items: any[] = []

    while (page <= maxPages) {
      const q = encodeURIComponent(`is:pr author:${user} org:${org} created:>=${sinceIso}`)
      const url = `https://api.github.com/search/issues?q=${q}&per_page=${perPage}&page=${page}&sort=created&order=desc`
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
      
      items.push(...data.items)
      
      // Stop if fewer than perPage returned
      if (data.items.length < perPage) break
      page++
    }

    // Fetch detailed PR information to get draft status
    const pullRequests: PullRequest[] = []
    
    for (const item of items) {
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
        
        pullRequests.push({
          title: item.title,
          url: item.html_url,
          created_at: item.created_at,
          merged_at: prData.merged_at,
          state: prData.state,
          draft: prData.draft || false,
          labels: item.labels || [],
          repository_url: item.repository_url,
          number: item.number
        })
      } catch (error) {
        // If detailed fetch fails, skip this PR to avoid incorrect data
        console.error(`Failed to fetch PR details for ${owner}/${repo}#${item.number}:`, error)
        continue
      }
    }

    const payload: OrgPRsResponse = {
      org,
      username: user,
      totalPRs: pullRequests.length,
      pullRequests,
      fetchedAt: new Date().toISOString(),
    }

    return new Response(JSON.stringify(payload), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      status: 200,
    })
  } catch (err: any) {
    const msg = err?.message || "Unknown error"
    return new Response(JSON.stringify({ error: msg }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      status: 500,
    })
  }
}