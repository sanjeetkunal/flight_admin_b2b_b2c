"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"
import Pagination from "../../components/Pagination"

const PAGE_SIZE = 5

type NewRequest = { ref: string; pnr: string; passenger: string; airline: string; from: string; to: string; amount: string; reason: string; agent: string; requestedOn: string; status: "New Request" | "Rejected" }
type InProcess = { pnr: string; passenger: string; airline: string; from: string; to: string; cancelledOn: string; amount: string; reason: string; agent: string; status: "In Process" | "Awaiting Bank" | "Overdue" | "Refunded" }

const initialRequests: NewRequest[] = [
  { ref: "RFR-5001", pnr: "IX234", passenger: "Deepa Menon", airline: "Air Asia", from: "COK", to: "DEL", amount: "₹4,850", reason: "Passenger request", agent: "QuickBook", requestedOn: "09 Jul, 11:20", status: "New Request" },
  { ref: "RFR-5002", pnr: "6E4821", passenger: "Ravi Gupta", airline: "IndiGo", from: "DEL", to: "HYD", amount: "₹8,900", reason: "Flight rescheduled", agent: "StarTravel", requestedOn: "09 Jul, 09:05", status: "New Request" },
  { ref: "RFR-5003", pnr: "SQ422", passenger: "Meera Iyer", airline: "Singapore Air", from: "DEL", to: "SIN", amount: "₹92,000", reason: "Duplicate booking", agent: "FlyDeal", requestedOn: "08 Jul, 20:40", status: "New Request" },
  { ref: "RFR-4991", pnr: "EK501", passenger: "Anuj Rawat", airline: "Emirates", from: "BOM", to: "DXB", amount: "₹50,750", reason: "Visa rejected", agent: "QuickBook", requestedOn: "06 Jul, 10:50", status: "Rejected" },
]

const initialInProcess: InProcess[] = [
  { pnr: "6E4821", passenger: "Ravi Gupta", airline: "IndiGo", from: "DEL", to: "HYD", cancelledOn: "02 Jul 2026", amount: "₹8,900", reason: "Flight rescheduled", agent: "StarTravel", status: "In Process" },
  { pnr: "SQ422", passenger: "Meera Iyer", airline: "Singapore Air", from: "DEL", to: "SIN", cancelledOn: "24 Jun 2026", amount: "₹92,000", reason: "Duplicate booking", agent: "FlyDeal", status: "Overdue" },
  { pnr: "G8502", passenger: "Vikram Nair", airline: "Go First", from: "BOM", to: "DEL", cancelledOn: "03 Jul 2026", amount: "₹5,600", reason: "Passenger request", agent: "FlyDeal", status: "In Process" },
  { pnr: "AI1045", passenger: "Priya Sharma", airline: "Air India", from: "BOM", to: "DEL", cancelledOn: "30 Jun 2026", amount: "₹22,100", reason: "Airline cancelled flight", agent: "TravelBox", status: "Awaiting Bank" },
]

