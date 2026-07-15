"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

export default function RailwaysPendingPnrPage() {
  const [dialog, setDialog] = useState<DialogState>(null)

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">(7)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">SL <span className="ml-0.5 opacity-70">(4)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">3A <span className="ml-0.5 opacity-70">(2)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">2A <span className="ml-0.5 opacity-70">(1)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search PNR ref, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 dark:border-amber-500/20 dark:bg-amber-500/10">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">7</span>
          <span className="text-xs text-amber-600/70 dark:text-amber-400/70">Pending</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 dark:border-blue-500/20 dark:bg-blue-500/10">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">15</span>
          <span className="text-xs text-blue-600/70 dark:text-blue-400/70">Total Pax</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 dark:border-violet-500/20 dark:bg-violet-500/10">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600 dark:text-violet-400">2 days</span>
          <span className="text-xs text-violet-600/70 dark:text-violet-400/70">Oldest</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">5</span>
          <span className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Agents</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Pending PNR Requests</h2>
            <p className="text-xs text-slate-400">Bookings raised by agents that are yet to be issued a confirmed PNR</p>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">7 pending</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Ref No.</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Train</th>
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
              {/* RRQ-2031 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2031</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Rajesh Kumar</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12951</p><p className="text-xs text-slate-400">Mumbai Rajdhani</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">MMCT</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">12 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">3A</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">2</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 10:12</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RRQ-2031 · Rajesh Kumar",
                        summary: [
                          { label: "Route", value: "NDLS → MMCT" },
                          { label: "Train", value: "12951 Mumbai Rajdhani" },
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
                        title: "RRQ-2031 · Rajesh Kumar",
                        summary: [
                          { label: "Route", value: "NDLS → MMCT" },
                          { label: "Train", value: "12951 Mumbai Rajdhani" },
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
                        title: "RRQ-2031 · Rajesh Kumar",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RRQ-2031" },
                          { label: "Passenger", value: "Rajesh Kumar" },
                          { label: "Train", value: "12951 Mumbai Rajdhani" },
                          { label: "Route", value: "NDLS → MMCT" },
                          { label: "Travel Date", value: "12 Jul 2026" },
                          { label: "Class", value: "3A" },
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

              {/* RRQ-2032 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2032</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Priya Sharma</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12301</p><p className="text-xs text-slate-400">Howrah Rajdhani</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">HWH</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">13 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">2A</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">1</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3 text-xs text-slate-400">09 Jul, 09:48</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RRQ-2032 · Priya Sharma",
                        summary: [
                          { label: "Route", value: "NDLS → HWH" },
                          { label: "Train", value: "12301 Howrah Rajdhani" },
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
                        title: "RRQ-2032 · Priya Sharma",
                        summary: [
                          { label: "Route", value: "NDLS → HWH" },
                          { label: "Train", value: "12301 Howrah Rajdhani" },
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
                        title: "RRQ-2032 · Priya Sharma",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RRQ-2032" },
                          { label: "Passenger", value: "Priya Sharma" },
                          { label: "Train", value: "12301 Howrah Rajdhani" },
                          { label: "Route", value: "NDLS → HWH" },
                          { label: "Travel Date", value: "13 Jul 2026" },
                          { label: "Class", value: "2A" },
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

              {/* RRQ-2033 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2033</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Amit Singh</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12002</p><p className="text-xs text-slate-400">Bhopal Shatabdi</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">BPL</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">14 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">SL</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">4</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 22:05</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RRQ-2033 · Amit Singh",
                        summary: [
                          { label: "Route", value: "NDLS → BPL" },
                          { label: "Train", value: "12002 Bhopal Shatabdi" },
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
                        title: "RRQ-2033 · Amit Singh",
                        summary: [
                          { label: "Route", value: "NDLS → BPL" },
                          { label: "Train", value: "12002 Bhopal Shatabdi" },
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
                        title: "RRQ-2033 · Amit Singh",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RRQ-2033" },
                          { label: "Passenger", value: "Amit Singh" },
                          { label: "Train", value: "12002 Bhopal Shatabdi" },
                          { label: "Route", value: "NDLS → BPL" },
                          { label: "Travel Date", value: "14 Jul 2026" },
                          { label: "Class", value: "SL" },
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

              {/* RRQ-2034 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2034</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sneha Patel</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12009</p><p className="text-xs text-slate-400">Mumbai Shatabdi</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">MMCT</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">PUNE</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">15 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">SL</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">2</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 18:30</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RRQ-2034 · Sneha Patel",
                        summary: [
                          { label: "Route", value: "MMCT → PUNE" },
                          { label: "Train", value: "12009 Mumbai Shatabdi" },
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
                        title: "RRQ-2034 · Sneha Patel",
                        summary: [
                          { label: "Route", value: "MMCT → PUNE" },
                          { label: "Train", value: "12009 Mumbai Shatabdi" },
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
                        title: "RRQ-2034 · Sneha Patel",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RRQ-2034" },
                          { label: "Passenger", value: "Sneha Patel" },
                          { label: "Train", value: "12009 Mumbai Shatabdi" },
                          { label: "Route", value: "MMCT → PUNE" },
                          { label: "Travel Date", value: "15 Jul 2026" },
                          { label: "Class", value: "SL" },
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

              {/* RRQ-2035 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2035</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Deepa Menon</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12625</p><p className="text-xs text-slate-400">Kerala Express</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">TVC</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">16 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">SL</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">1</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">QuickBook</td>
                <td className="px-6 py-3 text-xs text-slate-400">08 Jul, 15:20</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RRQ-2035 · Deepa Menon",
                        summary: [
                          { label: "Route", value: "NDLS → TVC" },
                          { label: "Train", value: "12625 Kerala Express" },
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
                        title: "RRQ-2035 · Deepa Menon",
                        summary: [
                          { label: "Route", value: "NDLS → TVC" },
                          { label: "Train", value: "12625 Kerala Express" },
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
                        title: "RRQ-2035 · Deepa Menon",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RRQ-2035" },
                          { label: "Passenger", value: "Deepa Menon" },
                          { label: "Train", value: "12625 Kerala Express" },
                          { label: "Route", value: "NDLS → TVC" },
                          { label: "Travel Date", value: "16 Jul 2026" },
                          { label: "Class", value: "SL" },
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

              {/* RRQ-2036 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2036</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Vikram Nair</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">22120</p><p className="text-xs text-slate-400">Tejas Express</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">CSMT</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">KYNR</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">17 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">3A</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">3</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">Royal Wings</td>
                <td className="px-6 py-3 text-xs text-slate-400">07 Jul, 11:40</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RRQ-2036 · Vikram Nair",
                        summary: [
                          { label: "Route", value: "CSMT → KYNR" },
                          { label: "Train", value: "22120 Tejas Express" },
                          { label: "Travel Date", value: "17 Jul 2026" },
                          { label: "Agent", value: "Royal Wings" },
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
                        title: "RRQ-2036 · Vikram Nair",
                        summary: [
                          { label: "Route", value: "CSMT → KYNR" },
                          { label: "Train", value: "22120 Tejas Express" },
                          { label: "Travel Date", value: "17 Jul 2026" },
                          { label: "Agent", value: "Royal Wings" },
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
                        title: "RRQ-2036 · Vikram Nair",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RRQ-2036" },
                          { label: "Passenger", value: "Vikram Nair" },
                          { label: "Train", value: "22120 Tejas Express" },
                          { label: "Route", value: "CSMT → KYNR" },
                          { label: "Travel Date", value: "17 Jul 2026" },
                          { label: "Class", value: "3A" },
                          { label: "Pax", value: "3" },
                          { label: "Agent", value: "Royal Wings" },
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

              {/* RRQ-2037 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2037</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Ravi Gupta</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12953</p><p className="text-xs text-slate-400">August Kranti Raj</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">MMCT</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">18 Jul 2026</td>
                <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">SL</td>
                <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">2</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3 text-xs text-slate-400">07 Jul, 09:15</td>
                <td className="px-6 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Pending</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDialog({
                        mode: "approve",
                        title: "RRQ-2037 · Ravi Gupta",
                        summary: [
                          { label: "Route", value: "NDLS → MMCT" },
                          { label: "Train", value: "12953 August Kranti Raj" },
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
                        title: "RRQ-2037 · Ravi Gupta",
                        summary: [
                          { label: "Route", value: "NDLS → MMCT" },
                          { label: "Train", value: "12953 August Kranti Raj" },
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
                        title: "RRQ-2037 · Ravi Gupta",
                        summary: [],
                        details: [
                          { label: "Ref No.", value: "RRQ-2037" },
                          { label: "Passenger", value: "Ravi Gupta" },
                          { label: "Train", value: "12953 August Kranti Raj" },
                          { label: "Route", value: "NDLS → MMCT" },
                          { label: "Travel Date", value: "18 Jul 2026" },
                          { label: "Class", value: "SL" },
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

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing 7 of 7 pending requests</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-600 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>

      <RecordDialog state={dialog} onClose={() => setDialog(null)} onConfirm={() => setDialog(null)} />
    </div>
  )
}
