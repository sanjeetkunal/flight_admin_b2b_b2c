"use client"

import { useState } from "react"
import Link from "next/link"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Sparkline, AreaSparkline, MiniBars, DonutRing, TooltipBox, edgeAlign } from "../components/charts"

const last8Days = ["07 Jul", "08 Jul", "09 Jul", "10 Jul", "11 Jul", "12 Jul", "13 Jul", "14 Jul"]

const analyticsCards = [
  { label: "Total Agents", value: "342", change: "+3", sparkline: [318, 322, 325, 328, 330, 335, 338, 342], color: "#2563eb", formatValue: (v: number) => `${v} agents` },
  { label: "Active Agents", value: "318", change: "+2%", sparkline: [298, 302, 305, 308, 310, 312, 315, 318], color: "#7c3aed", formatValue: (v: number) => `${v} active` },
  { label: "New Agents (7 days)", value: "12", change: "+3", sparkline: [2, 1, 3, 2, 4, 3, 5, 4], color: "#059669", formatValue: (v: number) => `${v} new agents` },
  { label: "Pending Approvals", value: "6", change: "-2", bars: [3, 2, 3, 1, 2, 1, 2, 1], color: "bg-amber-500", formatValue: (v: number) => `${v} pending` },
]

const quickLinks = [
  { label: "All Agents", value: "342", href: "/agents/all-agents", color: "bg-blue-600", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" },
  { label: "Emulate Agent", value: "", href: "/agents/emulate", color: "bg-violet-600", icon: "M15 10l5 5-5 5M4 4v7a4 4 0 004 4h12" },
  { label: "Credit Upload", value: "", href: "/agents/credit-upload", color: "bg-emerald-600", icon: "M12 4v12m0 0l-4-4m4 4l4-4M4 18v1a2 2 0 002 2h12a2 2 0 002-2v-1" },
  { label: "Credit Management", value: "6 pending", href: "/agents/credit", color: "bg-amber-500", icon: "M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6M12 1v22" },
]

const topAgents = [
  { name: "Royal Wings Pvt Ltd", initials: "RW", bookings: 2341, tier: "Platinum", color: "bg-blue-500" },
  { name: "TravelBox Pvt Ltd", initials: "TB", bookings: 1247, tier: "Gold", color: "bg-violet-500" },
  { name: "Horizon Holidays", initials: "HH", bookings: 1089, tier: "Gold", color: "bg-emerald-500" },
  { name: "FlyDeal Travel Agency", initials: "FD", bookings: 842, tier: "Silver", color: "bg-orange-500" },
  { name: "StarTravel Solutions", initials: "ST", bookings: 634, tier: "Silver", color: "bg-pink-500" },
]

const creditTotalCr = 1.24
const creditBreakdown = [
  { label: "Used", value: 62, color: "bg-blue-600" },
  { label: "Reserved", value: 16, color: "bg-violet-400" },
  { label: "Available", value: 22, color: "bg-slate-200 dark:bg-slate-700" },
]
let creditCursor = 0
const creditSegments = creditBreakdown.map((b) => {
  const start = creditCursor
  creditCursor += b.value
  return { ...b, start, center: start + b.value / 2, amount: (creditTotalCr * b.value) / 100 }
})

const activityFeed = [
  { text: "Rahul Mehta (TravelBox) requested a credit limit increase to ₹5,00,000", time: "12 min ago", dot: "bg-violet-500" },
  { text: "New agent onboarded: Disha Travels (Jaipur)", time: "4 hr ago", dot: "bg-amber-500" },
  { text: "Agent Global Yatra Agency suspended — credit balance breached", time: "6 hr ago", dot: "bg-red-500" },
  { text: "Horizon Holidays upgraded to Gold tier", time: "1 day ago", dot: "bg-blue-500" },
  { text: "StarTravel Solutions KYC verified", time: "2 days ago", dot: "bg-emerald-500" },
]

export default function AgentsDashboardPage() {
  const [hoverSegment, setHoverSegment] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      {/* Row 1 — hero + credit issued trend + active agents donut */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-50 dark:bg-blue-500/10" />
          <div className="absolute -right-2 top-10 h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-500/10" />
          <div className="relative flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">B2B Agents Overview</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">342 agents onboarded, 6 credit requests pending approval.</p>
              <div className="mt-6 flex items-center gap-8">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Active Agents</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">318 <span className="text-xs font-semibold text-emerald-600">93%</span></p>
                  <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full w-[93%] rounded-full bg-blue-600" /></div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Credit Utilization</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">62% <span className="text-xs font-semibold text-emerald-600">+4%</span></p>
                  <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full w-[62%] rounded-full bg-emerald-600" /></div>
                </div>
              </div>
            </div>
            <div className="hidden h-44 w-44 flex-shrink-0 sm:block">
              <DotLottieReact
                src="https://lottie.host/e2278b39-148a-4177-b8d8-6f9ae6a491ee/wxg6bsa7rg.lottie"
                loop
                autoplay
                width={352}
                height={352}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Credit Issued</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10">+5%</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">₹1.24 Cr</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">across 342 agents</p>
          <div className="mt-3">
            <AreaSparkline
              points={[280, 295, 300, 310, 305, 320, 330, 342]}
              comparePoints={[260, 268, 272, 278, 284, 290, 298, 305]}
              color="#2563eb"
              labels={last8Days}
              formatValue={(v) => `${v} agents`}
              compareFormatValue={(v) => `${v} agents`}
            />
            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1"><span className="h-0.5 w-3 rounded-full bg-blue-600" /> This period</span>
              <span className="flex items-center gap-1"><span className="h-0.5 w-3 rounded-full border-t border-dashed border-slate-400" /> Last period</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-2 self-start text-xs font-medium text-slate-500 dark:text-slate-400">Active Agents</p>
          <DonutRing
            pct={93}
            color="#2563eb"
            label="318 active"
            breakdown={[
              { label: "Active", value: 318, color: "bg-blue-600" },
              { label: "Inactive", value: 24, color: "bg-slate-300" },
            ]}
          />
        </div>
      </div>

      {/* Row 2 — analytics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsCards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.label}</p>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">Last 8 days</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
              <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${c.change.startsWith("-") ? "text-red-600" : "text-emerald-600"}`}>
                <svg className={`h-3 w-3 ${c.change.startsWith("-") ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 10H4z" /></svg>
                {c.change}
              </span>
            </div>
            <div className="mt-2">
              {c.sparkline ? (
                <Sparkline points={c.sparkline} color={c.color!} labels={last8Days} formatValue={c.formatValue} />
              ) : (
                <MiniBars values={c.bars!} color={c.color!} labels={last8Days} formatValue={c.formatValue} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Row 3 — quick link tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickLinks.map((s) => (
          <Link key={s.label} href={s.href} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${s.color}`}>
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
            </div>
            <div className="min-w-0">
              {s.value && <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{s.value}</p>}
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Row 4 — credit utilization + activity feed */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Credit Utilization</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">₹1.24 Cr issued across 342 agents</p>
          <div className="relative mt-4">
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              {creditSegments.map((b, i) => (
                <div
                  key={b.label}
                  onMouseEnter={() => setHoverSegment(i)}
                  onMouseLeave={() => setHoverSegment(null)}
                  className={`cursor-pointer transition-opacity ${b.color} ${hoverSegment !== null && hoverSegment !== i ? "opacity-50" : "opacity-100"}`}
                  style={{ width: `${b.value}%` }}
                />
              ))}
            </div>
            {hoverSegment !== null && (
              <div className="pointer-events-none absolute z-20 bottom-full mb-1.5" style={edgeAlign(creditSegments[hoverSegment].center)}>
                <TooltipBox>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{creditSegments[hoverSegment].label} · {creditSegments[hoverSegment].value}%</p>
                  <p className="text-slate-400">≈ ₹{creditSegments[hoverSegment].amount.toFixed(2)} Cr</p>
                </TooltipBox>
              </div>
            )}
          </div>
          <div className="mt-3 space-y-1.5">
            {creditSegments.map((b) => (
              <div key={b.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300"><span className={`h-2 w-2 rounded-full ${b.color}`} />{b.label}</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{b.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Recent Activity</h3>
          <div className="space-y-0 divide-y divide-slate-50 dark:divide-slate-800">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex gap-3 py-2.5">
                <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${a.dot}`} />
                <div className="min-w-0">
                  <p className="text-xs text-slate-700 dark:text-slate-300">{a.text}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5 — top agents */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Top Agents</h3>
          <Link href="/agents/all-agents" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View all agents →</Link>
        </div>
        <div className="divide-y divide-slate-50 px-6 dark:divide-slate-800">
          {topAgents.map((a) => (
            <div key={a.name} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${a.color}`}>{a.initials}</span>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{a.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{a.tier}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{a.bookings.toLocaleString("en-IN")} bookings</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
