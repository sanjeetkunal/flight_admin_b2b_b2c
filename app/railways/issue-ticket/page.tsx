"use client"

import { useState } from "react"

function isValidPnr(value: string) {
  return /^\d{10}$/.test(value.trim())
}

export default function RailwaysIssueTicketPage() {
  // Request 1 — RRQ-2101
  const [pnr1, setPnr1] = useState("")
  const [error1, setError1] = useState("")
  const [issued1, setIssued1] = useState<{ pnr: string; issuedAt: string } | null>(null)

  // Request 2 — RRQ-2102
  const [pnr2, setPnr2] = useState("")
  const [error2, setError2] = useState("")
  const [issued2, setIssued2] = useState<{ pnr: string; issuedAt: string } | null>(null)

  // Request 3 — RRQ-2103
  const [pnr3, setPnr3] = useState("")
  const [error3, setError3] = useState("")
  const [issued3, setIssued3] = useState<{ pnr: string; issuedAt: string } | null>(null)

  // Request 4 — RRQ-2104
  const [pnr4, setPnr4] = useState("")
  const [error4, setError4] = useState("")
  const [issued4, setIssued4] = useState<{ pnr: string; issuedAt: string } | null>(null)

  // Request 5 — RRQ-2105
  const [pnr5, setPnr5] = useState("")
  const [error5, setError5] = useState("")
  const [issued5, setIssued5] = useState<{ pnr: string; issuedAt: string } | null>(null)

  const pendingCount = [issued1, issued2, issued3, issued4, issued5].filter((v) => v === null).length
  const issuedCount = [issued1, issued2, issued3, issued4, issued5].filter((v) => v !== null).length

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-sm">All <span className="ml-0.5 opacity-70">(5)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Awaiting PNR <span className="ml-0.5 opacity-70">({pendingCount})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Issued <span className="ml-0.5 opacity-70">({issuedCount})</span></button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search ref, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips — aligned to one side, below the filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 dark:border-amber-500/20 dark:bg-amber-500/10">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{pendingCount}</span>
          <span className="text-xs text-amber-600/70 dark:text-amber-400/70">Awaiting PNR</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{issuedCount}</span>
          <span className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Issued Today</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 dark:border-blue-500/20 dark:bg-blue-500/10">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">12</span>
          <span className="text-xs text-blue-600/70 dark:text-blue-400/70">Total Pax</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 dark:border-violet-500/20 dark:bg-violet-500/10">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600 dark:text-violet-400">4</span>
          <span className="text-xs text-violet-600/70 dark:text-violet-400/70">Agents Waiting</span>
        </div>
      </div>

      {/* Issue ticket table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Issue Ticket</h2>
          <p className="text-xs text-slate-400">Enter the confirmed PNR for a pending request to generate its ticket</p>
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
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Enter PNR</th>
                <th className="px-6 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {/* RRQ-2101 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2101</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Rajesh Kumar</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12951</p><p className="text-xs text-slate-400">Mumbai Rajdhani</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">MMCT</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">12 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3">
                  {issued1 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued1.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr1}
                        onChange={(e) => { setPnr1(e.target.value.replace(/\D/g, "")); setError1("") }}
                        placeholder="e.g. 6712349001"
                        maxLength={10}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono outline-none focus:ring-2 ${error1 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error1 && <p className="mt-1 text-[11px] text-red-500">{error1}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued1 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr1) ? setIssued1({ pnr: pnr1.trim(), issuedAt: "Just now" }) : setError1("Enter a valid 10-digit PNR") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>

              {/* RRQ-2102 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2102</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Priya Sharma</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12301</p><p className="text-xs text-slate-400">Howrah Rajdhani</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">HWH</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">13 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3">
                  {issued2 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued2.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr2}
                        onChange={(e) => { setPnr2(e.target.value.replace(/\D/g, "")); setError2("") }}
                        placeholder="e.g. 2345678901"
                        maxLength={10}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono outline-none focus:ring-2 ${error2 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error2 && <p className="mt-1 text-[11px] text-red-500">{error2}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued2 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr2) ? setIssued2({ pnr: pnr2.trim(), issuedAt: "Just now" }) : setError2("Enter a valid 10-digit PNR") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>

              {/* RRQ-2103 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2103</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Amit Singh</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12002</p><p className="text-xs text-slate-400">Bhopal Shatabdi</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">BPL</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">14 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3">
                  {issued3 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued3.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr3}
                        onChange={(e) => { setPnr3(e.target.value.replace(/\D/g, "")); setError3("") }}
                        placeholder="e.g. 3456789012"
                        maxLength={10}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono outline-none focus:ring-2 ${error3 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error3 && <p className="mt-1 text-[11px] text-red-500">{error3}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued3 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr3) ? setIssued3({ pnr: pnr3.trim(), issuedAt: "Just now" }) : setError3("Enter a valid 10-digit PNR") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>

              {/* RRQ-2104 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2104</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sneha Patel</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12009</p><p className="text-xs text-slate-400">Mumbai Shatabdi</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">MMCT</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">PUNE</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">15 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3">
                  {issued4 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued4.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr4}
                        onChange={(e) => { setPnr4(e.target.value.replace(/\D/g, "")); setError4("") }}
                        placeholder="e.g. 4567890123"
                        maxLength={10}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono outline-none focus:ring-2 ${error4 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error4 && <p className="mt-1 text-[11px] text-red-500">{error4}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued4 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr4) ? setIssued4({ pnr: pnr4.trim(), issuedAt: "Just now" }) : setError4("Enter a valid 10-digit PNR") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>

              {/* RRQ-2105 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">RRQ-2105</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Deepa Menon</td>
                <td className="px-6 py-3"><p className="font-semibold text-slate-800 dark:text-slate-100">12625</p><p className="text-xs text-slate-400">Kerala Express</p></td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">TVC</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">16 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">QuickBook</td>
                <td className="px-6 py-3">
                  {issued5 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued5.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr5}
                        onChange={(e) => { setPnr5(e.target.value.replace(/\D/g, "")); setError5("") }}
                        placeholder="e.g. 5678901234"
                        maxLength={10}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono outline-none focus:ring-2 ${error5 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error5 && <p className="mt-1 text-[11px] text-red-500">{error5}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued5 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr5) ? setIssued5({ pnr: pnr5.trim(), issuedAt: "Just now" }) : setError5("Enter a valid 10-digit PNR") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recently issued tickets */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recently Issued Tickets</h2>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">{issuedCount} issued</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">PNR</th>
                <th className="px-6 py-3 text-left font-medium">Ref No.</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Issued</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {issued1 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{issued1.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">RRQ-2101</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Rajesh Kumar</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">MMCT</span></td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued1.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span></td>
                </tr>
              )}
              {issued2 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{issued2.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">RRQ-2102</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Priya Sharma</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">HWH</span></td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued2.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span></td>
                </tr>
              )}
              {issued3 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{issued3.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">RRQ-2103</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Amit Singh</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">BPL</span></td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued3.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span></td>
                </tr>
              )}
              {issued4 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{issued4.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">RRQ-2104</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sneha Patel</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">MMCT</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">PUNE</span></td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued4.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span></td>
                </tr>
              )}
              {issued5 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{issued5.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">RRQ-2105</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Deepa Menon</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">NDLS</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">TVC</span></td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">QuickBook</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued5.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span></td>
                </tr>
              )}
              {issuedCount === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-400">No tickets issued yet in this session.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
