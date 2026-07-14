"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

export default function RailwaysReissuePage() {
  const [dialog, setDialog] = useState<DialogState>(null)

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">(5)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">New Request <span className="ml-0.5 opacity-70">(3)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Reissued <span className="ml-0.5 opacity-70">(1)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Rejected <span className="ml-0.5 opacity-70">(1)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search PNR, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 dark:border-amber-500/20 dark:bg-amber-500/10">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">3</span>
          <span className="text-xs text-amber-600/70 dark:text-amber-400/70">New Requests</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2 dark:border-green-500/20 dark:bg-green-500/10">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm font-bold text-green-600 dark:text-green-400">₹1,670</span>
          <span className="text-xs text-green-600/70 dark:text-green-400/70">Fare Difference Due</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">1</span>
          <span className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Reissued Today</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 dark:border-red-500/20 dark:bg-red-500/10">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600 dark:text-red-400">1</span>
          <span className="text-xs text-red-600/70 dark:text-red-400/70">Rejected</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Reissue Requests</h2>
            <p className="text-xs text-slate-400">Date / train change requests raised by agents on confirmed PNR bookings</p>
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
                <th className="px-6 py-3 text-left font-medium">Train</th>
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
              {/* RIS-4001 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-green-700 dark:text-green-400">RIS-4001</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">6712345890</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Rajesh Kumar</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">12951 Mumbai Rajdhani</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">12 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">19 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹450</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 12:05</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RIS-4001 · Rajesh Kumar",
                        summary: [
                          { label: "PNR", value: "6712345890" },
                          { label: "New Date", value: "19 Jul 2026" },
                          { label: "Fare Difference", value: "₹450" },
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
                        title: "RIS-4001 · Rajesh Kumar",
                        summary: [
                          { label: "PNR", value: "6712345890" },
                          { label: "New Date", value: "19 Jul 2026" },
                          { label: "Fare Difference", value: "₹450" },
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
                        title: "RIS-4001 · Rajesh Kumar",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-4001" },
                          { label: "PNR", value: "6712345890" },
                          { label: "Passenger", value: "Rajesh Kumar" },
                          { label: "Train", value: "12951 Mumbai Rajdhani" },
                          { label: "Original Date", value: "12 Jul 2026" },
                          { label: "Requested Date", value: "19 Jul 2026" },
                          { label: "Fare Difference", value: "₹450" },
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

              {/* RIS-4002 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-green-700 dark:text-green-400">RIS-4002</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">9045678123</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sneha Patel</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">12009 Mumbai Shatabdi</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">01 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">08 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹320</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 10:40</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RIS-4002 · Sneha Patel",
                        summary: [
                          { label: "PNR", value: "9045678123" },
                          { label: "New Date", value: "08 Jul 2026" },
                          { label: "Fare Difference", value: "₹320" },
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
                        title: "RIS-4002 · Sneha Patel",
                        summary: [
                          { label: "PNR", value: "9045678123" },
                          { label: "New Date", value: "08 Jul 2026" },
                          { label: "Fare Difference", value: "₹320" },
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
                        title: "RIS-4002 · Sneha Patel",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-4002" },
                          { label: "PNR", value: "9045678123" },
                          { label: "Passenger", value: "Sneha Patel" },
                          { label: "Train", value: "12009 Mumbai Shatabdi" },
                          { label: "Original Date", value: "01 Jul 2026" },
                          { label: "Requested Date", value: "08 Jul 2026" },
                          { label: "Fare Difference", value: "₹320" },
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

              {/* RIS-4003 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-green-700 dark:text-green-400">RIS-4003</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">2109876543</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sunita Rao</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">12002 Bhopal Shatabdi</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">05 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">12 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹900</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 17:15</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">New Request</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RIS-4003 · Sunita Rao",
                        summary: [
                          { label: "PNR", value: "2109876543" },
                          { label: "New Date", value: "12 Jul 2026" },
                          { label: "Fare Difference", value: "₹900" },
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
                        title: "RIS-4003 · Sunita Rao",
                        summary: [
                          { label: "PNR", value: "2109876543" },
                          { label: "New Date", value: "12 Jul 2026" },
                          { label: "Fare Difference", value: "₹900" },
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
                        title: "RIS-4003 · Sunita Rao",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-4003" },
                          { label: "PNR", value: "2109876543" },
                          { label: "Passenger", value: "Sunita Rao" },
                          { label: "Train", value: "12002 Bhopal Shatabdi" },
                          { label: "Original Date", value: "05 Jul 2026" },
                          { label: "Requested Date", value: "12 Jul 2026" },
                          { label: "Fare Difference", value: "₹900" },
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

              {/* RIS-3998 — already reissued, view only */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-green-700 dark:text-green-400">RIS-3998</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">8934567012</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Amit Singh</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">22120 Tejas Express</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">01 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">06 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹280</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3 text-xs text-slate-400">07 Jul, 09:30</td>
                <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Reissued</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">—</span>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RIS-3998 · Amit Singh",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-3998" },
                          { label: "PNR", value: "8934567012" },
                          { label: "Passenger", value: "Amit Singh" },
                          { label: "Train", value: "22120 Tejas Express" },
                          { label: "Original Date", value: "01 Jul 2026" },
                          { label: "Requested Date", value: "06 Jul 2026" },
                          { label: "Fare Difference", value: "₹280" },
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

              {/* RIS-3991 — rejected, view only */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-green-700 dark:text-green-400">RIS-3991</td>
                <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">1056789234</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Vikram Nair</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">12625 Kerala Express</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">02 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">04 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹150</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3 text-xs text-slate-400">06 Jul, 15:50</td>
                <td className="px-6 py-3"><span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">Rejected</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300">—</span>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "RIS-3991 · Vikram Nair",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RIS-3991" },
                          { label: "PNR", value: "1056789234" },
                          { label: "Passenger", value: "Vikram Nair" },
                          { label: "Train", value: "12625 Kerala Express" },
                          { label: "Original Date", value: "02 Jul 2026" },
                          { label: "Requested Date", value: "04 Jul 2026" },
                          { label: "Fare Difference", value: "₹150" },
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
            <button className="h-7 min-w-7 rounded-md bg-green-600 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>

      <RecordDialog state={dialog} onClose={() => setDialog(null)} onConfirm={() => setDialog(null)} />
    </div>
  )
}
