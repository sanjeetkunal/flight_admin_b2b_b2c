"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

export default function RefundRequestPage() {
  const [dialog, setDialog] = useState<DialogState>(null)

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">(5)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">New Request <span className="ml-0.5 opacity-70">(3)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">Approved <span className="ml-0.5 opacity-70">(1)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">Rejected <span className="ml-0.5 opacity-70">(1)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search PNR, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56" />
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
          <span className="text-sm font-bold text-blue-600">₹1,42,300</span>
          <span className="text-xs text-blue-600/70">Requested Value</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">1</span>
          <span className="text-xs text-emerald-600/70">Approved Today</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600">1</span>
          <span className="text-xs text-red-600/70">Rejected</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Refund Requests</h2>
            <p className="text-xs text-slate-400">Refund requests raised by agents on cancelled bookings, awaiting admin approval</p>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">3 new</span>
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
              {/* RFR-5001 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">RFR-5001</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500">IX234</td>
                <td className="px-6 py-3 font-medium text-slate-800">Deepa Menon</td>
                <td className="px-6 py-3 text-slate-600">Air Asia</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">COK</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹4,850</td>
                <td className="px-6 py-3 text-xs text-slate-600">Passenger request</td>
                <td className="px-6 py-3 text-slate-500">QuickBook</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 11:20</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RFR-5001 · Deepa Menon",
                        summary: [
                          { label: "PNR", value: "IX234" },
                          { label: "Refund Amount", value: "₹4,850" },
                          { label: "Reason", value: "Passenger request" },
                          { label: "Agent", value: "QuickBook" },
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
                        title: "RFR-5001 · Deepa Menon",
                        summary: [
                          { label: "PNR", value: "IX234" },
                          { label: "Refund Amount", value: "₹4,850" },
                          { label: "Reason", value: "Passenger request" },
                          { label: "Agent", value: "QuickBook" },
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
                        title: "RFR-5001 · Deepa Menon",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RFR-5001" },
                          { label: "PNR", value: "IX234" },
                          { label: "Passenger", value: "Deepa Menon" },
                          { label: "Airline", value: "Air Asia" },
                          { label: "Route", value: "COK → DEL" },
                          { label: "Refund Amount", value: "₹4,850" },
                          { label: "Reason", value: "Passenger request" },
                          { label: "Agent", value: "QuickBook" },
                          { label: "Requested On", value: "09 Jul, 11:20" },
                          { label: "Status", value: "New Request" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* RFR-5002 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">RFR-5002</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500">6E4821</td>
                <td className="px-6 py-3 font-medium text-slate-800">Ravi Gupta</td>
                <td className="px-6 py-3 text-slate-600">IndiGo</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">HYD</span></td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹8,900</td>
                <td className="px-6 py-3 text-xs text-slate-600">Flight rescheduled</td>
                <td className="px-6 py-3 text-slate-500">StarTravel</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 09:05</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RFR-5002 · Ravi Gupta",
                        summary: [
                          { label: "PNR", value: "6E4821" },
                          { label: "Refund Amount", value: "₹8,900" },
                          { label: "Reason", value: "Flight rescheduled" },
                          { label: "Agent", value: "StarTravel" },
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
                        title: "RFR-5002 · Ravi Gupta",
                        summary: [
                          { label: "PNR", value: "6E4821" },
                          { label: "Refund Amount", value: "₹8,900" },
                          { label: "Reason", value: "Flight rescheduled" },
                          { label: "Agent", value: "StarTravel" },
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
                        title: "RFR-5002 · Ravi Gupta",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RFR-5002" },
                          { label: "PNR", value: "6E4821" },
                          { label: "Passenger", value: "Ravi Gupta" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Route", value: "DEL → HYD" },
                          { label: "Refund Amount", value: "₹8,900" },
                          { label: "Reason", value: "Flight rescheduled" },
                          { label: "Agent", value: "StarTravel" },
                          { label: "Requested On", value: "09 Jul, 09:05" },
                          { label: "Status", value: "New Request" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* RFR-5003 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">RFR-5003</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500">SQ422</td>
                <td className="px-6 py-3 font-medium text-slate-800">Meera Iyer</td>
                <td className="px-6 py-3 text-slate-600">Singapore Air</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">SIN</span></td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹92,000</td>
                <td className="px-6 py-3 text-xs text-slate-600">Duplicate booking</td>
                <td className="px-6 py-3 text-slate-500">FlyDeal</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 20:40</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RFR-5003 · Meera Iyer",
                        summary: [
                          { label: "PNR", value: "SQ422" },
                          { label: "Refund Amount", value: "₹92,000" },
                          { label: "Reason", value: "Duplicate booking" },
                          { label: "Agent", value: "FlyDeal" },
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
                        title: "RFR-5003 · Meera Iyer",
                        summary: [
                          { label: "PNR", value: "SQ422" },
                          { label: "Refund Amount", value: "₹92,000" },
                          { label: "Reason", value: "Duplicate booking" },
                          { label: "Agent", value: "FlyDeal" },
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
                        title: "RFR-5003 · Meera Iyer",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RFR-5003" },
                          { label: "PNR", value: "SQ422" },
                          { label: "Passenger", value: "Meera Iyer" },
                          { label: "Airline", value: "Singapore Air" },
                          { label: "Route", value: "DEL → SIN" },
                          { label: "Refund Amount", value: "₹92,000" },
                          { label: "Reason", value: "Duplicate booking" },
                          { label: "Agent", value: "FlyDeal" },
                          { label: "Requested On", value: "08 Jul, 20:40" },
                          { label: "Status", value: "New Request" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* RFR-4998 — already approved, view only */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">RFR-4998</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500">AI1045</td>
                <td className="px-6 py-3 font-medium text-slate-800">Priya Sharma</td>
                <td className="px-6 py-3 text-slate-600">Air India</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹22,100</td>
                <td className="px-6 py-3 text-xs text-slate-600">Airline cancelled flight</td>
                <td className="px-6 py-3 text-slate-500">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">07 Jul, 14:12</td>
                <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Approved</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">—</span>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RFR-4998 · Priya Sharma",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RFR-4998" },
                          { label: "PNR", value: "AI1045" },
                          { label: "Passenger", value: "Priya Sharma" },
                          { label: "Airline", value: "Air India" },
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Refund Amount", value: "₹22,100" },
                          { label: "Reason", value: "Airline cancelled flight" },
                          { label: "Agent", value: "TravelBox" },
                          { label: "Requested On", value: "07 Jul, 14:12" },
                          { label: "Status", value: "Approved" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* RFR-4991 — already rejected, view only */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">RFR-4991</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500">EK501</td>
                <td className="px-6 py-3 font-medium text-slate-800">Anuj Rawat</td>
                <td className="px-6 py-3 text-slate-600">Emirates</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DXB</span></td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹50,750</td>
                <td className="px-6 py-3 text-xs text-slate-600">Visa rejected</td>
                <td className="px-6 py-3 text-slate-500">QuickBook</td>
                <td className="px-6 py-3 text-xs text-slate-400">06 Jul, 10:50</td>
                <td className="px-6 py-3"><span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">Rejected</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">—</span>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RFR-4991 · Anuj Rawat",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RFR-4991" },
                          { label: "PNR", value: "EK501" },
                          { label: "Passenger", value: "Anuj Rawat" },
                          { label: "Airline", value: "Emirates" },
                          { label: "Route", value: "BOM → DXB" },
                          { label: "Refund Amount", value: "₹50,750" },
                          { label: "Reason", value: "Visa rejected" },
                          { label: "Agent", value: "QuickBook" },
                          { label: "Requested On", value: "06 Jul, 10:50" },
                          { label: "Status", value: "Rejected" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500">Showing 5 of 5 refund requests</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-600 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>

      <RecordDialog state={dialog} onClose={() => setDialog(null)} onConfirm={() => setDialog(null)} />
    </div>
  )
}
