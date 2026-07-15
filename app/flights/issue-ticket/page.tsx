"use client"

import { useState } from "react"
import FormDialog from "../../components/FormDialog"

type Request = { ref: string; passenger: string; airline: string; from: string; to: string; date: string; agent: string }

const requests: Request[] = [
  { ref: "REQ-10231", passenger: "Rajesh Kumar", airline: "IndiGo", from: "DEL", to: "BOM", date: "12 Jul 2026", agent: "TravelBox" },
  { ref: "REQ-10232", passenger: "Priya Sharma", airline: "Air India", from: "BOM", to: "DEL", date: "13 Jul 2026", agent: "FlyDeal" },
  { ref: "REQ-10233", passenger: "Amit Singh", airline: "SpiceJet", from: "BOM", to: "GOI", date: "14 Jul 2026", agent: "StarTravel" },
  { ref: "REQ-10234", passenger: "Sneha Patel", airline: "Vistara", from: "DEL", to: "BLR", date: "15 Jul 2026", agent: "TravelBox" },
  { ref: "REQ-10235", passenger: "Deepa Menon", airline: "Air Asia", from: "COK", to: "DEL", date: "16 Jul 2026", agent: "QuickBook" },
]

function isValidPnr(value: string) {
  return /^[A-Z0-9]{5,8}$/.test(value.trim().toUpperCase())
}

export default function IssueTicketPage() {
  const [issued, setIssued] = useState<Record<string, { pnr: string; issuedAt: string }>>({})
  const [dialogRef, setDialogRef] = useState<string | null>(null)
  const [pnrInput, setPnrInput] = useState("")
  const [pnrError, setPnrError] = useState("")

  const pendingCount = requests.length - Object.keys(issued).length
  const issuedCount = Object.keys(issued).length
  const activeRequest = requests.find((r) => r.ref === dialogRef) ?? null

  const openDialog = (ref: string) => {
    setDialogRef(ref)
    setPnrInput("")
    setPnrError("")
  }

  const closeDialog = () => setDialogRef(null)

  const submitPnr = () => {
    if (!activeRequest) return
    if (!isValidPnr(pnrInput)) {
      setPnrError("Enter a valid PNR (5-8 alphanumeric characters)")
      return
    }
    setIssued((prev) => ({ ...prev, [activeRequest.ref]: { pnr: pnrInput.trim().toUpperCase(), issuedAt: "Just now" } }))
    closeDialog()
  }

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
                <th className="px-6 py-3 text-left font-medium">Airline</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Travel Date</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">PNR</th>
                <th className="px-6 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {requests.map((r) => {
                const record = issued[r.ref]
                return (
                  <tr key={r.ref} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                    <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{r.ref}</td>
                    <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.passenger}</td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.airline}</td>
                    <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">{r.from}</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">{r.to}</span></td>
                    <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{r.date}</td>
                    <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                    <td className="px-6 py-3">
                      {record ? (
                        <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">{record.pnr}</span>
                      ) : (
                        <span className="text-xs text-slate-300 dark:text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {record ? (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span>
                      ) : (
                        <button
                          onClick={() => openDialog(r.ref)}
                          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                          Issue Ticket
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
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
              {requests.filter((r) => issued[r.ref]).map((r) => (
                <tr key={r.ref} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{issued[r.ref].pnr}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{r.ref}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.passenger}</td>
                  <td className="px-6 py-3"><span className="font-semibold text-slate-800 dark:text-slate-100">{r.from}</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800 dark:text-slate-100">{r.to}</span></td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{issued[r.ref].issuedAt}</td>
                  <td className="px-6 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Confirmed</span></td>
                </tr>
              ))}
              {issuedCount === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-400">No tickets issued yet in this session.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FormDialog
        open={dialogRef !== null}
        title={activeRequest ? `Issue Ticket · ${activeRequest.ref}` : "Issue Ticket"}
        subtitle={activeRequest ? `${activeRequest.passenger} · ${activeRequest.airline} · ${activeRequest.from} → ${activeRequest.to}` : undefined}
        onClose={closeDialog}
        footer={
          <>
            <button onClick={closeDialog} className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
            <button onClick={submitPnr} className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">Issue Ticket</button>
          </>
        }
      >
        <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Confirmed PNR</label>
        <input
          value={pnrInput}
          onChange={(e) => { setPnrInput(e.target.value.toUpperCase()); setPnrError("") }}
          placeholder="e.g. 6E2847"
          maxLength={8}
          autoFocus
          className={`w-full rounded-lg border px-3 py-2 text-sm font-mono uppercase outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-200 ${pnrError ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100 focus:border-blue-300 dark:border-slate-700"}`}
        />
        {pnrError && <p className="mt-1.5 text-xs text-red-500">{pnrError}</p>}
      </FormDialog>
    </div>
  )
}
