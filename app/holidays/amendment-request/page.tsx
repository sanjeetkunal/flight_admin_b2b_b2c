"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

type Amendment = { ref: string; bookingId: string; client: string; package: string; originalDate: string; requestedDate: string; priceDiff: string; agent: string; requestedOn: string; status: "New Request" | "Amended" | "Rejected" }

const initialAmendments: Amendment[] = [
  { ref: "AMD-3001", bookingId: "HOL08821", client: "Sneha Patel", package: "Goa Beach Escape", originalDate: "05 Jul 2026", requestedDate: "12 Jul 2026", priceDiff: "₹3,200", agent: "TravelBox", requestedOn: "09 Jul, 12:05", status: "New Request" },
  { ref: "AMD-3002", bookingId: "HOL08824", client: "Vikram Nair", package: "Rajasthan Royal Tour", originalDate: "20 Jul 2026", requestedDate: "27 Jul 2026", priceDiff: "₹6,150", agent: "TravelBox", requestedOn: "09 Jul, 10:40", status: "New Request" },
  { ref: "AMD-3003", bookingId: "HOL08826", client: "Deepak Singh", package: "Shimla Manali Combo", originalDate: "01 Aug 2026", requestedDate: "08 Aug 2026", priceDiff: "₹4,100", agent: "FlyDeal", requestedOn: "08 Jul, 17:15", status: "New Request" },
  { ref: "AMD-2998", bookingId: "HOL08822", client: "Rahul Sharma", package: "Kerala Backwaters", originalDate: "08 Jul 2026", requestedDate: "15 Jul 2026", priceDiff: "₹2,800", agent: "FlyDeal", requestedOn: "07 Jul, 09:30", status: "Amended" },
  { ref: "AMD-2991", bookingId: "HOL08823", client: "Meera Iyer", package: "Manali Snow Adventure", originalDate: "15 Jul 2026", requestedDate: "18 Jul 2026", priceDiff: "₹1,500", agent: "StarTravel", requestedOn: "06 Jul, 15:50", status: "Rejected" },
]

const statusColors: Record<string, string> = {
  "New Request": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Amended: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

export default function HolidaysAmendmentRequestPage() {
  const [amendments, setAmendments] = useState(initialAmendments)
  const [dialog, setDialog] = useState<DialogState>(null)

  const newCount = amendments.filter((a) => a.status === "New Request").length
  const amendedCount = amendments.filter((a) => a.status === "Amended").length
  const rejectedCount = amendments.filter((a) => a.status === "Rejected").length

  const summary = (a: Amendment) => [
    { label: "Booking ID", value: a.bookingId },
    { label: "New Travel Date", value: a.requestedDate },
    { label: "Package Price Diff.", value: a.priceDiff },
    { label: "Agent", value: a.agent },
  ]

  const details = (a: Amendment) => [
    { label: "Ref No.", value: a.ref },
    { label: "Booking ID", value: a.bookingId },
    { label: "Client", value: a.client },
    { label: "Package", value: a.package },
    { label: "Original Date", value: a.originalDate },
    { label: "Requested Date", value: a.requestedDate },
    { label: "Package Price Diff.", value: a.priceDiff },
    { label: "Agent", value: a.agent },
    { label: "Requested On", value: a.requestedOn },
    { label: "Status", value: a.status },
  ]

  const setStatus = (ref: string, status: Amendment["status"]) => setAmendments((prev) => prev.map((a) => a.ref === ref ? { ...a, status } : a))

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-sm">All <span className="ml-0.5 opacity-70">({amendments.length})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">New Request <span className="ml-0.5 opacity-70">({newCount})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Amended <span className="ml-0.5 opacity-70">({amendedCount})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Rejected <span className="ml-0.5 opacity-70">({rejectedCount})</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search booking ID, client, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600">{newCount}</span>
          <span className="text-xs text-amber-600/70">New Requests</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">₹13,450</span>
          <span className="text-xs text-blue-600/70">Price Difference Due</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{amendedCount}</span>
          <span className="text-xs text-emerald-600/70">Amended Today</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600">{rejectedCount}</span>
          <span className="text-xs text-red-600/70">Rejected</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Amendment Requests</h2>
            <p className="text-xs text-slate-400">Travel date / destination change requests raised by agents on confirmed packages</p>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">{newCount} new</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Ref No.</th>
                <th className="px-6 py-3 text-left font-medium">Booking ID</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Package</th>
                <th className="px-6 py-3 text-left font-medium">Original Date</th>
                <th className="px-6 py-3 text-left font-medium">Requested Date</th>
                <th className="px-6 py-3 text-left font-medium">Price Diff.</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Requested On</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {amendments.map((a) => (
                <tr key={a.ref} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{a.ref}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{a.bookingId}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{a.client}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{a.package}</td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{a.originalDate}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{a.requestedDate}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{a.priceDiff}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{a.agent}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{a.requestedOn}</td>
                  <td className="px-6 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[a.status]}`}>{a.status}</span></td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      {a.status === "New Request" ? (
                        <>
                          <button
                            onClick={() => setDialog({ mode: "approve", title: `${a.ref} · ${a.client}`, summary: summary(a), details: [], confirmLabel: "Approve" })}
                            className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setDialog({ mode: "reject", title: `${a.ref} · ${a.client}`, summary: summary(a), details: [], confirmLabel: "Reject" })}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                      <button
                        onClick={() => setDialog({ mode: "view", title: `${a.ref} · ${a.client}`, summary: [], details: details(a) })}
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
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {amendments.length} of {amendments.length} amendment requests</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-500 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>

      <RecordDialog
        state={dialog}
        onClose={() => setDialog(null)}
        onConfirm={() => {
          if (dialog?.mode === "approve") setStatus(dialog.title.split(" · ")[0], "Amended")
          if (dialog?.mode === "reject") setStatus(dialog.title.split(" · ")[0], "Rejected")
          setDialog(null)
        }}
      />
    </div>
  )
}
