"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { calendarEvents, MODULES, parseAmount, type ModuleKey, type CalendarEvent } from "../lib/calendarEvents"
import { DonutRing, MiniBars } from "./charts"

type Scope = "all" | ModuleKey

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const statusColors: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

function isoOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function buildMonthGrid(year: number, month: number) {
  const startWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: { date: Date; iso: string; inMonth: boolean }[] = []
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, daysInPrevMonth - i)
    cells.push({ date: d, iso: isoOf(d), inMonth: false })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day)
    cells.push({ date: d, iso: isoOf(d), inMonth: true })
  }
  let next = 1
  while (cells.length < 42) {
    const d = new Date(year, month + 1, next++)
    cells.push({ date: d, iso: isoOf(d), inMonth: false })
  }
  return cells
}

function formatFullDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return `${d} ${MONTH_NAMES[m - 1]} ${y}`
}

export default function TravelCalendar({ defaultModule = "all" as Scope }: { defaultModule?: Scope }) {
  const today = useMemo(() => new Date(), [])
  const [cursor, setCursor] = useState(() => new Date(2026, 6, 1))
  const [scope, setScope] = useState<Scope>(defaultModule)
  const [selectedIso, setSelectedIso] = useState<string | null>(null)

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`

  const scopedEvents = useMemo(
    () => (scope === "all" ? calendarEvents : calendarEvents.filter((e) => e.module === scope)),
    [scope]
  )

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const e of scopedEvents) {
      if (!map.has(e.date)) map.set(e.date, [])
      map.get(e.date)!.push(e)
    }
    return map
  }, [scopedEvents])

  const grid = useMemo(() => buildMonthGrid(year, month), [year, month])

  const monthEvents = useMemo(
    () => scopedEvents.filter((e) => e.date.startsWith(monthPrefix)),
    [scopedEvents, monthPrefix]
  )

  const totalBookings = monthEvents.length
  const totalRevenue = monthEvents.reduce((sum, e) => sum + parseAmount(e.amount), 0)
  const confirmed = monthEvents.filter((e) => e.status === "Confirmed").length
  const pending = monthEvents.filter((e) => e.status === "Pending").length
  const confirmedPct = totalBookings ? Math.round((confirmed / totalBookings) * 100) : 0
  const confirmedRevenue = monthEvents.filter((e) => e.status === "Confirmed").reduce((sum, e) => sum + parseAmount(e.amount), 0)
  const confirmedRevenuePct = totalRevenue ? Math.round((confirmedRevenue / totalRevenue) * 100) : 0
  const avgBookingValue = totalBookings ? Math.round(totalRevenue / totalBookings) : 0

  const moduleCounts = (Object.keys(MODULES) as ModuleKey[])
    .map((k) => ({ key: k, count: calendarEvents.filter((e) => e.module === k && e.date.startsWith(monthPrefix)).length }))
    .sort((a, b) => b.count - a.count)
  const topModule = moduleCounts[0]
  const secondModule = moduleCounts[1]
  const allMonthCount = moduleCounts.reduce((s, m) => s + m.count, 0)
  const topModulePct = allMonthCount ? Math.round((topModule.count / allMonthCount) * 100) : 0

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const dailyCounts = Array.from({ length: daysInMonth }, (_, i) => eventsByDate.get(isoOf(new Date(year, month, i + 1)))?.length ?? 0)
  const dailyLabels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1} ${MONTH_NAMES[month].slice(0, 3)}`)
  const hasDailyData = dailyCounts.some((v) => v > 0)

  function gotoMonth(delta: number) {
    setCursor(new Date(year, month + delta, 1))
    setSelectedIso(null)
  }
  function gotoToday() {
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedIso(null)
  }

  const selectedEvents = selectedIso ? eventsByDate.get(selectedIso) ?? [] : []
  const scopeDotClass = scope === "all" ? "bg-indigo-600" : MODULES[scope].dot

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Travel Calendar</h2>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Bookings across every module in one view</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => gotoMonth(-1)}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            onClick={gotoToday}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Today
          </button>
          <span className="min-w-[9.5rem] text-center text-sm font-bold text-slate-900 dark:text-slate-100">{MONTH_NAMES[month]} {year}</span>
          <button
            onClick={() => gotoMonth(1)}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>

      {/* Module filter chips — module-wise view switcher */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setScope("all")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
            scope === "all" ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          All Modules
          <span className="opacity-75">({allMonthCount})</span>
        </button>
        {(Object.keys(MODULES) as ModuleKey[]).map((k) => {
          const m = MODULES[k]
          const count = moduleCounts.find((mc) => mc.key === k)?.count ?? 0
          const active = scope === k
          return (
            <button
              key={k}
              onClick={() => setScope(k)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                active ? `${m.bg} ${m.text} ring-1 ring-inset ring-current` : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${m.dot}`} />
              {m.label}
              <span className="opacity-75">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Stat cards — colored card + ring, with two breakdown tiles below */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-500/20 dark:bg-blue-500/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700/70 dark:text-blue-400/80">Total Bookings</p>
                <p className="mt-0.5 text-[11px] text-blue-700/50 dark:text-blue-400/50">{MONTH_NAMES[month]} {year}</p>
                <p className="mt-3 text-2xl font-bold text-blue-900 dark:text-blue-200">{totalBookings}</p>
              </div>
              <DonutRing pct={confirmedPct} color="#2563eb" label="confirmed" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-500/20 dark:bg-blue-500/5">
              <p className="text-[10px] font-medium text-blue-700/60 dark:text-blue-400/60">Confirmed</p>
              <p className="text-sm font-bold text-blue-900 dark:text-blue-200">{confirmed}</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-500/20 dark:bg-blue-500/5">
              <p className="text-[10px] font-medium text-blue-700/60 dark:text-blue-400/60">Pending</p>
              <p className="text-sm font-bold text-blue-900 dark:text-blue-200">{pending}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/70 dark:text-emerald-400/80">Revenue</p>
                <p className="mt-0.5 text-[11px] text-emerald-700/50 dark:text-emerald-400/50">{MONTH_NAMES[month]} {year}</p>
                <p className="mt-3 text-2xl font-bold text-emerald-900 dark:text-emerald-200">₹{totalRevenue.toLocaleString("en-IN")}</p>
              </div>
              <DonutRing pct={confirmedRevenuePct} color="#059669" label="secured" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/5">
              <p className="text-[10px] font-medium text-emerald-700/60 dark:text-emerald-400/60">Confirmed</p>
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">₹{confirmedRevenue.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/5">
              <p className="text-[10px] font-medium text-emerald-700/60 dark:text-emerald-400/60">Avg. Value</p>
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">₹{avgBookingValue.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5 dark:border-violet-500/20 dark:bg-violet-500/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-700/70 dark:text-violet-400/80">Top Module</p>
                <p className="mt-0.5 text-[11px] text-violet-700/50 dark:text-violet-400/50">{MONTH_NAMES[month]} {year}</p>
                <p className="mt-3 text-2xl font-bold text-violet-900 dark:text-violet-200">{MODULES[topModule.key].label}</p>
              </div>
              <DonutRing pct={topModulePct} color="#7c3aed" label="share" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3 dark:border-violet-500/20 dark:bg-violet-500/5">
              <p className="text-[10px] font-medium text-violet-700/60 dark:text-violet-400/60">{MODULES[topModule.key].label}</p>
              <p className="text-sm font-bold text-violet-900 dark:text-violet-200">{topModule.count}</p>
            </div>
            <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3 dark:border-violet-500/20 dark:bg-violet-500/5">
              <p className="text-[10px] font-medium text-violet-700/60 dark:text-violet-400/60">{secondModule ? MODULES[secondModule.key].label : "—"}</p>
              <p className="text-sm font-bold text-violet-900 dark:text-violet-200">{secondModule?.count ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily volume chart */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Daily Booking Volume</h3>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
            <span className={`h-2 w-2 rounded-full ${scopeDotClass}`} />
            {scope === "all" ? "All modules" : MODULES[scope].label}
          </span>
        </div>
        {hasDailyData ? (
          <MiniBars values={dailyCounts} color={scopeDotClass} labels={dailyLabels} formatValue={(v) => `${v} booking${v === 1 ? "" : "s"}`} />
        ) : (
          <p className="py-4 text-center text-xs text-slate-400 dark:text-slate-500">No bookings recorded for this month.</p>
        )}
      </div>

      {/* Calendar grid */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-800">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {grid.map((cell) => {
            const events = eventsByDate.get(cell.iso) ?? []
            const isToday = cell.iso === isoOf(today)
            const isSelected = cell.iso === selectedIso
            return (
              <button
                key={cell.iso}
                onClick={() => events.length > 0 && setSelectedIso(isSelected ? null : cell.iso)}
                disabled={events.length === 0}
                className={`relative flex min-h-[92px] flex-col items-start gap-1 border-b border-r border-slate-50 p-2 text-left transition-colors last:border-r-0 dark:border-slate-800/60 ${
                  !cell.inMonth ? "bg-slate-50/60 dark:bg-slate-800/20" : "bg-white dark:bg-slate-900"
                } ${isSelected ? "ring-2 ring-inset ring-indigo-500" : events.length > 0 ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60" : "cursor-default"}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    isToday ? "bg-indigo-600 text-white" : cell.inMonth ? "text-slate-700 dark:text-slate-200" : "text-slate-300 dark:text-slate-600"
                  }`}
                >
                  {cell.date.getDate()}
                </span>
                {events.length > 0 && (
                  <>
                    <div className="mt-auto flex w-full flex-wrap items-center gap-1">
                      {events.slice(0, 4).map((e) => (
                        <span key={e.id} className={`h-1.5 w-1.5 rounded-full ${MODULES[e.module].dot}`} />
                      ))}
                      {events.length > 4 && <span className="text-[10px] text-slate-400 dark:text-slate-500">+{events.length - 4}</span>}
                    </div>
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-slate-100 px-1.5 py-px text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {events.length}
                    </span>
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Day detail panel */}
      {selectedIso && (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatFullDate(selectedIso)}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">{selectedEvents.length} booking{selectedEvents.length === 1 ? "" : "s"}</p>
            </div>
            <button
              onClick={() => setSelectedIso(null)}
              aria-label="Close"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div className="space-y-2">
            {selectedEvents.map((e) => (
              <Link
                key={e.id}
                href={e.href}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/60"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`flex-shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold ${MODULES[e.module].bg} ${MODULES[e.module].text}`}>{MODULES[e.module].label}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{e.title}</p>
                    <p className="truncate text-xs text-slate-400 dark:text-slate-500">{e.subtitle}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{e.amount}</p>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColors[e.status]}`}>{e.status}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 text-[11px] text-slate-400 dark:text-slate-500">
        <span className="font-medium text-slate-500 dark:text-slate-400">Legend:</span>
        {(Object.keys(MODULES) as ModuleKey[]).map((k) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${MODULES[k].dot}`} />
            {MODULES[k].label}
          </span>
        ))}
      </div>
    </div>
  )
}
