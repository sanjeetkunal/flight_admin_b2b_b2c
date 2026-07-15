"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

type RequestStatus = "New Request" | "Verified" | "Approved" | "Rejected"

type CreditRequest = {
  id: number
  requestId: string
  agentId: string
  agentName: string
  currentLimit: string
  requestedLimit: string
  reason: string
  requestedOn: string
  status: RequestStatus
  verifiedOn: string
  decidedOn: string
}

const initialRequests: CreditRequest[] = [
  { id: 1, requestId: "CRQ-9001", agentId: "AG002", agentName: "FlyDeal Travel Agency", currentLimit: "₹3,00,000", requestedLimit: "₹5,00,000", reason: "Peak season booking volume increasing", requestedOn: "09 Jul, 10:15", status: "New Request", verifiedOn: "-", decidedOn: "-" },
  { id: 2, requestId: "CRQ-9002", agentId: "AG004", agentName: "QuickBook Tours", currentLimit: "₹1,50,000", requestedLimit: "₹2,50,000", reason: "Adding 3 new sub-agents under this account", requestedOn: "09 Jul, 08:40", status: "New Request", verifiedOn: "-", decidedOn: "-" },
  { id: 3, requestId: "CRQ-8996", agentId: "AG003", agentName: "StarTravel Solutions", currentLimit: "₹2,00,000", requestedLimit: "₹3,00,000", reason: "Large corporate group booking pipeline", requestedOn: "08 Jul, 17:50", status: "Verified", verifiedOn: "08 Jul, 18:30", decidedOn: "-" },
  { id: 4, requestId: "CRQ-8981", agentId: "AG006", agentName: "Disha Travels", currentLimit: "₹1,00,000", requestedLimit: "₹1,50,000", reason: "Regular repayment history, requesting higher limit", requestedOn: "07 Jul, 12:10", status: "Approved", verifiedOn: "07 Jul, 13:00", decidedOn: "07 Jul, 15:20" },
  { id: 5, requestId: "CRQ-8972", agentId: "AG008", agentName: "Global Yatra Agency", currentLimit: "₹2,50,000", requestedLimit: "₹4,00,000", reason: "Requested increase despite pending dues", requestedOn: "06 Jul, 09:30", status: "Rejected", verifiedOn: "06 Jul, 10:15", decidedOn: "06 Jul, 11:00" },
]

