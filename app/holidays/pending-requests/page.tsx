"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

type Request = { ref: string; client: string; package: string; destination: string; travel: string; pax: string; agent: string; requestedOn: string }

const requests: Request[] = [
  { ref: "REQ-7231", client: "Rajesh Kumar", package: "Goa Beach Escape", destination: "Goa", travel: "12 Jul 2026", pax: "2A 2C", agent: "TravelBox", requestedOn: "09 Jul, 10:12" },
  { ref: "REQ-7232", client: "Priya Sharma", package: "Kerala Backwaters", destination: "Kerala", travel: "13 Jul 2026", pax: "2A", agent: "FlyDeal", requestedOn: "09 Jul, 09:48" },
  { ref: "REQ-7233", client: "Amit Singh", package: "Manali Snow Adventure", destination: "Manali", travel: "14 Jul 2026", pax: "4A", agent: "StarTravel", requestedOn: "08 Jul, 22:05" },
  { ref: "REQ-7234", client: "Sneha Patel", package: "Rajasthan Royal Tour", destination: "Rajasthan", travel: "15 Jul 2026", pax: "2A", agent: "TravelBox", requestedOn: "08 Jul, 18:30" },
  { ref: "REQ-7235", client: "Deepa Menon", package: "Andaman Islands", destination: "Andaman", travel: "16 Jul 2026", pax: "2A 1C", agent: "QuickBook", requestedOn: "08 Jul, 15:20" },
  { ref: "REQ-7236", client: "Vikram Nair", package: "Shimla Manali Combo", destination: "Himachal", travel: "17 Jul 2026", pax: "2A 2C", agent: "FlyDeal", requestedOn: "07 Jul, 11:40" },
  { ref: "REQ-7237", client: "Ravi Gupta", package: "Thailand Bangkok Pattaya", destination: "Thailand", travel: "18 Jul 2026", pax: "2A", agent: "StarTravel", requestedOn: "07 Jul, 09:15" },
]

export default function HolidaysPendingRequestsPage() {
  const [dialog, setDialog] = useState<DialogState>(null)

  const summary = (r: Request) => [
    { label: "Package", value: r.package },
    { label: "Destination", value: r.destination },
    { label: "Travel Date", value: r.travel },
    { label: "Agent", value: r.agent },
  ]

  const details = (r: Request) => [
    { label: "Ref No.", value: r.ref },
    { label: "Client", value: r.client },
    { label: "Package", value: r.package },
    { label: "Destination", value: r.destination },
    { label: "Travel Date", value: r.travel },
    { label: "Pax", value: r.pax },
    { label: "Agent", value: r.agent },
    { label: "Requested On", value: r.requestedOn },
    { label: "Status", value: "Pending" },
  ]

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-sm">All <span className="ml-0.5 opacity-70">({requests.length})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Domestic <span className="ml-0.5 opacity-70">(6)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">International <span className="ml-0.5 opacity-70">(1)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Oldest First</button>
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
          <span className="text-sm font-bold text-amber-600">{requests.length}</span>
          <span className="text-xs text-amber-600/70">Pending</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">17</span>
          <span className="text-xs text-blue-600/70">Total Pax</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">2 days</span>
          <span className="text-xs text-violet-600/70">Oldest</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">5</span>
          <span className="text-xs text-emerald-600/70">Agents</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Pending Package Requests</h2>
            <p className="text-xs text-slate-400">Package requests raised by agents that are yet to be confirmed</p>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">{requests.length} pending</span>
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
                <th className="px-6 py-3 text-left font-medium">Pax</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Requested On</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {requests.map((r) => (
                <tr key={r.ref} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{r.ref}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.client}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.package}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.destination}</td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{r.travel}</td>
                  <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">{r.pax}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{r.requestedOn}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDialog({ mode: "approve", title: `${r.ref} · ${r.client}`, summary: summary(r), details: [], confirmLabel: "Approve" })}
                        className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setDialog({ mode: "reject", title: `${r.ref} · ${r.client}`, summary: summary(r), details: [], confirmLabel: "Reject" })}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => setDialog({ mode: "view", title: `${r.ref} · ${r.client}`, summary: [], details: details(r) })}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {requests.length} of {requests.length} pending requests</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-500 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>

      <RecordDialog state={dialog} onClose={() => setDialog(null)} onConfirm={() => setDialog(null)} />
    </div>
  )
}
