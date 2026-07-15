"use client"

import { useState } from "react"
import Link from "next/link"
import { edgeAlign, Sparkline, AreaSparkline, MiniBars, DonutRing, TooltipBox } from "../components/charts"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

const last8Days = ["07 Jul", "08 Jul", "09 Jul", "10 Jul", "11 Jul", "12 Jul", "13 Jul", "14 Jul"]
const trafficDays = [
  { day: "01 Jul", general: 26, tatkal: 8 }, { day: "02 Jul", general: 30, tatkal: 10 }, { day: "03 Jul", general: 22, tatkal: 6 },
  { day: "04 Jul", general: 34, tatkal: 12 }, { day: "05 Jul", general: 38, tatkal: 14 }, { day: "06 Jul", general: 28, tatkal: 9 },
  { day: "07 Jul", general: 42, tatkal: 16 }, { day: "08 Jul", general: 36, tatkal: 12 }, { day: "09 Jul", general: 46, tatkal: 18 },
  { day: "10 Jul", general: 48, tatkal: 20 },
]
const trafficMax = 70

const analyticsCards = [
  { label: "Total Bookings", value: "324", change: "+6%", sparkline: [40, 44, 42, 48, 50, 46, 52, 58], color: "#2563eb", formatValue: (v: number) => `${v} bookings` },
  { label: "Revenue", value: "₹4.13L", change: "+7%", sparkline: [34, 38, 36, 40, 44, 42, 48, 52], color: "#059669", formatValue: (v: number) => `₹${v}K` },
  { label: "Tatkal Bookings", value: "48", change: "+12%", sparkline: [4, 5, 4, 6, 7, 6, 8, 9], color: "#ea580c", formatValue: (v: number) => `${v} tatkal` },
  { label: "Waitlisted", value: "7", change: "-2%", bars: [2, 1, 2, 1, 1, 0, 1, 1], color: "bg-amber-500", formatValue: (v: number) => `${v} waitlisted` },
]

const miniStats = [
  { label: "Pending PNR Requests", value: "11", href: "/railways/pending-pnr", color: "bg-amber-500", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Issue Ticket", value: "16", href: "/railways/issue-ticket", color: "bg-emerald-600", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Reissue Requests", value: "5", href: "/railways/reissue", color: "bg-blue-600", icon: "M4 4v6h6M20 20v-6h-6M4.5 15a8 8 0 0014.9 2.5M19.5 9A8 8 0 004.6 6.5" },
  { label: "Refund Requests", value: "4", href: "/railways/refund-request", color: "bg-violet-600", icon: "M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6M12 1v22" },
]

const topTrains = [
  { name: "Mumbai Rajdhani", bookings: 96, pct: 100 },
  { name: "Howrah Rajdhani", bookings: 78, pct: 81 },
  { name: "Bhopal Shatabdi", bookings: 62, pct: 65 },
  { name: "Tejas Express", bookings: 45, pct: 47 },
  { name: "Kerala Express", bookings: 33, pct: 34 },
]

const recentBookings = [
  { pnr: "1234567890", passenger: "Rajesh Kumar", from: "NDLS", to: "MMCT", amount: "₹2,145", status: "Confirmed" },
  { pnr: "2345678901", passenger: "Priya Sharma", from: "NDLS", to: "HWH", amount: "₹2,890", status: "Confirmed" },
  { pnr: "3456789012", passenger: "Amit Singh", from: "NDLS", to: "BPL", amount: "₹4,320", status: "Pending" },
  { pnr: "4567890123", passenger: "Sneha Patel", from: "MMCT", to: "PUNE", amount: "₹1,440", status: "Confirmed" },
  { pnr: "5678901234", passenger: "Vikram Nair", from: "CSMT", to: "KYNR", amount: "₹5,800", status: "Cancelled" },
]

const statusColors: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