const statusColors: Record<RequestStatus, string> = {
  "New Request": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Verified: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

export default function CreditUploadPage() {
  const [requests, setRequests] = useState<CreditRequest[]>(initialRequests)
  const [statusFilter, setStatusFilter] = useState("All")
  const [dialog, setDialog] = useState<DialogState>(null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)

  const closeDialog = () => { setDialog(null); setConfirmAction(null) }
  const runConfirm = () => { confirmAction?.(); closeDialog() }

  const filtered = requests.filter((r) => statusFilter === "All" || r.status === statusFilter)

  const counts = {
    All: requests.length,
    "New Request": requests.filter((r) => r.status === "New Request").length,
    Verified: requests.filter((r) => r.status === "Verified").length,
    Approved: requests.filter((r) => r.status === "Approved").length,
    Rejected: requests.filter((r) => r.status === "Rejected").length,
  }

  const handleVerify = (r: CreditRequest) => {
    setDialog({
      mode: "confirm",
      title: `Verify Request · ${r.agentName}`,
      summary: [
        { label: "Agent ID", value: r.agentId },
        { label: "Current Limit", value: r.currentLimit },
        { label: "Requested Limit", value: r.requestedLimit },
        { label: "Reason", value: r.reason },
      ],
      details: [],
      confirmLabel: "Mark Verified",
    })
    setConfirmAction(() => () => {
      setRequests((prev) => prev.map((x) => x.id === r.id ? { ...x, status: "Verified", verifiedOn: "Just now" } : x))
    })
  }

  const handleApprove = (r: CreditRequest) => {
    setDialog({
      mode: "approve",
      title: `${r.requestId} · ${r.agentName}`,
      summary: [
        { label: "Agent ID", value: r.agentId },
        { label: "Current Limit", value: r.currentLimit },
        { label: "Requested Limit", value: r.requestedLimit },
        { label: "Verified On", value: r.verifiedOn },
      ],
      details: [],
      confirmLabel: "Approve",
    })
    setConfirmAction(() => () => {
      setRequests((prev) => prev.map((x) => x.id === r.id ? { ...x, status: "Approved", decidedOn: "Just now", currentLimit: r.requestedLimit } : x))
    })
  }

  const handleReject = (r: CreditRequest) => {
    setDialog({
      mode: "reject",
      title: `${r.requestId} · ${r.agentName}`,
      summary: [
        { label: "Agent ID", value: r.agentId },
        { label: "Current Limit", value: r.currentLimit },
        { label: "Requested Limit", value: r.requestedLimit },
        { label: "Verified On", value: r.verifiedOn },
      ],
      details: [],
      confirmLabel: "Reject",
    })
    setConfirmAction(() => () => {
      setRequests((prev) => prev.map((x) => x.id === r.id ? { ...x, status: "Rejected", decidedOn: "Just now" } : x))
    })
  }

  const viewRequest = (r: CreditRequest) => setDialog({
    mode: "view",
    title: `${r.requestId} · ${r.agentName}`,
    summary: [],
    details: [
      { label: "Request ID", value: r.requestId },
      { label: "Agent ID", value: r.agentId },
      { label: "Agency Name", value: r.agentName },
      { label: "Current Credit Limit", value: r.currentLimit },
      { label: "Requested Credit Limit", value: r.requestedLimit },
      { label: "Reason", value: r.reason },
      { label: "Requested On", value: r.requestedOn },
      { label: "Verified On", value: r.verifiedOn },
      { label: "Decided On", value: r.decidedOn },
      { label: "Status", value: r.status },
    ],
  })

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          {(["All", "New Request", "Verified", "Approved", "Rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${statusFilter === s ? "bg-blue-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
            >
              {s} <span className="ml-0.5 opacity-70">({counts[s]})</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search agent, request ID..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600">{counts["New Request"]}</span>
          <span className="text-xs text-amber-600/70">Awaiting Verification</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-sky-100 bg-sky-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          <span className="text-sm font-bold text-sky-600">{counts.Verified}</span>
          <span className="text-xs text-sky-600/70">Verified, Awaiting Decision</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{counts.Approved}</span>
          <span className="text-xs text-emerald-600/70">Approved</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600">{counts.Rejected}</span>
          <span className="text-xs text-red-600/70">Rejected</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Agent Credit Upload Requests</h2>
            <p className="text-xs text-slate-400">Verify agent-submitted credit limit requests before approving or rejecting</p>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">{counts["New Request"]} new</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Request ID</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Current Limit</th>
                <th className="px-6 py-3 text-left font-medium">Requested Limit</th>
                <th className="px-6 py-3 text-left font-medium">Reason</th>
                <th className="px-6 py-3 text-left font-medium">Requested On</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{r.requestId}</td>
                  <td className="px-6 py-3">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{r.agentName}</p>
                    <p className="font-mono text-xs text-slate-400">{r.agentId}</p>
                  </td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.currentLimit}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.requestedLimit}</td>
                  <td className="px-6 py-3 max-w-xs truncate text-xs text-slate-600 dark:text-slate-300">{r.reason}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{r.requestedOn}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      {r.status === "New Request" && (
                        <button onClick={() => handleVerify(r)} className="text-xs text-violet-600 hover:text-violet-800 font-medium">Verify</button>
                      )}
                      {r.status === "Verified" && (
                        <>
                          <button onClick={() => handleApprove(r)} className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Approve</button>
                          <button onClick={() => handleReject(r)} className="text-xs text-red-500 hover:text-red-700 font-medium">Reject</button>
                        </>
                      )}
                      {(r.status === "Approved" || r.status === "Rejected") && (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                      <button onClick={() => viewRequest(r)} className="text-xs text-slate-400 hover:text-slate-600">View</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-sm text-slate-400">No requests in this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {filtered.length} of {requests.length} requests</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-600 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>

      <RecordDialog state={dialog} onClose={closeDialog} onConfirm={runConfirm} />
    </div>
  )
}