const reqStatusColors: Record<string, string> = {
  "New Request": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

const procStatusColors: Record<string, string> = {
  "In Process": "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  "Awaiting Bank": "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  Overdue: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  Refunded: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
}

export default function FlightsRefundRequestPage() {
  const [tab, setTab] = useState<"new" | "process">("new")
  const [requests, setRequests] = useState(initialRequests)
  const [inProcess, setInProcess] = useState(initialInProcess)
  const [dialog, setDialog] = useState<DialogState>(null)
  const [reqPage, setReqPage] = useState(1)
  const [procPage, setProcPage] = useState(1)

  const pagedRequests = requests.slice((reqPage - 1) * PAGE_SIZE, reqPage * PAGE_SIZE)
  const pagedInProcess = inProcess.slice((procPage - 1) * PAGE_SIZE, procPage * PAGE_SIZE)

  const newCount = requests.filter((r) => r.status === "New Request").length
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length
  const processCount = inProcess.filter((r) => r.status !== "Refunded").length
  const overdueCount = inProcess.filter((r) => r.status === "Overdue").length
  const refundedCount = inProcess.filter((r) => r.status === "Refunded").length

  const approveRequest = (r: NewRequest) => {
    setRequests((prev) => prev.filter((x) => x.ref !== r.ref))
    setInProcess((prev) => [
      { pnr: r.pnr, passenger: r.passenger, airline: r.airline, from: r.from, to: r.to, cancelledOn: r.requestedOn.split(",")[0], amount: r.amount, reason: r.reason, agent: r.agent, status: "In Process" },
      ...prev,
    ])
    setTab("process")
  }

  const rejectRequest = (ref: string) => setRequests((prev) => prev.map((r) => r.ref === ref ? { ...r, status: "Rejected" } : r))
  const markRefunded = (pnr: string) => setInProcess((prev) => prev.map((r) => r.pnr === pnr ? { ...r, status: "Refunded" } : r))

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <button
          onClick={() => setTab("new")}
          className={`flex-1 rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:flex-none ${tab === "new" ? "bg-blue-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
        >
          New Requests <span className="ml-0.5 opacity-70">({newCount})</span>
        </button>
        <button
          onClick={() => setTab("process")}
          className={`flex-1 rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:flex-none ${tab === "process" ? "bg-blue-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
        >
          In Process <span className="ml-0.5 opacity-70">({processCount})</span>
        </button>
      </div>

      {tab === "new" ? (
        <>
          {/* Compact stat chips */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-sm font-bold text-amber-600">{newCount}</span>
              <span className="text-xs text-amber-600/70">New Requests</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm font-bold text-blue-600">₹1,42,300</span>
              <span className="text-xs text-blue-600/70">Requested Value</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-sm font-bold text-orange-600">{processCount}</span>
              <span className="text-xs text-orange-600/70">Currently In Process</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm font-bold text-red-600">{rejectedCount}</span>
              <span className="text-xs text-red-600/70">Rejected</span>
            </div>
          </div>

          {/* New requests table */}
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Refund Requests</h2>
                <p className="text-xs text-slate-400">Refund requests raised by agents on cancelled bookings, awaiting admin approval</p>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">{newCount} new</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <th className="px-6 py-3 text-left font-medium">Ref No.</th>
                    <th className="px-6 py-3 text-left font-medium">PNR</th>
                    <th className="px-6 py-3 text-left font-medium">Passenger</th>
                    <th className="px-6 py-3 text-left font-medium">Airline</th>
                    <th className="px-6 py-3 text-left font-medium">Route</th>
                    <th className="px-6 py-3 text-left font-medium">Refund Amount</th>
                    <th className="px-6 py-3 text-left font-medium">Reason</th>
                    <th className="px-6 py-3 text-left font-medium">Agent</th>
                    <th className="px-6 py-3 text-left font-medium">Requested On</th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {pagedRequests.map((r) => (
                    <tr key={r.ref} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                      <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{r.ref}</td>
                      <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{r.pnr}</td>
                      <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.passenger}</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.airline}</td>
                      <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">{r.from}</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">{r.to}</span></td>
                      <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.amount}</td>
                      <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">{r.reason}</td>
                      <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                      <td className="px-6 py-3 text-xs text-slate-400">{r.requestedOn}</td>
                      <td className="px-6 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${reqStatusColors[r.status]}`}>{r.status}</span></td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {r.status === "New Request" ? (
                            <>
                              <button
                                onClick={() => setDialog({
                                  mode: "approve",
                                  title: `${r.ref} · ${r.passenger}`,
                                  summary: [
                                    { label: "PNR", value: r.pnr },
                                    { label: "Refund Amount", value: r.amount },
                                    { label: "Reason", value: r.reason },
                                    { label: "Agent", value: r.agent },
                                  ],
                                  details: [],
                                  confirmLabel: "Approve",
                                })}
                                className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                              >
                                Approve
                              </button>
                              <button onClick={() => rejectRequest(r.ref)} className="text-xs text-red-500 hover:text-red-700 font-medium">Reject</button>
                            </>
                          ) : (
                            <span className="text-xs text-slate-300">—</span>
                          )}
                          <button
                            onClick={() => setDialog({
                              mode: "view",
                              title: `${r.ref} · ${r.passenger}`,
                              summary: [],
                              details: [
                                { label: "Ref No.", value: r.ref },
                                { label: "PNR", value: r.pnr },
                                { label: "Passenger", value: r.passenger },
                                { label: "Airline", value: r.airline },
                                { label: "Route", value: `${r.from} → ${r.to}` },
                                { label: "Refund Amount", value: r.amount },
                                { label: "Reason", value: r.reason },
                                { label: "Agent", value: r.agent },
                                { label: "Requested On", value: r.requestedOn },
                                { label: "Status", value: r.status },
                              ],
                            })}
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

            <Pagination page={reqPage} pageSize={PAGE_SIZE} totalItems={requests.length} onPageChange={setReqPage} itemLabel="refund requests" />
          </div>
        </>
      ) : (
        <>
          {/* Compact stat chips */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-sm font-bold text-orange-600">{processCount}</span>
              <span className="text-xs text-orange-600/70">In Process</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm font-bold text-blue-600">₹1,84,200</span>
              <span className="text-xs text-blue-600/70">Total Refund Value</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-bold text-emerald-600">{refundedCount}</span>
              <span className="text-xs text-emerald-600/70">Refunded Today</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm font-bold text-red-600">{overdueCount}</span>
              <span className="text-xs text-red-600/70">Overdue (&gt;7 days)</span>
            </div>
          </div>

          {/* In process table */}
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Refunds In Process</h2>
                <p className="text-xs text-slate-400">Cancelled bookings whose refund is being processed with the airline / bank</p>
              </div>
              <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">{processCount} in process</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <th className="px-6 py-3 text-left font-medium">PNR</th>
                    <th className="px-6 py-3 text-left font-medium">Passenger</th>
                    <th className="px-6 py-3 text-left font-medium">Airline</th>
                    <th className="px-6 py-3 text-left font-medium">Route</th>
                    <th className="px-6 py-3 text-left font-medium">Cancelled On</th>
                    <th className="px-6 py-3 text-left font-medium">Refund Amount</th>
                    <th className="px-6 py-3 text-left font-medium">Reason</th>
                    <th className="px-6 py-3 text-left font-medium">Agent</th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {pagedInProcess.map((r) => (
                    <tr key={r.pnr} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                      <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{r.pnr}</td>
                      <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.passenger}</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.airline}</td>
                      <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">{r.from}</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">{r.to}</span></td>
                      <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{r.cancelledOn}</td>
                      <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.amount}</td>
                      <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">{r.reason}</td>
                      <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                      <td className="px-6 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${procStatusColors[r.status]}`}>{r.status}</span></td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {r.status !== "Refunded" ? (
                            <button onClick={() => markRefunded(r.pnr)} className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Refunded</button>
                          ) : (
                            <span className="text-xs text-slate-300">—</span>
                          )}
                          <button
                            onClick={() => setDialog({
                              mode: "view",
                              title: `${r.pnr} · ${r.passenger}`,
                              summary: [],
                              details: [
                                { label: "PNR", value: r.pnr },
                                { label: "Passenger", value: r.passenger },
                                { label: "Airline", value: r.airline },
                                { label: "Route", value: `${r.from} → ${r.to}` },
                                { label: "Cancelled On", value: r.cancelledOn },
                                { label: "Refund Amount", value: r.amount },
                                { label: "Reason", value: r.reason },
                                { label: "Agent", value: r.agent },
                                { label: "Status", value: r.status },
                              ],
                            })}
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

            <Pagination page={procPage} pageSize={PAGE_SIZE} totalItems={inProcess.length} onPageChange={setProcPage} itemLabel="refunds in process" />
          </div>
        </>
      )}

      <RecordDialog
        state={dialog}
        onClose={() => setDialog(null)}
        onConfirm={() => {
          if (dialog?.mode === "approve") {
            const ref = dialog.title.split(" · ")[0]
            const req = requests.find((r) => r.ref === ref)
            if (req) approveRequest(req)
          }
          setDialog(null)
        }}
      />
    </div>
  )
}
