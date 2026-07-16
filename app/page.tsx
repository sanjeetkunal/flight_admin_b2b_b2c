"use client"

import { useState } from "react"
import Link from "next/link"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { TooltipBox, edgeAlign, Sparkline, AreaSparkline, MiniBars, DonutRing } from "./components/charts"
import Pagination from "./components/Pagination"

const PAGE_SIZE = 5

const days12 = ["24 Jun", "25 Jun", "26 Jun", "27 Jun", "28 Jun", "29 Jun", "30 Jun", "01 Jul", "02 Jul", "03 Jul", "04 Jul", "05 Jul"]
const last8Days = days12.slice(-8)
const last10Days = days12.slice(-10)
const last14Days = ["22 Jun", "23 Jun", ...days12]
const weeklyLabels = ["8 wks ago", "7 wks ago", "6 wks ago", "5 wks ago", "4 wks ago", "3 wks ago", "2 wks ago", "This week"]

const analyticsCards = [
  { label: "Bookings Conversion", value: "68%", change: "+7%", up: true, sparkline: [40, 44, 42, 48, 52, 58, 55, 62], color: "#2563eb", labels: last8Days, formatValue: (v: number) => `${v}%` },
  { label: "Revenue (7 days)", value: "₹1.24 Cr", change: "+8%", up: true, sparkline: [30, 35, 33, 40, 45, 42, 50, 58], color: "#059669", labels: last8Days, formatValue: (v: number) => `₹${v}L` },
  { label: "New Agents (7 days)", value: "12", change: "+3", up: true, sparkline: [2, 1, 3, 2, 4, 3, 5, 4], color: "#7c3aed", labels: last8Days, formatValue: (v: number) => `${v} new agents` },
  { label: "Active Routes", value: "186", change: "+4%", up: true, bars: [8, 14, 10, 18, 22, 16, 24, 20, 15, 26], color: "bg-amber-500", labels: last10Days, formatValue: (v: number) => `${v} routes` },
]

