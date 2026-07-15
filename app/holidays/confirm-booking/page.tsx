"use client"

import { useState } from "react"

type Row = { ref: string; client: string; package: string; destination: string; travel: string; agent: string }

const rows: Row[] = [
  { ref: "REQ-7231", client: "Rajesh Kumar", package: "Goa Beach Escape", destination: "Goa", travel: "12 Jul 2026", agent: "TravelBox" },
  { ref: "REQ-7232", client: "Priya Sharma", package: "Kerala Backwaters", destination: "Kerala", travel: "13 Jul 2026", agent: "FlyDeal" },
  { ref: "REQ-7233", client: "Amit Singh", package: "Manali Snow Adventure", destination: "Manali", travel: "14 Jul 2026", agent: "StarTravel" },
  { ref: "REQ-7234", client: "Sneha Patel", package: "Rajasthan Royal Tour", destination: "Rajasthan", travel: "15 Jul 2026", agent: "TravelBox" },
  { ref: "REQ-7235", client: "Deepa Menon", package: "Andaman Islands", destination: "Andaman", travel: "16 Jul 2026", agent: "QuickBook" },
]

function isValidBookingId(value: string) {
  return /^[A-Z0-9]{6,10}$/.test(value.trim().toUpperCase())
}

export default function HolidaysConfirmBookingPage() {
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [confirmed, setConfirmed] = useState<Record<string, { id: string; confirmedAt: string }>>({})

  const setInput = (ref: string, value: string) => {
    setInputs((s) => ({ ...s, [ref]: value.toUpperCase() }))
    setErrors((s) => ({ ...s, [ref]: "" }))
  }

  const confirmRow = (ref: string) => {
    const value = inputs[ref] || ""
    if (!isValidBookingId(value)) {
      setErrors((s) => ({ ...s, [ref]: "Enter a valid Booking ID (6-10 alphanumeric characters)" }))
      return
    }
    setConfirmed((s) => ({ ...s, [ref]: { id: value.trim().toUpperCase(), confirmedAt: "Just now" } }))
  }

  const pendingCount = rows.length - Object.keys(confirmed).length
  const confirmedCount = Object.keys(confirmed).length

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-pink-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">({rows.length})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Awaiting Confirmation <span className="ml-0.5 opacity-70">({pendingCount})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Confirmed <span className="ml-0.5 opacity-70">({confirmedCount})</span></button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search ref, client, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600">{pendingCount}</span>
          <span className="text-xs text-amber-600/70">Awaiting Confirmation</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{confirmedCount}</span>
          <span className="text-xs text-emerald-600/70">Confirmed Today</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">11</span>
          <span className="text-xs text-blue-600/70">Total Pax</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">4</span>
          <span className="text-xs text-violet-600/70">Agents Waiting</span>
        </div>
      </div>

      {/* Confirm booking table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Confirm Booking</h2>
          <p className="text-xs text-slate-400">Enter the operator&apos;s confirmed booking / voucher ID for a pending request</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Ref No.</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Package</th>
                <th className="px-6 py-3 text-left font-medium">Destination</th>
                <th className="px-6 py-3 text-left font-medium">Travel Date</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Enter Booking ID</th>
                <th className="px-6 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {rows.map((r) => {
                const isConfirmed = confirmed[r.ref]
                return (
                  <tr key={r.ref} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                    <td className="px-6 py-3 font-mono text-xs font-semibold text-pink-700 dark:text-pink-400">{r.ref}</td>
                    <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.client}</td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.package}</td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.destination}</td>
                    <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{r.travel}</td>
                    <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                    <td className="px-6 py-3">
                      {isConfirmed ? (
                        <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">{isConfirmed.id}</span>
                      ) : (
                        <>
                          <input
                            value={inputs[r.ref] || ""}
                            onChange={(e) => setInput(r.ref, e.target.value)}
                            placeholder="e.g. HOL08830"
                            maxLength={10}
                            className={`w-32 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${errors[r.ref] ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-pink-100 focus:border-pink-300"}`}
                          />
                          {errors[r.ref] && <p className="mt-1 text-[11px] text-red-500">{errors[r.ref]}</p>}
                        </>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {isConfirmed ? (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span>
                      ) : (
                        <button
                          onClick={() => confirmRow(r.ref)}
                          className="rounded-lg bg-pink-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-pink-600 transition-colors"
                        >
                          Confirm Booking
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recently confirmed bookings */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recently Confirmed Bookings</h2>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">{confirmedCount} confirmed</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Booking ID</th>
                <th className="px-6 py-3 text-left font-medium">Ref No.</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Destination</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Confirmed</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {rows.filter((r) => confirmed[r.ref]).map((r) => (
                <tr key={r.ref} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-pink-700 dark:text-pink-400">{confirmed[r.ref].id}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{r.ref}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.client}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.destination}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{confirmed[r.ref].confirmedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span></td>
                </tr>
              ))}
              {confirmedCount === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-400">No bookings confirmed yet in this session.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
