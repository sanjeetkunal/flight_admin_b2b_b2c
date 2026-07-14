"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

export default function ReissuePage() {
  const [dialog, setDialog] = useState<DialogState>(null)

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">(5)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">New Request <span className="ml-0.5 opacity-70">(3)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Reissued <span className="ml-0.5 opacity-70">(1)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Rejected <span className="ml-0.5 opacity-70">(1)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search PNR, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600">3</span>
          <span className="text-xs text-amber-600/70">New Requests</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">₹18,650</span>
          <span className="text-xs text-blue-600/70">Fare Difference Due</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">1</span>
          <span className="text-xs text-emerald-600/70">Reissued Today</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600">1</span>
          <span className="text-xs text-red-600/70">Rejected</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Reissue Requests</h2>
            <p className="text-xs text-slate-400">Date / flight change requests raised by agents on confirmed bookings</p>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">3 new</span>
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
              {/* RIS-3001 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RIS-3001</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">6E2847</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Rajesh Kumar</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">IndiGo</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">12 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">19 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹2,400</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 12:05</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RIS-3001 · Rajesh Kumar",
                        summary: [
                          { label: "PNR", value: "6E2847" },
                          { label: "New Date", value: "19 Jul 2026" },
                          { label: "Fare Difference", value: "₹2,400" },
                          { label: "Agent", value: "TravelBox" },
                        ],
                        details: [],
                        confirmLabel: "Approve",
                      })}
                      className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "reject",
                        title: "RIS-3001 · Rajesh Kumar",
                        summary: [
                          { label: "PNR", value: "6E2847" },
                          { label: "New Date", value: "19 Jul 2026" },
                          { label: "Fare Difference", value: "₹2,400" },
                          { label: "Agent", value: "TravelBox" },
                        ],
                        details: [],
                        confirmLabel: "Reject",
                      })}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RIS-3001 · Rajesh Kumar",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-3001" },
                          { label: "PNR", value: "6E2847" },
                          { label: "Passenger", value: "Rajesh Kumar" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Original Date", value: "12 Jul 2026" },
                          { label: "Requested Date", value: "19 Jul 2026" },
                          { label: "Fare Difference", value: "₹2,400" },
                          { label: "Agent", value: "TravelBox" },
                          { label: "Requested On", value: "09 Jul, 12:05" },
                          { label: "Status", value: "New Request" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* RIS-3002 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RIS-3002</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">UK927</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sneha Patel</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Vistara</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">01 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">08 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹5,150</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 10:40</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RIS-3002 · Sneha Patel",
                        summary: [
                          { label: "PNR", value: "UK927" },
                          { label: "New Date", value: "08 Jul 2026" },
                          { label: "Fare Difference", value: "₹5,150" },
                          { label: "Agent", value: "TravelBox" },
                        ],
                        details: [],
                        confirmLabel: "Approve",
                      })}
                      className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "reject",
                        title: "RIS-3002 · Sneha Patel",
                        summary: [
                          { label: "PNR", value: "UK927" },
                          { label: "New Date", value: "08 Jul 2026" },
                          { label: "Fare Difference", value: "₹5,150" },
                          { label: "Agent", value: "TravelBox" },
                        ],
                        details: [],
                        confirmLabel: "Reject",
                      })}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RIS-3002 · Sneha Patel",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-3002" },
                          { label: "PNR", value: "UK927" },
                          { label: "Passenger", value: "Sneha Patel" },
                          { label: "Airline", value: "Vistara" },
                          { label: "Original Date", value: "01 Jul 2026" },
                          { label: "Requested Date", value: "08 Jul 2026" },
                          { label: "Fare Difference", value: "₹5,150" },
                          { label: "Agent", value: "TravelBox" },
                          { label: "Requested On", value: "09 Jul, 10:40" },
                          { label: "Status", value: "New Request" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* RIS-3003 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RIS-3003</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">AI202</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sunita Rao</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Air India</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">05 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">12 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹11,100</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 17:15</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RIS-3003 · Sunita Rao",
                        summary: [
                          { label: "PNR", value: "AI202" },
                          { label: "New Date", value: "12 Jul 2026" },
                          { label: "Fare Difference", value: "₹11,100" },
                          { label: "Agent", value: "TravelBox" },
                        ],
                        details: [],
                        confirmLabel: "Approve",
                      })}
                      className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "reject",
                        title: "RIS-3003 · Sunita Rao",
                        summary: [
                          { label: "PNR", value: "AI202" },
                          { label: "New Date", value: "12 Jul 2026" },
                          { label: "Fare Difference", value: "₹11,100" },
                          { label: "Agent", value: "TravelBox" },
                        ],
                        details: [],
                        confirmLabel: "Reject",
                      })}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RIS-3003 · Sunita Rao",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-3003" },
                          { label: "PNR", value: "AI202" },
                          { label: "Passenger", value: "Sunita Rao" },
                          { label: "Airline", value: "Air India" },
                          { label: "Original Date", value: "05 Jul 2026" },
                          { label: "Requested Date", value: "12 Jul 2026" },
                          { label: "Fare Difference", value: "₹11,100" },
                          { label: "Agent", value: "TravelBox" },
                          { label: "Requested On", value: "08 Jul, 17:15" },
                          { label: "Status", value: "New Request" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* RIS-2998 — already reissued, view only */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RIS-2998</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">SG301</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Amit Singh</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">SpiceJet</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">01 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">06 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹3,200</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3 text-xs text-slate-400">07 Jul, 09:30</td>
                <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Reissued</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">—</span>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RIS-2998 · Amit Singh",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-2998" },
                          { label: "PNR", value: "SG301" },
                          { label: "Passenger", value: "Amit Singh" },
                          { label: "Airline", value: "SpiceJet" },
                          { label: "Original Date", value: "01 Jul 2026" },
                          { label: "Requested Date", value: "06 Jul 2026" },
                          { label: "Fare Difference", value: "₹3,200" },
                          { label: "Agent", value: "StarTravel" },
                          { label: "Requested On", value: "07 Jul, 09:30" },
                          { label: "Status", value: "Reissued" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* RIS-2991 — rejected, view only */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RIS-2991</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">G8502</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Vikram Nair</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Go First</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">02 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">04 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹1,800</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3 text-xs text-slate-400">06 Jul, 15:50</td>
                <td className="px-6 py-3"><span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">Rejected</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">—</span>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RIS-2991 · Vikram Nair",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-2991" },
                          { label: "PNR", value: "G8502" },
                          { label: "Passenger", value: "Vikram Nair" },
                          { label: "Airline", value: "Go First" },
                          { label: "Original Date", value: "02 Jul 2026" },
                          { label: "Requested Date", value: "04 Jul 2026" },
                          { label: "Fare Difference", value: "₹1,800" },
                          { label: "Agent", value: "FlyDeal" },
                          { label: "Requested On", value: "06 Jul, 15:50" },
                          { label: "Status", value: "Rejected" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing 5 of 5 reissue requests</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-600 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>

      <RecordDialog state={dialog} onClose={() => setDialog(null)} onConfirm={() => setDialog(null)} />
    </div>
  )
}