export default function RailwaysDashboardPage() {
  const [hoverDay, setHoverDay] = useState<number | null>(null)
  const [hoverTrain, setHoverTrain] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      {/* Row 1 — hero + revenue trend + confirmation rate */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-50 dark:bg-blue-500/10" />
          <div className="absolute -right-2 top-10 h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-500/10" />
          <div className="relative flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Railways Overview</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">324 bookings this month, 7 waitlisted awaiting confirmation.</p>
              <div className="mt-6 flex items-center gap-8">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Today&apos;s Bookings</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">28 <span className="text-xs font-semibold text-emerald-600">+6%</span></p>
                  <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full w-[64%] rounded-full bg-blue-600" /></div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Tatkal Success Rate</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">87% <span className="text-xs font-semibold text-emerald-600">+3%</span></p>
                  <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full w-[87%] rounded-full bg-emerald-600" /></div>
                </div>
              </div>
            </div>
            <div className="hidden h-44 w-44 flex-shrink-0 sm:block">
              <DotLottieReact
                src="https://lottie.host/e15264d3-8c74-4b80-a5a0-a72d8b987e90/wR3m7w7it2.lottie"
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
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Revenue</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10">+7%</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">₹4,12,800</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">across 324 bookings this month</p>
          <div className="mt-3">
            <AreaSparkline
              points={[34, 38, 36, 40, 44, 42, 48, 52]}
              comparePoints={[30, 33, 32, 35, 38, 37, 41, 45]}
              color="#2563eb"
              labels={last8Days}
              formatValue={(v) => `₹${v}K`}
              compareFormatValue={(v) => `₹${v}K`}
            />
            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1"><span className="h-0.5 w-3 rounded-full bg-blue-600" /> This period</span>
              <span className="flex items-center gap-1"><span className="h-0.5 w-3 rounded-full border-t border-dashed border-slate-400" /> Last period</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-2 self-start text-xs font-medium text-slate-500 dark:text-slate-400">Confirmation Rate</p>
          <DonutRing
            pct={78}
            color="#2563eb"
            label="Confirmed"
            breakdown={[
              { label: "Confirmed", value: 253, color: "bg-blue-600" },
              { label: "Waitlisted", value: 64, color: "bg-amber-400" },
              { label: "Cancelled", value: 7, color: "bg-red-400" },
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

      {/* Row 3 — mini icon stats (link to workflow pages) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {miniStats.map((s) => (
          <Link key={s.label} href={s.href} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/30">
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${s.color}`}>
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Row 4 — traffic chart + top trains */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Booking Traffic</h3>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-blue-600" /> General</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-sky-300" /> Tatkal</span>
            </div>
          </div>
          <div className="relative flex h-40 items-end gap-2">
            {trafficDays.map((d, i) => {
              const totalPct = ((d.general + d.tatkal) / trafficMax) * 100
              const dimmed = hoverDay !== null && hoverDay !== i
              return (
                <div key={d.day} className="flex h-full flex-1 flex-col items-center gap-1" onMouseEnter={() => setHoverDay(i)} onMouseLeave={() => setHoverDay(null)}>
                  <div className={`flex w-full flex-1 cursor-pointer flex-col justify-end gap-0.5 transition-opacity ${dimmed ? "opacity-40" : "opacity-100"}`}>
                    <div className="w-full rounded-t-sm bg-sky-300" style={{ height: `${(d.tatkal / trafficMax) * 100}%` }} />
                    <div className="w-full rounded-t-sm bg-blue-600" style={{ height: `${(d.general / trafficMax) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{d.day}</span>
                  {hoverDay === i && (
                    <div className="pointer-events-none absolute z-20" style={{ ...edgeAlign(((i + 0.5) / trafficDays.length) * 100), bottom: `calc(${totalPct}% + 22px)` }}>
                      <TooltipBox>
                        <p className="mb-1 font-semibold text-slate-800 dark:text-slate-100">{d.day}</p>
                        <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /><span className="text-slate-500 dark:text-slate-400">General</span><span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{d.general}</span></div>
                        <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sky-300" /><span className="text-slate-500 dark:text-slate-400">Tatkal</span><span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{d.tatkal}</span></div>
                      </TooltipBox>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Top Trains</h3>
          <div className="space-y-3">
            {topTrains.map((t, i) => (
              <div key={t.name} className="relative" onMouseEnter={() => setHoverTrain(i)} onMouseLeave={() => setHoverTrain(null)}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{t.name}</span>
                  <span className="text-slate-400 dark:text-slate-500">{t.bookings}</span>
                </div>
                <div className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className={`h-full rounded-full bg-blue-600 transition-opacity ${hoverTrain !== null && hoverTrain !== i ? "opacity-50" : "opacity-100"}`} style={{ width: `${t.pct}%` }} />
                </div>
                {hoverTrain === i && (
                  <div className="pointer-events-none absolute z-20 bottom-full left-1/2 mb-1.5 -translate-x-1/2">
                    <TooltipBox>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">Rank #{i + 1} · {t.bookings} bookings</p>
                    </TooltipBox>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5 — recent bookings */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recent Bookings</h3>
          <Link href="/railways/all-bookings" className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View all bookings →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">PNR</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {recentBookings.map((b) => (
                <tr key={b.pnr} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{b.pnr}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{b.passenger}</td>
                  <td className="px-6 py-3">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{b.from}</span>
                    <span className="mx-1 text-slate-400">→</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{b.to}</span>
                  </td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{b.amount}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
