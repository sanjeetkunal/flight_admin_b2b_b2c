"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

type Refund = { ref: string; bookingId: string; client: string; package: string; destination: string; amount: string; reason: string; agent: string; requestedOn: string; status: "New Request" | "Approved" | "Rejected" }

const initialRefunds: Refund[] = [
  { ref: "RFR-6001", bookingId: "HOL08827", client: "Kavita Reddy", package: "Thailand Bangkok Pattaya", destination: "Thailand", amount: "₹1,45,000", reason: "Visa rejected", agent: "StarTravel", requestedOn: "09 Jul, 11:20", status: "New Request" },
  { ref: "RFR-6002", bookingId: "HOL08823", client: "Meera Iyer", package: "Manali Snow Adventure", destination: "Manali", amount: "₹1,52,000", reason: "Operator cancelled package", agent: "StarTravel", requestedOn: "09 Jul, 09:05", status: "New Request" },
  { ref: "RFR-6003", bookingId: "HOL08825", client: "Anita Roy", package: "Andaman Islands", destination: "Andaman", amount: "₹1,12,500", reason: "Client request", agent: "QuickBook", requestedOn: "08 Jul, 20:40", status: "New Request" },
  { ref: "RFR-5998", bookingId: "HOL08820", client: "Priya Sharma", package: "Coorg Coffee Trail", destination: "Coorg", amount: "₹38,500", reason: "Duplicate booking", agent: "TravelBox", requestedOn: "07 Jul, 14:12", status: "Approved" },
  { ref: "RFR-5991", bookingId: "HOL08819", client: "Anuj Rawat", package: "Dubai City Tour", destination: "Dubai", amount: "₹95,750", reason: "Visa rejected", agent: "QuickBook", requestedOn: "06 Jul, 10:50", status: "Rejected" },
]

const statusColors: Record<string, string> = {
  "New Request": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

export default function HolidaysRefundRequestPage() {
  const [refunds, setRefunds] = useState(initialRefunds)
  const [dialog, setDialog] = useState<DialogState>(null)

  const newCount = refunds.filter((r) => r.status === "New Request").length
  const approvedCount = refunds.filter((r) => r.status === "Approved").length
  const rejectedCount = refunds.filter((r) => r.status === "Rejected").length

  const summary = (r: Refund) => [
    { label: "Booking ID", value: r.bookingId },
    { label: "Refund Amount", value: r.amount },
    { label: "Reason", value: r.reason },
    { label: "Agent", value: r.agent },
  ]

  const details = (r: Refund) => [
    { label: "Ref No.", value: r.ref },
    { label: "Booking ID", value: r.bookingId },
    { label: "Client", value: r.client },
    { label: "Package", value: r.package },
    { label: "Destination", value: r.destination },
    { label: "Refund Amount", value: r.amount },
    { label: "Reason", value: r.reason },
    { label: "Agent", value: r.agent },
    { label: "Requested On", value: r.requestedOn },
    { label: "Status", value: r.status },
  ]

  const setStatus = (ref: string, status: Refund["status"]) => setRefunds((prev) => prev.map((r) => r.ref === ref ? { ...r, status } : r))

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">({refunds.length})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">New Request <span className="ml-0.5 opacity-70">({newCount})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Approved <span className="ml-0.5 opacity-70">({approvedCount})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Rejected <span className="ml-0.5 opacity-70">({rejectedCount})</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Oldest First</button>
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
          <span className="text-sm font-bold text-blue-600">₹4,09,500</span>
          <span className="text-xs text-blue-600/70">Requested Value</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{approvedCount}</span>
          <span className="text-xs text-emerald-600/70">Approved Today</span>
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
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Refund Requests</h2>
            <p className="text-xs text-slate-400">Refund requests raised by agents on cancelled packages, awaiting admin approval</p>
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
                <th className="px-6 py-3 text-left font-medium">Refund Amount</th>
                <th className="px-6 py-3 text-left font-medium">Reason</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Requested On</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {refunds.map((r) => (
                <tr key={r.ref} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{r.ref}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{r.bookingId}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.client}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.package}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.amount}</td>
                  <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">{r.reason}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{r.requestedOn}</td>
                  <td className="px-6 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[r.status]}`}>{r.status}</span></td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      {r.status === "New Request" ? (
                        <>
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
                        </>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
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
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {refunds.length} of {refunds.length} refund requests</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-500 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>

      <RecordDialog
        state={dialog}
        onClose={() => setDialog(null)}
        onConfirm={() => {
          if (dialog?.mode === "approve") setStatus(dialog.title.split(" · ")[0], "Approved")
          if (dialog?.mode === "reject") setStatus(dialog.title.split(" · ")[0], "Rejected")
          setDialog(null)
        }}
      />
    </div>
  )
}
