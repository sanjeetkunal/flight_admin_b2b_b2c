"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"
import Pagination from "../../components/Pagination"

export default function PendingPnrPage() {
  const [dialog, setDialog] = useState<DialogState>(null)

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-sm">All <span className="ml-0.5 opacity-70">(7)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Economy <span className="ml-0.5 opacity-70">(4)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Business <span className="ml-0.5 opacity-70">(1)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Premium Eco <span className="ml-0.5 opacity-70">(1)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search PNR ref, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600">7</span>
          <span className="text-xs text-amber-600/70">Pending</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">15</span>
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
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Pending PNR Requests</h2>
            <p className="text-xs text-slate-400">Bookings raised by agents that are yet to be issued a PNR</p>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">7 pending</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Ref No.</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Airline</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Travel Date</th>
                <th className="px-6 py-3 text-left font-medium">Class</th>
                <th className="px-6 py-3 text-left font-medium">Pax</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Requested On</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {/* REQ-10231 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">REQ-10231</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Rajesh Kumar</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">IndiGo</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">BOM</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">12 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">Economy</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">2</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 10:12</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "REQ-10231 · Rajesh Kumar",
                        summary: [
                          { label: "Route", value: "DEL → BOM" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Travel Date", value: "12 Jul 2026" },
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
                        title: "REQ-10231 · Rajesh Kumar",
                        summary: [
                          { label: "Route", value: "DEL → BOM" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Travel Date", value: "12 Jul 2026" },
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
                        title: "REQ-10231 · Rajesh Kumar",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "REQ-10231" },
                          { label: "Passenger", value: "Rajesh Kumar" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Route", value: "DEL → BOM" },
                          { label: "Travel Date", value: "12 Jul 2026" },
                          { label: "Class", value: "Economy" },
                          { label: "Pax", value: "2" },
                          { label: "Agent", value: "TravelBox" },
                          { label: "Requested On", value: "09 Jul, 10:12" },
                          { label: "Status", value: "Pending" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* REQ-10232 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">REQ-10232</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Priya Sharma</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Air India</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">13 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">Business</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">1</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 09:48</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "REQ-10232 · Priya Sharma",
                        summary: [
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Airline", value: "Air India" },
                          { label: "Travel Date", value: "13 Jul 2026" },
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
                        title: "REQ-10232 · Priya Sharma",
                        summary: [
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Airline", value: "Air India" },
                          { label: "Travel Date", value: "13 Jul 2026" },
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
                        title: "REQ-10232 · Priya Sharma",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "REQ-10232" },
                          { label: "Passenger", value: "Priya Sharma" },
                          { label: "Airline", value: "Air India" },
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Travel Date", value: "13 Jul 2026" },
                          { label: "Class", value: "Business" },
                          { label: "Pax", value: "1" },
                          { label: "Agent", value: "FlyDeal" },
                          { label: "Requested On", value: "09 Jul, 09:48" },
                          { label: "Status", value: "Pending" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* REQ-10233 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">REQ-10233</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Amit Singh</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">SpiceJet</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">GOI</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">14 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">Economy</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">4</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 22:05</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "REQ-10233 · Amit Singh",
                        summary: [
                          { label: "Route", value: "BOM → GOI" },
                          { label: "Airline", value: "SpiceJet" },
                          { label: "Travel Date", value: "14 Jul 2026" },
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
                        title: "REQ-10233 · Amit Singh",
                        summary: [
                          { label: "Route", value: "BOM → GOI" },
                          { label: "Airline", value: "SpiceJet" },
                          { label: "Travel Date", value: "14 Jul 2026" },
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
                        title: "REQ-10233 · Amit Singh",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "REQ-10233" },
                          { label: "Passenger", value: "Amit Singh" },
                          { label: "Airline", value: "SpiceJet" },
                          { label: "Route", value: "BOM → GOI" },
                          { label: "Travel Date", value: "14 Jul 2026" },
                          { label: "Class", value: "Economy" },
                          { label: "Pax", value: "4" },
                          { label: "Agent", value: "StarTravel" },
                          { label: "Requested On", value: "08 Jul, 22:05" },
                          { label: "Status", value: "Pending" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* REQ-10234 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">REQ-10234</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sneha Patel</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Vistara</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">BLR</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">15 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">Premium Eco</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">2</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 18:30</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "REQ-10234 · Sneha Patel",
                        summary: [
                          { label: "Route", value: "DEL → BLR" },
                          { label: "Airline", value: "Vistara" },
                          { label: "Travel Date", value: "15 Jul 2026" },
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
                        title: "REQ-10234 · Sneha Patel",
                        summary: [
                          { label: "Route", value: "DEL → BLR" },
                          { label: "Airline", value: "Vistara" },
                          { label: "Travel Date", value: "15 Jul 2026" },
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
                        title: "REQ-10234 · Sneha Patel",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "REQ-10234" },
                          { label: "Passenger", value: "Sneha Patel" },
                          { label: "Airline", value: "Vistara" },
                          { label: "Route", value: "DEL → BLR" },
                          { label: "Travel Date", value: "15 Jul 2026" },
                          { label: "Class", value: "Premium Eco" },
                          { label: "Pax", value: "2" },
                          { label: "Agent", value: "TravelBox" },
                          { label: "Requested On", value: "08 Jul, 18:30" },
                          { label: "Status", value: "Pending" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* REQ-10235 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">REQ-10235</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Deepa Menon</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Air Asia</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">COK</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">16 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">Economy</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">1</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">QuickBook</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 15:20</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "REQ-10235 · Deepa Menon",
                        summary: [
                          { label: "Route", value: "COK → DEL" },
                          { label: "Airline", value: "Air Asia" },
                          { label: "Travel Date", value: "16 Jul 2026" },
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
                        title: "REQ-10235 · Deepa Menon",
                        summary: [
                          { label: "Route", value: "COK → DEL" },
                          { label: "Airline", value: "Air Asia" },
                          { label: "Travel Date", value: "16 Jul 2026" },
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
                        title: "REQ-10235 · Deepa Menon",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "REQ-10235" },
                          { label: "Passenger", value: "Deepa Menon" },
                          { label: "Airline", value: "Air Asia" },
                          { label: "Route", value: "COK → DEL" },
                          { label: "Travel Date", value: "16 Jul 2026" },
                          { label: "Class", value: "Economy" },
                          { label: "Pax", value: "1" },
                          { label: "Agent", value: "QuickBook" },
                          { label: "Requested On", value: "08 Jul, 15:20" },
                          { label: "Status", value: "Pending" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* REQ-10236 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">REQ-10236</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Vikram Nair</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Go First</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">17 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">Economy</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">3</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3 text-xs text-slate-400">07 Jul, 11:40</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "REQ-10236 · Vikram Nair",
                        summary: [
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Airline", value: "Go First" },
                          { label: "Travel Date", value: "17 Jul 2026" },
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
                        title: "REQ-10236 · Vikram Nair",
                        summary: [
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Airline", value: "Go First" },
                          { label: "Travel Date", value: "17 Jul 2026" },
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
                        title: "REQ-10236 · Vikram Nair",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "REQ-10236" },
                          { label: "Passenger", value: "Vikram Nair" },
                          { label: "Airline", value: "Go First" },
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Travel Date", value: "17 Jul 2026" },
                          { label: "Class", value: "Economy" },
                          { label: "Pax", value: "3" },
                          { label: "Agent", value: "FlyDeal" },
                          { label: "Requested On", value: "07 Jul, 11:40" },
                          { label: "Status", value: "Pending" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* REQ-10237 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">REQ-10237</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Ravi Gupta</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">IndiGo</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">HYD</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">18 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">Economy</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">2</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3 text-xs text-slate-400">07 Jul, 09:15</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "REQ-10237 · Ravi Gupta",
                        summary: [
                          { label: "Route", value: "DEL → HYD" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Travel Date", value: "18 Jul 2026" },
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
                        title: "REQ-10237 · Ravi Gupta",
                        summary: [
                          { label: "Route", value: "DEL → HYD" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Travel Date", value: "18 Jul 2026" },
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
                        title: "REQ-10237 · Ravi Gupta",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "REQ-10237" },
                          { label: "Passenger", value: "Ravi Gupta" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Route", value: "DEL → HYD" },
                          { label: "Travel Date", value: "18 Jul 2026" },
                          { label: "Class", value: "Economy" },
                          { label: "Pax", value: "2" },
                          { label: "Agent", value: "StarTravel" },
                          { label: "Requested On", value: "07 Jul, 09:15" },
                          { label: "Status", value: "Pending" },
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

        <Pagination page={1} pageSize={10} totalItems={7} onPageChange={() => {}} itemLabel="pending requests" />
      </div>

      <RecordDialog state={dialog} onClose={() => setDialog(null)} onConfirm={() => setDialog(null)} />
    </div>
  )
}
