"use client"

import { useState } from "react"
import Link from "next/link"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { edgeAlign, Sparkline, AreaSparkline, MiniBars, DonutRing, TooltipBox } from "../components/charts"

const last8Days = ["07 Jul", "08 Jul", "09 Jul", "10 Jul", "11 Jul", "12 Jul", "13 Jul", "14 Jul"]
const trafficDays = [
  { day: "01 Jul", domestic: 12, intl: 4 }, { day: "02 Jul", domestic: 15, intl: 5 }, { day: "03 Jul", domestic: 10, intl: 3 },
  { day: "04 Jul", domestic: 18, intl: 6 }, { day: "05 Jul", domestic: 20, intl: 7 }, { day: "06 Jul", domestic: 14, intl: 4 },
  { day: "07 Jul", domestic: 22, intl: 9 }, { day: "08 Jul", domestic: 19, intl: 6 }, { day: "09 Jul", domestic: 24, intl: 10 },
  { day: "10 Jul", domestic: 26, intl: 11 },
]
const trafficMax = 40

const analyticsCards = [
  { label: "Total Packages", value: "67", change: "+11%", sparkline: [40, 44, 42, 50, 55, 52, 60, 67], color: "#db2777", formatValue: (v: number) => `${v} packages` },
  { label: "Revenue", value: "₹7.21L", change: "+9%", sparkline: [50, 55, 53, 58, 62, 60, 68, 72], color: "#059669", formatValue: (v: number) => `₹${v}K` },
  { label: "Avg. Package Value", value: "₹1,07,600", change: "+4%", sparkline: [98, 100, 102, 99, 104, 106, 105, 107], color: "#7c3aed", formatValue: (v: number) => `₹${v}00` },
  { label: "Cancellations", value: "4", change: "-2%", bars: [1, 0, 1, 1, 0, 1, 0, 0], color: "bg-red-500", formatValue: (v: number) => `${v} cancelled` },
]

const miniStats = [
  { label: "Pending Requests", value: "9", href: "/holidays/pending-requests", color: "bg-amber-500", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Confirm Booking", value: "6", href: "/holidays/confirm-booking", color: "bg-emerald-600", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Amendment Request", value: "4", href: "/holidays/amendment-request", color: "bg-pink-600", icon: "M4 4v6h6M20 20v-6h-6M4.5 15a8 8 0 0014.9 2.5M19.5 9A8 8 0 004.6 6.5" },
  { label: "Refund Request", value: "3", href: "/holidays/refund-request", color: "bg-violet-600", icon: "M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6M12 1v22" },
]

const topDestinations = [
  { name: "Goa", bookings: 22, pct: 100 },
  { name: "Kerala", bookings: 17, pct: 77 },
  { name: "Manali", bookings: 13, pct: 59 },
  { name: "Rajasthan", bookings: 10, pct: 45 },
  { name: "Thailand", bookings: 8, pct: 36 },
]

const recentBookings = [
  { id: "HOL08821", client: "Sneha Patel", package: "Goa Beach Escape", from: "DEL", to: "GOI", amount: "₹84,000", status: "Confirmed" },
  { id: "HOL08822", client: "Rahul Sharma", package: "Kerala Backwaters", from: "BOM", to: "COK", amount: "₹62,000", status: "Confirmed" },
  { id: "HOL08823", client: "Meera Iyer", package: "Manali Snow Adventure", from: "DEL", to: "KUU", amount: "₹1,52,000", status: "Pending" },
  { id: "HOL08824", client: "Vikram Nair", package: "Rajasthan Royal Tour", from: "BOM", to: "JAI", amount: "₹98,000", status: "Confirmed" },
  { id: "HOL08827", client: "Kavita Reddy", package: "Thailand Bangkok Pattaya", from: "DEL", to: "BKK", amount: "₹1,45,000", status: "Cancelled" },
]

const statusColors: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

