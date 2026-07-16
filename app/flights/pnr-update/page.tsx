"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"
import Pagination from "../../components/Pagination"

function isValidPnr(value: string) {
  return /^[A-Z0-9]{5,8}$/.test(value.trim().toUpperCase())
}

export default function PnrUpdatePage() {
  const [dialog, setDialog] = useState<DialogState>(null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)

  const closeDialog = () => { setDialog(null); setConfirmAction(null) }
  const runConfirm = () => { confirmAction?.(); closeDialog() }

  // Row 1 — 6E2847
  const [pnr1, setPnr1] = useState("")
  const [error1, setError1] = useState("")
  const [current1, setCurrent1] = useState("6E2847")
  const [updatedAt1, setUpdatedAt1] = useState("09 Jul, 08:10")

  // Row 2 — AI1045
  const [pnr2, setPnr2] = useState("")
  const [error2, setError2] = useState("")
  const [current2, setCurrent2] = useState("AI1045")
  const [updatedAt2, setUpdatedAt2] = useState("08 Jul, 19:22")

  // Row 3 — SG301
  const [pnr3, setPnr3] = useState("")
  const [error3, setError3] = useState("")
  const [current3, setCurrent3] = useState("SG301")
  const [updatedAt3, setUpdatedAt3] = useState("07 Jul, 14:55")

  // Row 4 — UK927
  const [pnr4, setPnr4] = useState("")
  const [error4, setError4] = useState("")
  const [current4, setCurrent4] = useState("UK927")
  const [updatedAt4, setUpdatedAt4] = useState("06 Jul, 11:30")

  // Row 5 — G8502
  const [pnr5, setPnr5] = useState("")
  const [error5, setError5] = useState("")
  const [current5, setCurrent5] = useState("G8502")
  const [updatedAt5, setUpdatedAt5] = useState("05 Jul, 09:48")

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-sm">All <span className="ml-0.5 opacity-70">(5)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Economy <span className="ml-0.5 opacity-70">(3)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Business <span className="ml-0.5 opacity-70">(1)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Premium Eco <span className="ml-0.5 opacity-70">(1)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Recently Updated</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search PNR, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">5</span>
          <span className="text-xs text-blue-600/70">Confirmed Bookings</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">0</span>
          <span className="text-xs text-emerald-600/70">Updated Today</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">5</span>
          <span className="text-xs text-violet-600/70">Agents</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600">3 days</span>
          <span className="text-xs text-amber-600/70">Since Last Update</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Flight PNR Update</h2>
          <p className="text-xs text-slate-400">Correct or update the airline PNR on an already confirmed booking</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Current PNR</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Airline</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Travel Date</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">New PNR</th>
                <th className="px-6 py-3 text-left font-medium">Last Updated</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{current1}</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Rajesh Kumar</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">IndiGo</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">BOM</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">30 Jun 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3">
                  <input
                    value={pnr1}
                    onChange={(e) => { setPnr1(e.target.value.toUpperCase()); setError1("") }}
                    placeholder="e.g. 6E9931"
                    maxLength={8}
                    className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error1 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                  />
                  {error1 && <p className="mt-1 text-[11px] text-red-500">{error1}</p>}
                </td>
                <td className="px-6 py-3 text-xs text-slate-400">{updatedAt1}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (!isValidPnr(pnr1)) { setError1("Enter a valid PNR (5-8 alphanumeric characters)"); return }
                        setDialog({
                          mode: "confirm",
                          title: "Update PNR · Rajesh Kumar",
                          summary: [
                            { label: "Current PNR", value: current1 },
                            { label: "New PNR", value: pnr1.trim().toUpperCase() },
                            { label: "Route", value: "DEL → BOM" },
                            { label: "Agent", value: "TravelBox" },
                          ],
                          details: [],
                          confirmLabel: "Update PNR",
                        })
                        setConfirmAction(() => () => { setCurrent1(pnr1.trim().toUpperCase()); setUpdatedAt1("Just now"); setPnr1("") })
                      }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "6E2847 · Rajesh Kumar",
                        summary: [],
                        details: [
                          { label: "PNR", value: current1 },
                          { label: "Passenger", value: "Rajesh Kumar" },
                          { label: "Airline", value: "IndiGo" },
                          { label: "Route", value: "DEL → BOM" },
                          { label: "Travel Date", value: "30 Jun 2026" },
                          { label: "Class", value: "Economy" },
                          { label: "Agent", value: "TravelBox" },
                          { label: "Last Updated", value: updatedAt1 },
                          { label: "Status", value: "Confirmed" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{current2}</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Priya Sharma</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Air India</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">30 Jun 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3">
                  <input
                    value={pnr2}
                    onChange={(e) => { setPnr2(e.target.value.toUpperCase()); setError2("") }}
                    placeholder="e.g. AI7723"
                    maxLength={8}
                    className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error2 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                  />
                  {error2 && <p className="mt-1 text-[11px] text-red-500">{error2}</p>}
                </td>
                <td className="px-6 py-3 text-xs text-slate-400">{updatedAt2}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (!isValidPnr(pnr2)) { setError2("Enter a valid PNR (5-8 alphanumeric characters)"); return }
                        setDialog({
                          mode: "confirm",
                          title: "Update PNR · Priya Sharma",
                          summary: [
                            { label: "Current PNR", value: current2 },
                            { label: "New PNR", value: pnr2.trim().toUpperCase() },
                            { label: "Route", value: "BOM → DEL" },
                            { label: "Agent", value: "FlyDeal" },
                          ],
                          details: [],
                          confirmLabel: "Update PNR",
                        })
                        setConfirmAction(() => () => { setCurrent2(pnr2.trim().toUpperCase()); setUpdatedAt2("Just now"); setPnr2("") })
                      }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "AI1045 · Priya Sharma",
                        summary: [],
                        details: [
                          { label: "PNR", value: current2 },
                          { label: "Passenger", value: "Priya Sharma" },
                          { label: "Airline", value: "Air India" },
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Travel Date", value: "30 Jun 2026" },
                          { label: "Class", value: "Business" },
                          { label: "Agent", value: "FlyDeal" },
                          { label: "Last Updated", value: updatedAt2 },
                          { label: "Status", value: "Confirmed" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{current3}</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Amit Singh</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">SpiceJet</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">GOI</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">01 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3">
                  <input
                    value={pnr3}
                    onChange={(e) => { setPnr3(e.target.value.toUpperCase()); setError3("") }}
                    placeholder="e.g. SG884"
                    maxLength={8}
                    className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error3 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                  />
                  {error3 && <p className="mt-1 text-[11px] text-red-500">{error3}</p>}
                </td>
                <td className="px-6 py-3 text-xs text-slate-400">{updatedAt3}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (!isValidPnr(pnr3)) { setError3("Enter a valid PNR (5-8 alphanumeric characters)"); return }
                        setDialog({
                          mode: "confirm",
                          title: "Update PNR · Amit Singh",
                          summary: [
                            { label: "Current PNR", value: current3 },
                            { label: "New PNR", value: pnr3.trim().toUpperCase() },
                            { label: "Route", value: "BOM → GOI" },
                            { label: "Agent", value: "StarTravel" },
                          ],
                          details: [],
                          confirmLabel: "Update PNR",
                        })
                        setConfirmAction(() => () => { setCurrent3(pnr3.trim().toUpperCase()); setUpdatedAt3("Just now"); setPnr3("") })
                      }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "SG301 · Amit Singh",
                        summary: [],
                        details: [
                          { label: "PNR", value: current3 },
                          { label: "Passenger", value: "Amit Singh" },
                          { label: "Airline", value: "SpiceJet" },
                          { label: "Route", value: "BOM → GOI" },
                          { label: "Travel Date", value: "01 Jul 2026" },
                          { label: "Class", value: "Economy" },
                          { label: "Agent", value: "StarTravel" },
                          { label: "Last Updated", value: updatedAt3 },
                          { label: "Status", value: "Confirmed" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{current4}</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sneha Patel</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Vistara</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">BLR</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">01 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3">
                  <input
                    value={pnr4}
                    onChange={(e) => { setPnr4(e.target.value.toUpperCase()); setError4("") }}
                    placeholder="e.g. UK415"
                    maxLength={8}
                    className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error4 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                  />
                  {error4 && <p className="mt-1 text-[11px] text-red-500">{error4}</p>}
                </td>
                <td className="px-6 py-3 text-xs text-slate-400">{updatedAt4}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (!isValidPnr(pnr4)) { setError4("Enter a valid PNR (5-8 alphanumeric characters)"); return }
                        setDialog({
                          mode: "confirm",
                          title: "Update PNR · Sneha Patel",
                          summary: [
                            { label: "Current PNR", value: current4 },
                            { label: "New PNR", value: pnr4.trim().toUpperCase() },
                            { label: "Route", value: "DEL → BLR" },
                            { label: "Agent", value: "TravelBox" },
                          ],
                          details: [],
                          confirmLabel: "Update PNR",
                        })
                        setConfirmAction(() => () => { setCurrent4(pnr4.trim().toUpperCase()); setUpdatedAt4("Just now"); setPnr4("") })
                      }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "UK927 · Sneha Patel",
                        summary: [],
                        details: [
                          { label: "PNR", value: current4 },
                          { label: "Passenger", value: "Sneha Patel" },
                          { label: "Airline", value: "Vistara" },
                          { label: "Route", value: "DEL → BLR" },
                          { label: "Travel Date", value: "01 Jul 2026" },
                          { label: "Class", value: "Premium Eco" },
                          { label: "Agent", value: "TravelBox" },
                          { label: "Last Updated", value: updatedAt4 },
                          { label: "Status", value: "Confirmed" },
                        ],
                      })}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{current5}</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Vikram Nair</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Go First</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">DEL</span></td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">02 Jul 2026</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3">
                  <input
                    value={pnr5}
                    onChange={(e) => { setPnr5(e.target.value.toUpperCase()); setError5("") }}
                    placeholder="e.g. G8117"
                    maxLength={8}
                    className={`w-28 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${error5 ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                  />
                  {error5 && <p className="mt-1 text-[11px] text-red-500">{error5}</p>}
                </td>
                <td className="px-6 py-3 text-xs text-slate-400">{updatedAt5}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (!isValidPnr(pnr5)) { setError5("Enter a valid PNR (5-8 alphanumeric characters)"); return }
                        setDialog({
                          mode: "confirm",
                          title: "Update PNR · Vikram Nair",
                          summary: [
                            { label: "Current PNR", value: current5 },
                            { label: "New PNR", value: pnr5.trim().toUpperCase() },
                            { label: "Route", value: "BOM → DEL" },
                            { label: "Agent", value: "FlyDeal" },
                          ],
                          details: [],
                          confirmLabel: "Update PNR",
                        })
                        setConfirmAction(() => () => { setCurrent5(pnr5.trim().toUpperCase()); setUpdatedAt5("Just now"); setPnr5("") })
                      }}
                      className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDialog({
                        mode: "view",
                        title: "G8502 · Vikram Nair",
                        summary: [],
                        details: [
                          { label: "PNR", value: current5 },
                          { label: "Passenger", value: "Vikram Nair" },
                          { label: "Airline", value: "Go First" },
                          { label: "Route", value: "BOM → DEL" },
                          { label: "Travel Date", value: "02 Jul 2026" },
                          { label: "Class", value: "Economy" },
                          { label: "Agent", value: "FlyDeal" },
                          { label: "Last Updated", value: updatedAt5 },
                          { label: "Status", value: "Confirmed" },
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

        <Pagination page={1} pageSize={10} totalItems={5} onPageChange={() => {}} itemLabel="confirmed bookings" />
      </div>

      <RecordDialog state={dialog} onClose={closeDialog} onConfirm={runConfirm} />
    </div>
  )
}