const miniStats = [
  { label: "Flight Bookings", sub: "312 today", value: "312", color: "bg-blue-600", icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" },
  { label: "Support Tickets", sub: "14 open", value: "14", color: "bg-violet-600", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Credit Requests", sub: "6 pending", value: "6", color: "bg-amber-500", icon: "M12 4v12m0 0l-4-4m4 4l4-4M4 18v1a2 2 0 002 2h12a2 2 0 002-2v-1" },
  { label: "Positive Feedback", sub: "94% CSAT", value: "94%", color: "bg-emerald-600", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
]

const trafficDays = [
  { day: "24 Jun", flights: 18, other: 6 }, { day: "25 Jun", flights: 22, other: 8 }, { day: "26 Jun", flights: 16, other: 5 },
  { day: "27 Jun", flights: 28, other: 9 }, { day: "28 Jun", flights: 32, other: 11 }, { day: "29 Jun", flights: 24, other: 7 },
  { day: "30 Jun", flights: 38, other: 14 }, { day: "01 Jul", flights: 30, other: 10 }, { day: "02 Jul", flights: 42, other: 15 },
  { day: "03 Jul", flights: 48, other: 18 }, { day: "04 Jul", flights: 40, other: 13 }, { day: "05 Jul", flights: 52, other: 20 },
]
const trafficMax = 70

const topCities = [
  { city: "Delhi (DEL)", bookings: 412, pct: 100 },
  { city: "Mumbai (BOM)", bookings: 356, pct: 86 },
  { city: "Bangalore (BLR)", bookings: 248, pct: 60 },
  { city: "Hyderabad (HYD)", bookings: 174, pct: 42 },
  { city: "Chennai (MAA)", bookings: 132, pct: 32 },
]

const creditTotalCr = 2.8
const creditBreakdown = [
  { label: "Used", value: 68, color: "bg-blue-600" },
  { label: "Reserved", value: 14, color: "bg-violet-500" },
  { label: "Available", value: 18, color: "bg-slate-200 dark:bg-slate-700" },
]
let creditCursor = 0
const creditSegments = creditBreakdown.map((b) => {
  const start = creditCursor
  creditCursor += b.value
  return { ...b, start, center: start + b.value / 2, amount: (creditTotalCr * b.value) / 100 }
})

const activityFeed = [
  { text: "Rahul Mehta (TravelBox) requested a credit limit increase to ₹5,00,000", time: "12 min ago", dot: "bg-blue-500" },
  { text: "PNR issued for booking REQ-10231 — Rajesh Kumar", time: "34 min ago", dot: "bg-emerald-500" },
  { text: "Refund approved for RFR-4998 — Priya Sharma", time: "1 hr ago", dot: "bg-violet-500" },
  { text: "Agent Global Yatra Agency suspended — credit balance breached", time: "2 hr ago", dot: "bg-red-500" },
  { text: "New agent onboarded: Disha Travels (Jaipur)", time: "4 hr ago", dot: "bg-amber-500" },
]

const bookingTrend = [24, 28, 22, 34, 30, 40, 36, 46, 52, 48, 58, 62, 55, 68]

const topAgents = [
  { name: "Royal Wings Pvt Ltd", initials: "RW", bookings: 2341, date: "Today", color: "bg-violet-500" },
  { name: "TravelBox Pvt Ltd", initials: "TB", bookings: 1247, date: "Today", color: "bg-blue-500" },
  { name: "Horizon Holidays", initials: "HH", bookings: 1089, date: "Yesterday", color: "bg-emerald-500" },
  { name: "FlyDeal Travel Agency", initials: "FD", bookings: 842, date: "Yesterday", color: "bg-orange-500" },
  { name: "StarTravel Solutions", initials: "ST", bookings: 634, date: "2 days ago", color: "bg-pink-500" },
]

const channelSplit = [
  { label: "B2B Portal", value: 3550, pct: 100, color: "bg-blue-600" },
  { label: "Web", value: 1798, pct: 51, color: "bg-blue-600" },
  { label: "Mobile App", value: 1245, pct: 35, color: "bg-blue-600" },
  { label: "API", value: 986, pct: 28, color: "bg-blue-600" },
]

const pendingTasks = [
  { done: true, label: "Verify KYC — Disha Travels onboarding", due: "08 Jul, 2026", progress: "2/2" },
  { done: false, label: "Review 3 pending credit upload requests", due: "10 Jul, 2026", progress: "0/3" },
  { done: false, label: "Approve reissue request RIS-3003 — Sunita Rao", due: "10 Jul, 2026", progress: "0/1" },
  { done: true, label: "Reconcile refund payouts for last week", due: "07 Jul, 2026", progress: "6/6" },
  { done: false, label: "Update commission rates for Akasa Air", due: "12 Jul, 2026", progress: "0/1" },
]

const invoices = [
  { no: "INV-1401", agent: "TravelBox Pvt Ltd", gst: "27ABCDE1234F1Z5", created: "05 Jul 2026", status: "Paid", amount: "₹88,700" },
  { no: "INV-1402", agent: "FlyDeal Travel Agency", gst: "07FGHIJ5678K2L6", created: "04 Jul 2026", status: "Pending", amount: "₹1,20,000" },
  { no: "INV-1403", agent: "StarTravel Solutions", gst: "29MNOPQ9012R3S7", created: "03 Jul 2026", status: "Pending", amount: "₹53,400" },
  { no: "INV-1404", agent: "Royal Wings Pvt Ltd", gst: "36HIJKL6789M7N1", created: "02 Jul 2026", status: "Due in 2 days", amount: "₹1,50,000" },
  { no: "INV-1405", agent: "QuickBook Tours", gst: "33RSTUV3456W4X8", created: "01 Jul 2026", status: "Paid", amount: "₹64,800" },
  { no: "INV-1406", agent: "Disha Travels", gst: "08CDEFG2345H6I0", created: "30 Jun 2026", status: "Overdue", amount: "₹30,000" },
]

const invoiceStatusColors: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Overdue: "bg-red-100 text-red-700",
  "Due in 2 days": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
}

export default function DashboardPage() {
  const totalAgents = 342
  const activeAgents = 318
  const activePct = Math.round((activeAgents / totalAgents) * 100)

  const [hoverDay, setHoverDay] = useState<number | null>(null)
  const [hoverSegment, setHoverSegment] = useState<number | null>(null)
  const [hoverCity, setHoverCity] = useState<number | null>(null)
  const [hoverChannel, setHoverChannel] = useState<number | null>(null)
  const [invoicePage, setInvoicePage] = useState(1)
  const paginatedInvoices = invoices.slice((invoicePage - 1) * PAGE_SIZE, invoicePage * PAGE_SIZE)

  return (
    <div className="space-y-5">
      {/* Row 1 — welcome + agent stats */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-50" />
          <div className="absolute -right-2 top-10 h-16 w-16 rounded-full bg-blue-50" />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Welcome back, Admin</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">You have 6 pending credit requests and 4 new notifications.</p>
              <div className="mt-6 flex items-center gap-8">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Today's Bookings</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">1,247 <span className="text-xs font-semibold text-emerald-600">+7%</span></p>
                  <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full w-[70%] rounded-full bg-blue-600" /></div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Growth Rate</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">18.4% <span className="text-xs font-semibold text-emerald-600">+2%</span></p>
                  <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full w-[45%] rounded-full bg-emerald-600" /></div>
                </div>
              </div>
            </div>
            <div className="hidden h-44 w-44 flex-shrink-0 sm:block">
              <DotLottieReact
                src="https://lottie.host/542fa46a-a2ae-4ec6-a126-6a75d2a18bdb/1t1Wmxns3r.lottie"
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
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Agents</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">+3 new</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">{totalAgents}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">342 agents onboarded, increased from last month</p>
          <div className="mt-3">
            <AreaSparkline
              points={[280, 295, 300, 310, 305, 320, 330, 342]}
              comparePoints={[260, 268, 272, 278, 284, 290, 298, 305]}
              color="#2563eb"
              labels={weeklyLabels}
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
            pct={activePct}
            color="#2563eb"
            label={`${activeAgents} active`}
            breakdown={[
              { label: "Active", value: activeAgents, color: "bg-blue-600" },
              { label: "Inactive", value: totalAgents - activeAgents, color: "bg-slate-300" },
            ]}
          />
        </div>
      </div>

      {/* Row 2 — analytics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsCards.map((c) =>
          c.label === "Bookings Conversion" ? (
            <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{c.label}</p>
                <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  Last 7 days
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Conversion rate</span>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                  {c.change}
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div className="h-full rounded-full bg-blue-600" style={{ width: c.value }} />
              </div>
            </div>
          ) : c.label === "Revenue (7 days)" ? (
            <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Revenue</p>
                <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  Last 7 days
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                  {c.change}
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </span>
              </div>
              <div className="mt-2">
                <AreaSparkline points={c.sparkline!} color={c.color!} labels={c.labels} formatValue={c.formatValue} />
              </div>
            </div>
          ) : c.label === "New Agents (7 days)" ? (
            <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">New Agents</p>
                <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  Last 7 days
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                  {c.change}
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </span>
              </div>
              <div className="mt-2">
                <AreaSparkline
                  points={c.sparkline!}
                  comparePoints={[3, 1, 4, 1, 5, 2, 4, 3]}
                  color={c.color!}
                  labels={c.labels}
                  formatValue={c.formatValue}
                  compareFormatValue={(v) => `${v} new agents`}
                  showArea={false}
                />
              </div>
            </div>
          ) : (
            <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.label}</p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Last 7 days</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
                <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 10H4z" /></svg>
                  {c.change}
                </span>
              </div>
              <div className="mt-2">
                {c.sparkline ? (
                  <Sparkline points={c.sparkline} color={c.color!} labels={c.labels} formatValue={c.formatValue} />
                ) : (
                  <MiniBars values={c.bars!} color={c.color!} labels={c.labels} formatValue={c.formatValue} />
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Row 3 — mini icon stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {miniStats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${s.color}`}>
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 4 — traffic chart + top cities */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Booking Traffic Summary</h3>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-blue-600" /> Flights</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-violet-400" /> Other Modules</span>
            </div>
          </div>
          <div className="relative flex h-40 items-end gap-2">
            {trafficDays.map((d, i) => {
              const totalPct = ((d.flights + d.other) / trafficMax) * 100
              const dimmed = hoverDay !== null && hoverDay !== i
              return (
                <div
                  key={d.day}
                  className="flex h-full flex-1 flex-col items-center gap-1"
                  onMouseEnter={() => setHoverDay(i)}
                  onMouseLeave={() => setHoverDay(null)}
                >
                  <div className={`flex w-full flex-1 cursor-pointer flex-col justify-end gap-0.5 transition-opacity ${dimmed ? "opacity-40" : "opacity-100"}`}>
                    <div className="w-full rounded-t-sm bg-violet-400" style={{ height: `${(d.other / trafficMax) * 100}%` }} />
                    <div className="w-full rounded-t-sm bg-blue-600" style={{ height: `${(d.flights / trafficMax) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{d.day}</span>
                  {hoverDay === i && (
                    <div
                      className="pointer-events-none absolute z-20"
                      style={{ ...edgeAlign(((i + 0.5) / trafficDays.length) * 100), bottom: `calc(${totalPct}% + 22px)` }}
                    >
                      <TooltipBox>
                        <p className="mb-1 font-semibold text-slate-800 dark:text-slate-100">{d.day}</p>
                        <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /><span className="text-slate-500 dark:text-slate-400">Flights</span><span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{d.flights}</span></div>
                        <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /><span className="text-slate-500 dark:text-slate-400">Other</span><span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{d.other}</span></div>
                        <div className="mt-1 border-t border-slate-100 pt-1 text-slate-500 dark:border-slate-700 dark:text-slate-400">Total <span className="font-semibold text-slate-800 dark:text-slate-100">{d.flights + d.other}</span></div>
                      </TooltipBox>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Top Cities by Bookings</h3>
          <div className="space-y-3">
            {topCities.map((c, i) => (
              <div
                key={c.city}
                className="relative"
                onMouseEnter={() => setHoverCity(i)}
                onMouseLeave={() => setHoverCity(null)}
              >
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{c.city}</span>
                  <span className="text-slate-400 dark:text-slate-500">{c.bookings}</span>
                </div>
                <div className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className={`h-full rounded-full bg-blue-600 transition-opacity ${hoverCity !== null && hoverCity !== i ? "opacity-50" : "opacity-100"}`} style={{ width: `${c.pct}%` }} />
                </div>
                {hoverCity === i && (
                  <div className="pointer-events-none absolute z-20 bottom-full left-1/2 mb-1.5 -translate-x-1/2">
                    <TooltipBox>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">Rank #{i + 1} · {c.bookings} bookings</p>
                      <p className="text-slate-400">{c.pct}% of top city</p>
                    </TooltipBox>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5 — credit utilization + activity feed */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Platform Credit Utilization</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">₹2.8 Cr issued across 342 agents</p>
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

      {/* Row 6 — booking trend chart + top agents */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Booking Activity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Today's Bookings: <span className="font-semibold text-slate-800 dark:text-slate-100">1,247</span> <span className="text-emerald-600 font-semibold">+5.4%</span></p>
          </div>
          <div className="mt-3">
            <Sparkline points={bookingTrend} color="#2563eb" labels={last14Days} formatValue={(v) => `${v} bookings`} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Top Performing Agents</h3>
          <div className="space-y-3">
            {topAgents.map((a) => (
              <div key={a.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white ${a.color}`}>{a.initials}</span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{a.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">{a.bookings.toLocaleString()}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 7 — channel split + pending tasks */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Booking Channel Split</h3>
          <div className="space-y-3">
            {channelSplit.map((c, i) => (
              <div
                key={c.label}
                className="relative flex items-center gap-3"
                onMouseEnter={() => setHoverChannel(i)}
                onMouseLeave={() => setHoverChannel(null)}
              >
                <span className="w-24 flex-shrink-0 text-xs text-slate-600 dark:text-slate-300">{c.label}</span>
                <div className="h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className={`h-full rounded-full transition-opacity ${c.color} ${hoverChannel !== null && hoverChannel !== i ? "opacity-50" : "opacity-100"}`} style={{ width: `${c.pct}%` }} />
                </div>
                <span className="w-14 flex-shrink-0 text-right text-xs font-medium text-slate-700 dark:text-slate-300">{c.value.toLocaleString()}</span>
                {hoverChannel === i && (
                  <div className="pointer-events-none absolute z-20 bottom-full left-24 mb-1.5">
                    <TooltipBox>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{c.label} · {c.value.toLocaleString()}</p>
                      <p className="text-slate-400">{c.pct}% of top channel</p>
                    </TooltipBox>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Pending Admin Tasks</h3>
          <div className="space-y-2.5">
            {pendingTasks.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${t.done ? "border-emerald-500 bg-emerald-500" : "border-slate-300"}`}>
                  {t.done && <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </span>
                <span className={`flex-1 truncate text-xs ${t.done ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-200"}`}>{t.label}</span>
                <span className="flex-shrink-0 text-[11px] text-slate-400 dark:text-slate-500">{t.due}</span>
                <span className="flex-shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">{t.progress}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 8 — recent invoices */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recent Agent Invoices</h3>
          <Link href="/agents/credit" className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
            View all
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Invoice No.</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">GSTIN</th>
                <th className="px-6 py-3 text-left font-medium">Created</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {paginatedInvoices.map((inv) => (
                <tr key={inv.no} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-indigo-700">{inv.no}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{inv.agent}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{inv.gst}</td>
                  <td className="px-6 py-3 text-xs text-slate-500 dark:text-slate-400">{inv.created}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${invoiceStatusColors[inv.status]}`}>{inv.status}</span>
                  </td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{inv.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={invoicePage} pageSize={PAGE_SIZE} totalItems={invoices.length} onPageChange={setInvoicePage} itemLabel="entries" />
      </div>
    </div>
  )
}
