"use client"

import useSWR from "swr"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type CountsByType = {
  feature: number
  bugfix: number
  docs: number
  infra: number
  other: number
}

type OssStats = {
  user: string
  totalPRs: number
  reposCount: number
  orgsCount: number
  countsByType: CountsByType
  countsByOrg: Record<string, number>
  monthlySeries: { month: string; prs: number }[]
  fetchedAt: string
  note?: string
}

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json())

export default function OpenSourceDashboard({ username }: { username: string }) {
  const { data, error, isLoading } = useSWR<OssStats>(`/api/oss-stats?user=${encodeURIComponent(username)}`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000, // Auto-refresh every 5 minutes for live feed
  })

  // Function to handle clicks on organizations - navigate to org page
  const handleOrgClick = (orgName: string) => {
    window.location.href = `/open-source/${orgName}`
  }

  if (error) {
    return <div className="text-destructive">Failed to load: {String(error)}</div>
  }
  if (isLoading || !data) {
    return <div className="text-muted-foreground">Fetching latest GitHub stats…</div>
  }

  // Provide default values in case countsByType is undefined
  const countsByType = data.countsByType || {
    feature: 0,
    bugfix: 0,
    docs: 0,
    infra: 0,
    other: 0
  }

  const typeData = [
    { type: "Feature", value: countsByType.feature, key: "feature" },
    { type: "Bugfix", value: countsByType.bugfix, key: "bugfix" },
    { type: "Docs", value: countsByType.docs, key: "docs" },
    { type: "Infra", value: countsByType.infra, key: "infra" },
    { type: "Other", value: countsByType.other, key: "other" },
  ].filter((d) => d.value > 0)

  const orgData = Object.entries(data.countsByOrg)
    .map(([org, count]) => ({ org, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const monthly = data.monthlySeries

  return (
    <div className="space-y-6">
      {/* Live Feed Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Open Source Dashboard</h2>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Feed • Updates every 5 minutes
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Merged PRs</CardTitle>
            <CardDescription>Total merged pull requests (last 18 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.totalPRs}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Repositories</CardTitle>
            <CardDescription>Distinct repositories contributed to</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.reposCount}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Organizations</CardTitle>
            <CardDescription>Owners/orgs across contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{data.orgsCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Organizations - Clickable Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Top Organizations</CardTitle>
          <CardDescription>Organizations where I contribute the most • Click to view detailed contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {orgData.slice(0, 6).map(({ org, count }) => (
              <button
                key={org}
                onClick={() => handleOrgClick(org)}
                className="group rounded-xl border border-border bg-card p-4 text-left transition-all duration-200 hover:border-primary hover:shadow-md hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, #F7931A08 100%)`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors">
                      {org}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {count} PR{count > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: '#F7931A' }}
                  >
                    {org.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="mt-3 rounded-md bg-muted p-2 font-mono text-xs text-muted-foreground">
                  contrib:{org.toLowerCase().replace(/[^a-z]/g, "").padEnd(6, "0")}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PRs by Type (Pie) */}
      <Card>
        <CardHeader>
          <CardTitle>PRs by Type</CardTitle>
          <CardDescription>Heuristic classification via labels/title (feature, bugfix, docs, infra)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              feature: { label: "Feature", color: "#F7931A" }, // Bitcoin orange
              bugfix: { label: "Bugfix", color: "#FFD700" }, // Gold
              docs: { label: "Docs", color: "#FFA500" }, // Orange
              infra: { label: "Infra", color: "#FF8C00" }, // Dark orange
              other: { label: "Other", color: "#B8860B" }, // Dark golden rod
            }}
            className="h-[320px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={typeData.map((item, index) => ({
                    ...item,
                    fill: item.key === 'feature' ? '#F7931A' :
                          item.key === 'bugfix' ? '#FFD700' :
                          item.key === 'docs' ? '#FFA500' :
                          item.key === 'infra' ? '#FF8C00' :
                          '#B8860B' // other
                  }))}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* PRs by Organization (Bar) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Contributions by Organization
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </span>
          </CardTitle>
          <CardDescription>Top organizations (owners) by merged PRs • Click bars to view PRs on GitHub</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              orgs: { label: "PRs", color: "#F7931A" }, // Bitcoin orange
            }}
            className="h-[320px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orgData} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="org" />
                <YAxis allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Merged PRs" 
                  fill="var(--color-orgs)" 
                  radius={[4, 4, 0, 0]}
                  onClick={(data) => handleOrgClick(data.payload.org)}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Series (Area) */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
          <CardDescription>PRs merged per month over the last 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              prs: { label: "PRs", color: "#FFD700" }, // Gold
            }}
            className="h-[320px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="fillPrs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-prs)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-prs)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="prs" stroke="var(--color-prs)" fill="url(#fillPrs)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Last Updated: {new Date(data.fetchedAt).toLocaleString()} • Source: GitHub Search API
        </span>
        <span className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          Auto-refreshing every 5 minutes
        </span>
      </div>
    </div>
  )
}