export default function HolidaysDashboardPage() {
  const [hoverDay, setHoverDay] = useState<number | null>(null)
  const [hoverDest, setHoverDest] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      {/* Row 1 — hero + revenue trend + confirmation rate */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-50 dark:bg-pink-500/10" />
          <div className="absolute -right-2 top-10 h-16 w-16 rounded-full bg-rose-50 dark:bg-rose-500/10" />
          <div className="relative flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Holidays Overview</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">67 packages this month, 9 requests awaiting confirmation.</p>
              <div className="mt-6 flex items-center gap-8">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Today&apos;s Bookings</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">6 <span className="text-xs font-semibold text-emerald-600">+11%</span></p>
                  <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full w-[68%] rounded-full bg-pink-600" /></div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Confirmation Turnaround</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">85% <span className="text-xs font-semibold text-emerald-600">+3%</span></p>
                  <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-full w-[85%] rounded-full bg-emerald-600" /></div>
                </div>
              </div>
            </div>
            <div className="hidden h-44 w-44 flex-shrink-0 sm:block">
              <DotLottieReact
                src="https://lottie.host/497f641f-238d-41ee-b734-85086386ce5e/FJulMyyYqj.lottie"
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
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10">+9%</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">₹7,21,500</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">across 67 packages this month</p>
          <div className="mt-3">
            <AreaSparkline
              points={[50, 55, 53, 58, 62, 60, 68, 72]}
              comparePoints={[45, 48, 47, 52, 56, 54, 60, 64]}
              color="#db2777"
              labels={last8Days}
              formatValue={(v) => `₹${v}K`}
              compareFormatValue={(v) => `₹${v}K`}
            />
            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1"><span className="h-0.5 w-3 rounded-full bg-pink-600" /> This period</span>
              <span className="flex items-center gap-1"><span className="h-0.5 w-3 rounded-full border-t border-dashed border-slate-400" /> Last period</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-2 self-start text-xs font-medium text-slate-500 dark:text-slate-400">Confirmation Rate</p>
          <DonutRing
            pct={79}
            color="#db2777"
            label="Confirmed"
            breakdown={[
              { label: "Confirmed", value: 53, color: "bg-pink-600" },
              { label: "Pending", value: 10, color: "bg-amber-400" },
              { label: "Cancelled", value: 4, color: "bg-red-400" },
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
          <Link key={s.label} href={s.href} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors hover:border-pink-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-pink-500/30">
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

      {/* Row 4 — traffic chart + top destinations */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Booking Traffic</h3>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-pink-600" /> Domestic</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-rose-300" /> International</span>
            </div>
          </div>
          <div className="relative flex h-40 items-end gap-2">
            {trafficDays.map((d, i) => {
              const totalPct = ((d.domestic + d.intl) / trafficMax) * 100
              const dimmed = hoverDay !== null && hoverDay !== i
              return (
                <div key={d.day} className="flex h-full flex-1 flex-col items-center gap-1" onMouseEnter={() => setHoverDay(i)} onMouseLeave={() => setHoverDay(null)}>
                  <div className={`flex w-full flex-1 cursor-pointer flex-col justify-end gap-0.5 transition-opacity ${dimmed ? "opacity-40" : "opacity-100"}`}>
                    <div className="w-full rounded-t-sm bg-rose-300" style={{ height: `${(d.intl / trafficMax) * 100}%` }} />
                    <div className="w-full rounded-t-sm bg-pink-600" style={{ height: `${(d.domestic / trafficMax) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{d.day}</span>
                  {hoverDay === i && (
                    <div className="pointer-events-none absolute z-20" style={{ ...edgeAlign(((i + 0.5) / trafficDays.length) * 100), bottom: `calc(${totalPct}% + 22px)` }}>
                      <TooltipBox>
                        <p className="mb-1 font-semibold text-slate-800 dark:text-slate-100">{d.day}</p>
                        <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-pink-600" /><span className="text-slate-500 dark:text-slate-400">Domestic</span><span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{d.domestic}</span></div>
                        <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose-300" /><span className="text-slate-500 dark:text-slate-400">International</span><span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{d.intl}</span></div>
                      </TooltipBox>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Top Destinations</h3>
          <div className="space-y-3">
            {topDestinations.map((d, i) => (
              <div key={d.name} className="relative" onMouseEnter={() => setHoverDest(i)} onMouseLeave={() => setHoverDest(null)}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{d.name}</span>
                  <span className="text-slate-400 dark:text-slate-500">{d.bookings}</span>
                </div>
                <div className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className={`h-full rounded-full bg-pink-600 transition-opacity ${hoverDest !== null && hoverDest !== i ? "opacity-50" : "opacity-100"}`} style={{ width: `${d.pct}%` }} />
                </div>
                {hoverDest === i && (
                  <div className="pointer-events-none absolute z-20 bottom-full left-1/2 mb-1.5 -translate-x-1/2">
                    <TooltipBox>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">Rank #{i + 1} · {d.bookings} bookings</p>
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
          <Link href="/holidays/all-bookings" className="text-xs font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400">View all bookings →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">ID</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Package</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-pink-700 dark:text-pink-400">{b.id}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{b.client}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{b.package}</td>
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
