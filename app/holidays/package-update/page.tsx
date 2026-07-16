"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"
import Pagination from "../../components/Pagination"

const PAGE_SIZE = 5

type Row = { client: string; package: string; destination: string; travel: string; agent: string; current: string; updatedAt: string; category: string }

const initialRows: Row[] = [
  { client: "Sneha Patel", package: "Goa Beach Escape", destination: "Goa", travel: "05 Jul 2026", agent: "TravelBox", current: "HOL08821", updatedAt: "09 Jul, 08:10", category: "Beach" },
  { client: "Rahul Sharma", package: "Kerala Backwaters", destination: "Kerala", travel: "08 Jul 2026", agent: "FlyDeal", current: "HOL08822", updatedAt: "08 Jul, 19:22", category: "Nature" },
  { client: "Vikram Nair", package: "Rajasthan Royal Tour", destination: "Rajasthan", travel: "20 Jul 2026", agent: "TravelBox", current: "HOL08824", updatedAt: "07 Jul, 14:55", category: "Heritage" },
  { client: "Deepak Singh", package: "Shimla Manali Combo", destination: "Himachal", travel: "01 Aug 2026", agent: "FlyDeal", current: "HOL08826", updatedAt: "06 Jul, 11:30", category: "Hill Station" },
  { client: "Kavita Reddy", package: "Thailand Bangkok Pattaya", destination: "Thailand", travel: "10 Jul 2026", agent: "StarTravel", current: "HOL08827", updatedAt: "05 Jul, 09:48", category: "International" },
]

function isValidBookingId(value: string) {
  return /^[A-Z0-9]{6,10}$/.test(value.trim().toUpperCase())
}

export default function HolidaysPackageUpdatePage() {
  const [rows, setRows] = useState(initialRows)
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dialog, setDialog] = useState<DialogState>(null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const [page, setPage] = useState(1)
  const pagedRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const closeDialog = () => { setDialog(null); setConfirmAction(null) }
  const runConfirm = () => { confirmAction?.(); closeDialog() }

  const setInput = (key: string, value: string) => {
    setInputs((s) => ({ ...s, [key]: value.toUpperCase() }))
    setErrors((s) => ({ ...s, [key]: "" }))
  }

  const requestUpdate = (r: Row) => {
    const value = inputs[r.current] || ""
    if (!isValidBookingId(value)) {
      setErrors((s) => ({ ...s, [r.current]: "Enter a valid Booking ID (6-10 alphanumeric characters)" }))
      return
    }
    const newId = value.trim().toUpperCase()
    setDialog({
      mode: "confirm",
      title: `Update Booking ID · ${r.client}`,
      summary: [
        { label: "Current Booking ID", value: r.current },
        { label: "New Booking ID", value: newId },
        { label: "Destination", value: r.destination },
        { label: "Agent", value: r.agent },
      ],
      details: [],
      confirmLabel: "Update Booking ID",
    })
    setConfirmAction(() => () => {
      setRows((prev) => prev.map((row) => row.current === r.current ? { ...row, current: newId, updatedAt: "Just now" } : row))
      setInputs((s) => ({ ...s, [r.current]: "" }))
    })
  }

  const viewRow = (r: Row) => setDialog({
    mode: "view",
    title: `${r.current} · ${r.client}`,
    summary: [],
    details: [
      { label: "Booking ID", value: r.current },
      { label: "Client", value: r.client },
      { label: "Package", value: r.package },
      { label: "Destination", value: r.destination },
      { label: "Travel Date", value: r.travel },
      { label: "Category", value: r.category },
      { label: "Agent", value: r.agent },
      { label: "Last Updated", value: r.updatedAt },
      { label: "Status", value: "Confirmed" },
    ],
  })

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-sm">All <span className="ml-0.5 opacity-70">({rows.length})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Domestic <span className="ml-0.5 opacity-70">(4)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">International <span className="ml-0.5 opacity-70">(1)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Recently Updated</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search ID, client, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">{rows.length}</span>
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
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Package Update</h2>
          <p className="text-xs text-slate-400">Correct or update the operator booking ID on an already confirmed package</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Current Booking ID</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Package</th>
                <th className="px-6 py-3 text-left font-medium">Destination</th>
                <th className="px-6 py-3 text-left font-medium">Travel Date</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">New Booking ID</th>
                <th className="px-6 py-3 text-left font-medium">Last Updated</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {pagedRows.map((r) => (
                <tr key={r.client} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{r.current}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.client}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.package}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.destination}</td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{r.travel}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                  <td className="px-6 py-3">
                    <input
                      value={inputs[r.current] || ""}
                      onChange={(e) => setInput(r.current, e.target.value)}
                      placeholder="e.g. HOL09931"
                      maxLength={10}
                      className={`w-32 rounded-lg border px-2.5 py-1.5 text-xs font-mono uppercase outline-none focus:ring-2 ${errors[r.current] ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300"}`}
                    />
                    {errors[r.current] && <p className="mt-1 text-[11px] text-red-500">{errors[r.current]}</p>}
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-400">{r.updatedAt}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => requestUpdate(r)}
                        className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 transition-colors"
                      >
                        Update
                      </button>
                      <button onClick={() => viewRow(r)} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} pageSize={PAGE_SIZE} totalItems={rows.length} onPageChange={setPage} itemLabel="confirmed bookings" />
      </div>

      <RecordDialog state={dialog} onClose={closeDialog} onConfirm={runConfirm} />
    </div>
  )
}
