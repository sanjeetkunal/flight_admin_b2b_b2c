"use client"

import { useState } from "react"

function isValidPnr(value: string) {
  return /^[A-Z0-9]{5,8}$/.test(value.trim().toUpperCase())
}

export default function IssueTicketPage() {
  // Request 1 — REQ-10231
  const [pnr1, setPnr1] = useState("")
  const [error1, setError1] = useState("")
  const [issued1, setIssued1] = useState<{ pnr: string; issuedAt: string } | null>(null)

  // Request 2 — REQ-10232
  const [pnr2, setPnr2] = useState("")
  const [error2, setError2] = useState("")
  const [issued2, setIssued2] = useState<{ pnr: string; issuedAt: string } | null>(null)

  // Request 3 — REQ-10233
  const [pnr3, setPnr3] = useState("")
  const [error3, setError3] = useState("")
  const [issued3, setIssued3] = useState<{ pnr: string; issuedAt: string } | null>(null)

  // Request 4 — REQ-10234
  const [pnr4, setPnr4] = useState("")
  const [error4, setError4] = useState("")
  const [issued4, setIssued4] = useState<{ pnr: string; issuedAt: string } | null>(null)

  // Request 5 — REQ-10235
  const [pnr5, setPnr5] = useState("")
  const [error5, setError5] = useState("")
  const [issued5, setIssued5] = useState<{ pnr: string; issuedAt: string } | null>(null)

  const pendingCount = [issued1, issued2, issued3, issued4, issued5].filter((v) => v === null).length
  const issuedCount = [issued1, issued2, issued3, issued4, issued5].filter((v) => v !== null).length

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">(5)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">Awaiting PNR <span className="ml-0.5 opacity-70">({pendingCount})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">Issued <span className="ml-0.5 opacity-70">({issuedCount})</span></button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search ref, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56" />
        </div>
      </div>

      {/* Compact stat chips — aligned to one side, below the filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600">{pendingCount}</span>
          <span className="text-xs text-amber-600/70">Awaiting PNR</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{issuedCount}</span>
          <span className="text-xs text-emerald-600/70">Issued Today</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">10</span>
          <span className="text-xs text-blue-600/70">Total Pax</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">4</span>
          <span className="text-xs text-violet-600/70">Agents Waiting</span>
        </div>
      </div>

      {/* Issue ticket table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Issue Ticket</h2>
          <p className="text-xs text-slate-400">Enter the confirmed PNR for a pending request to generate its ticket</p>
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
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Enter PNR</th>
                <th className="px-6 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {/* REQ-10231 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">REQ-10231</td>
                <td className="px-6 py-3 font-medium text-slate-800">Rajesh Kumar</td>
                <td className="px-6 py-3 text-slate-600">IndiGo</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">BOM</span></td>
                <td className="px-6 py-3 text-slate-700">12 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500">TravelBox</td>
                <td className="px-6 py-3">
                  {issued1 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued1.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr1}
                        onChange={(e) => { setPnr1(e.target.value.toUpperCase()); setError1("") }}
                        placeholder="e.g. 6E2847"
                        maxLength={8}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error1 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error1 && <p className="mt-1 text-[11px] text-red-500">{error1}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued1 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr1) ? setIssued1({ pnr: pnr1.trim().toUpperCase(), issuedAt: "Just now" }) : setError1("Enter a valid PNR (5-8 alphanumeric characters)") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>

              {/* REQ-10232 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">REQ-10232</td>
                <td className="px-6 py-3 font-medium text-slate-800">Priya Sharma</td>
                <td className="px-6 py-3 text-slate-600">Air India</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                <td className="px-6 py-3 text-slate-700">13 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500">FlyDeal</td>
                <td className="px-6 py-3">
                  {issued2 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued2.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr2}
                        onChange={(e) => { setPnr2(e.target.value.toUpperCase()); setError2("") }}
                        placeholder="e.g. AI1045"
                        maxLength={8}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error2 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error2 && <p className="mt-1 text-[11px] text-red-500">{error2}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued2 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr2) ? setIssued2({ pnr: pnr2.trim().toUpperCase(), issuedAt: "Just now" }) : setError2("Enter a valid PNR (5-8 alphanumeric characters)") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>

              {/* REQ-10233 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">REQ-10233</td>
                <td className="px-6 py-3 font-medium text-slate-800">Amit Singh</td>
                <td className="px-6 py-3 text-slate-600">SpiceJet</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">GOI</span></td>
                <td className="px-6 py-3 text-slate-700">14 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500">StarTravel</td>
                <td className="px-6 py-3">
                  {issued3 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued3.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr3}
                        onChange={(e) => { setPnr3(e.target.value.toUpperCase()); setError3("") }}
                        placeholder="e.g. SG301"
                        maxLength={8}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error3 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error3 && <p className="mt-1 text-[11px] text-red-500">{error3}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued3 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr3) ? setIssued3({ pnr: pnr3.trim().toUpperCase(), issuedAt: "Just now" }) : setError3("Enter a valid PNR (5-8 alphanumeric characters)") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>

              {/* REQ-10234 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">REQ-10234</td>
                <td className="px-6 py-3 font-medium text-slate-800">Sneha Patel</td>
                <td className="px-6 py-3 text-slate-600">Vistara</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">BLR</span></td>
                <td className="px-6 py-3 text-slate-700">15 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500">TravelBox</td>
                <td className="px-6 py-3">
                  {issued4 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued4.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr4}
                        onChange={(e) => { setPnr4(e.target.value.toUpperCase()); setError4("") }}
                        placeholder="e.g. UK927"
                        maxLength={8}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error4 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error4 && <p className="mt-1 text-[11px] text-red-500">{error4}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued4 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr4) ? setIssued4({ pnr: pnr4.trim().toUpperCase(), issuedAt: "Just now" }) : setError4("Enter a valid PNR (5-8 alphanumeric characters)") }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Issue Ticket
                    </button>
                  )}
                </td>
              </tr>

              {/* REQ-10235 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">REQ-10235</td>
                <td className="px-6 py-3 font-medium text-slate-800">Deepa Menon</td>
                <td className="px-6 py-3 text-slate-600">Air Asia</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">COK</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                <td className="px-6 py-3 text-slate-700">16 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500">QuickBook</td>
                <td className="px-6 py-3">
                  {issued5 ? (
                    <span className="font-mono text-xs font-semibold text-emerald-700">{issued5.pnr}</span>
                  ) : (
                    <>
                      <input
                        value={pnr5}
                        onChange={(e) => { setPnr5(e.target.value.toUpperCase()); setError5("") }}
                        placeholder="e.g. IX234"
                        maxLength={8}
                        className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error5 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                      />
                      {error5 && <p className="mt-1 text-[11px] text-red-500">{error5}</p>}
                    </>
                  )}
                </td>
                <td className="px-6 py-3">
                  {issued5 ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => { isValidPnr(pnr5) ? setIssued5({ pnr: pnr5.trim().toUpperCase(), issuedAt: "Just now" }) : setError5("Enter a valid PNR (5-8 alphanumeric characters)") }}
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
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Recently Issued Tickets</h2>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">{issuedCount} issued</span>
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
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">{issued1.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">REQ-10231</td>
                  <td className="px-6 py-3 font-medium text-slate-800">Rajesh Kumar</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">BOM</span></td>
                  <td className="px-6 py-3 text-slate-500">TravelBox</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued1.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span></td>
                </tr>
              )}
              {issued2 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">{issued2.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">REQ-10232</td>
                  <td className="px-6 py-3 font-medium text-slate-800">Priya Sharma</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                  <td className="px-6 py-3 text-slate-500">FlyDeal</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued2.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span></td>
                </tr>
              )}
              {issued3 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">{issued3.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">REQ-10233</td>
                  <td className="px-6 py-3 font-medium text-slate-800">Amit Singh</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">GOI</span></td>
                  <td className="px-6 py-3 text-slate-500">StarTravel</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued3.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span></td>
                </tr>
              )}
              {issued4 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">{issued4.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">REQ-10234</td>
                  <td className="px-6 py-3 font-medium text-slate-800">Sneha Patel</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">BLR</span></td>
                  <td className="px-6 py-3 text-slate-500">TravelBox</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued4.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span></td>
                </tr>
              )}
              {issued5 && (
                <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">{issued5.pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">REQ-10235</td>
                  <td className="px-6 py-3 font-medium text-slate-800">Deepa Menon</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800">COK</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                  <td className="px-6 py-3 text-slate-500">QuickBook</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued5.issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Confirmed</span></td>
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
