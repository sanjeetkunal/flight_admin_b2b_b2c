"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"
import Pagination from "../../components/Pagination"

const PAGE_SIZE = 5

type NewRequest = { ref: string; pnr: string; passenger: string; airline: string; originalDate: string; requestedDate: string; fareDiff: string; agent: string; requestedOn: string; status: "New Request" | "Rejected" }
type InProcess = { pnr: string; passenger: string; airline: string; originalDate: string; newDate: string; fareDiff: string; reissueFee: string; agent: string; status: "In Process" | "Awaiting Airline" | "Overdue" | "Reissued" }

const initialRequests: NewRequest[] = [
  { ref: "RIS-3001", pnr: "6E2847", passenger: "Rajesh Kumar", airline: "IndiGo", originalDate: "12 Jul 2026", requestedDate: "19 Jul 2026", fareDiff: "₹2,400", agent: "TravelBox", requestedOn: "09 Jul, 12:05", status: "New Request" },
  { ref: "RIS-3002", pnr: "UK927", passenger: "Sneha Patel", airline: "Vistara", originalDate: "01 Jul 2026", requestedDate: "08 Jul 2026", fareDiff: "₹5,150", agent: "TravelBox", requestedOn: "09 Jul, 10:40", status: "New Request" },
  { ref: "RIS-3003", pnr: "AI202", passenger: "Sunita Rao", airline: "Air India", originalDate: "05 Jul 2026", requestedDate: "12 Jul 2026", fareDiff: "₹11,100", agent: "TravelBox", requestedOn: "08 Jul, 17:15", status: "New Request" },
  { ref: "RIS-2991", pnr: "G8502", passenger: "Vikram Nair", airline: "Go First", originalDate: "02 Jul 2026", requestedDate: "04 Jul 2026", fareDiff: "₹1,800", agent: "FlyDeal", requestedOn: "06 Jul, 15:50", status: "Rejected" },
]

const initialInProcess: InProcess[] = [
  { pnr: "6E2847", passenger: "Rajesh Kumar", airline: "IndiGo", originalDate: "12 Jul 2026", newDate: "19 Jul 2026", fareDiff: "₹2,400", reissueFee: "₹750", agent: "TravelBox", status: "In Process" },
  { pnr: "UK927", passenger: "Sneha Patel", airline: "Vistara", originalDate: "01 Jul 2026", newDate: "08 Jul 2026", fareDiff: "₹5,150", reissueFee: "₹1,000", agent: "TravelBox", status: "In Process" },
  { pnr: "AI202", passenger: "Sunita Rao", airline: "Air India", originalDate: "05 Jul 2026", newDate: "12 Jul 2026", fareDiff: "₹11,100", reissueFee: "₹1,500", agent: "TravelBox", status: "Overdue" },
  { pnr: "SG301", passenger: "Amit Singh", airline: "SpiceJet", originalDate: "01 Jul 2026", newDate: "06 Jul 2026", fareDiff: "₹3,200", reissueFee: "₹750", agent: "StarTravel", status: "Awaiting Airline" },
]

const reqStatusColors: Record<string, string> = {
  "New Request": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

const procStatusColors: Record<string, string> = {
  "In Process": "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  "Awaiting Airline": "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  Overdue: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  Reissued: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
}

export default function FlightsReissuePage() {
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
  const processCount = inProcess.filter((r) => r.status !== "Reissued").length
  const overdueCount = inProcess.filter((r) => r.status === "Overdue").length
  const reissuedCount = inProcess.filter((r) => r.status === "Reissued").length

  const approveRequest = (r: NewRequest) => {
    setRequests((prev) => prev.filter((x) => x.ref !== r.ref))
    setInProcess((prev) => [
      { pnr: r.pnr, passenger: r.passenger, airline: r.airline, originalDate: r.originalDate, newDate: r.requestedDate, fareDiff: r.fareDiff, reissueFee: "₹750", agent: r.agent, status: "In Process" },
      ...prev,
    ])
    setTab("process")
  }

  const rejectRequest = (ref: string) => setRequests((prev) => prev.map((r) => r.ref === ref ? { ...r, status: "Rejected" } : r))
  const markReissued = (pnr: string) => setInProcess((prev) => prev.map((r) => r.pnr === pnr ? { ...r, status: "Reissued" } : r))

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
              <span className="text-sm font-bold text-blue-600">₹18,650</span>
              <span className="text-xs text-blue-600/70">Fare Difference Due</span>
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
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Reissue Requests</h2>
                <p className="text-xs text-slate-400">Date / flight change requests raised by agents on confirmed bookings</p>
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
                    <th className="px-6 py-3 text-left font-medium">Original Date</th>
                    <th className="px-6 py-3 text-left font-medium">Requested Date</th>
                    <th className="px-6 py-3 text-left font-medium">Fare Diff.</th>
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
                      <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{r.originalDate}</td>
                      <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.requestedDate}</td>
                      <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.fareDiff}</td>
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
                                    { label: "New Date", value: r.requestedDate },
                                    { label: "Fare Difference", value: r.fareDiff },
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
                                { label: "Original Date", value: r.originalDate },
                                { label: "Requested Date", value: r.requestedDate },
                                { label: "Fare Difference", value: r.fareDiff },
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

            <Pagination page={reqPage} pageSize={PAGE_SIZE} totalItems={requests.length} onPageChange={setReqPage} itemLabel="reissue requests" />
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
              <span className="text-sm font-bold text-blue-600">₹19,850</span>
              <span className="text-xs text-blue-600/70">Fare Diff. Collected</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-bold text-emerald-600">{reissuedCount}</span>
              <span className="text-xs text-emerald-600/70">Reissued Today</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm font-bold text-red-600">{overdueCount}</span>
              <span className="text-xs text-red-600/70">Overdue (&gt;3 days)</span>
            </div>
          </div>

          {/* In process table */}
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Reissue In Process</h2>
                <p className="text-xs text-slate-400">Approved reissue requests being processed with the airline for new ticket numbers</p>
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
                    <th className="px-6 py-3 text-left font-medium">Original Date</th>
                    <th className="px-6 py-3 text-left font-medium">New Date</th>
                    <th className="px-6 py-3 text-left font-medium">Fare Diff.</th>
                    <th className="px-6 py-3 text-left font-medium">Reissue Fee</th>
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
                      <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{r.originalDate}</td>
                      <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.newDate}</td>
                      <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.fareDiff}</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.reissueFee}</td>
                      <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                      <td className="px-6 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${procStatusColors[r.status]}`}>{r.status}</span></td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {r.status !== "Reissued" ? (
                            <button onClick={() => markReissued(r.pnr)} className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Reissued</button>
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
                                { label: "Original Date", value: r.originalDate },
                                { label: "New Date", value: r.newDate },
                                { label: "Fare Difference", value: r.fareDiff },
                                { label: "Reissue Fee", value: r.reissueFee },
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

            <Pagination page={procPage} pageSize={PAGE_SIZE} totalItems={inProcess.length} onPageChange={setProcPage} itemLabel="reissues in process" />
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
