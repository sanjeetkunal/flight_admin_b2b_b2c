"use client"

import { useMemo, useState } from "react"

type RawEntry = {
  id: number
  date: string
  agentId: string
  agentName: string
  ref: string
  description: string
  type: "Debit" | "Credit"
  amount: number
}

type LedgerEntry = RawEntry & { balance: number }

const openingBalances: Record<string, number> = {
  AG001: 45000,
  AG002: 22000,
  AG003: 15600,
  AG004: 8200,
  AG005: 61000,
  AG006: 12000,
}

const agentNames: Record<string, string> = {
  AG001: "TravelBox Pvt Ltd",
  AG002: "FlyDeal Travel Agency",
  AG003: "StarTravel Solutions",
  AG004: "QuickBook Tours",
  AG005: "Horizon Holidays",
  AG006: "Disha Travels",
}

const rawEntries: RawEntry[] = [
  { id: 1, date: "2026-06-25", agentId: "AG005", agentName: "Horizon Holidays", ref: "REQ-BOOK-1120", description: "Holiday package Goa 4N/5D", type: "Debit", amount: 42000 },
  { id: 2, date: "2026-06-26", agentId: "AG003", agentName: "StarTravel Solutions", ref: "REQ-BOOK-1140", description: "Flight booking BOM-GOI (SG301)", type: "Debit", amount: 14800 },
  { id: 3, date: "2026-06-27", agentId: "AG002", agentName: "FlyDeal Travel Agency", ref: "REQ-BOOK-1150", description: "Flight booking BOM-DEL (AI1045)", type: "Debit", amount: 22100 },
  { id: 4, date: "2026-06-27", agentId: "AG006", agentName: "Disha Travels", ref: "REQ-BOOK-1145", description: "Railway booking NDLS-MMCT", type: "Debit", amount: 2145 },
  { id: 5, date: "2026-06-28", agentId: "AG001", agentName: "TravelBox Pvt Ltd", ref: "REQ-BOOK-1187", description: "Flight booking DEL-BOM (6E2847)", type: "Debit", amount: 8450 },
  { id: 6, date: "2026-06-28", agentId: "AG004", agentName: "QuickBook Tours", ref: "REQ-BOOK-1160", description: "Flight booking COK-DEL (IX234)", type: "Debit", amount: 5200 },
  { id: 7, date: "2026-06-29", agentId: "AG001", agentName: "TravelBox Pvt Ltd", ref: "PAY-2201", description: "Payment received via NEFT", type: "Credit", amount: 20000 },
  { id: 8, date: "2026-06-29", agentId: "AG003", agentName: "StarTravel Solutions", ref: "PAY-2190", description: "Payment received via NEFT", type: "Credit", amount: 10000 },
  { id: 9, date: "2026-06-30", agentId: "AG002", agentName: "FlyDeal Travel Agency", ref: "PAY-2198", description: "Payment received via UPI", type: "Credit", amount: 15000 },
  { id: 10, date: "2026-06-30", agentId: "AG005", agentName: "Horizon Holidays", ref: "PAY-2185", description: "Payment received via NEFT", type: "Credit", amount: 25000 },
  { id: 11, date: "2026-07-01", agentId: "AG001", agentName: "TravelBox Pvt Ltd", ref: "REQ-BOOK-1201", description: "Flight booking DEL-LHR (AI202)", type: "Debit", amount: 214000 },
  { id: 12, date: "2026-07-01", agentId: "AG004", agentName: "QuickBook Tours", ref: "PAY-2205", description: "Payment received via NEFT", type: "Credit", amount: 6000 },
  { id: 13, date: "2026-07-02", agentId: "AG002", agentName: "FlyDeal Travel Agency", ref: "REQ-BOOK-1210", description: "Flight booking DEL-SIN (SQ422)", type: "Debit", amount: 98000 },
  { id: 14, date: "2026-07-02", agentId: "AG006", agentName: "Disha Travels", ref: "PAY-2200", description: "Payment received via UPI", type: "Credit", amount: 5000 },
  { id: 15, date: "2026-07-03", agentId: "AG001", agentName: "TravelBox Pvt Ltd", ref: "CN-3305", description: "Commission payable adjustment", type: "Credit", amount: 12500 },
  { id: 16, date: "2026-07-03", agentId: "AG005", agentName: "Horizon Holidays", ref: "REQ-BOOK-1215", description: "Flight booking DEL-BLR (UK927)", type: "Debit", amount: 18600 },
  { id: 17, date: "2026-07-04", agentId: "AG003", agentName: "StarTravel Solutions", ref: "REQ-BOOK-1218", description: "Flight booking DEL-HYD (6E4821)", type: "Debit", amount: 9800 },
  { id: 18, date: "2026-07-05", agentId: "AG001", agentName: "TravelBox Pvt Ltd", ref: "REQ-BOOK-1224", description: "Flight booking BOM-DXB (EK501)", type: "Debit", amount: 112500 },
  { id: 19, date: "2026-07-05", agentId: "AG004", agentName: "QuickBook Tours", ref: "REQ-BOOK-1230", description: "Flight booking BOM-DXB (EK501)", type: "Debit", amount: 11200 },
  { id: 20, date: "2026-07-06", agentId: "AG002", agentName: "FlyDeal Travel Agency", ref: "RFN-4998", description: "Refund adjustment credited", type: "Credit", amount: 22100 },
  { id: 21, date: "2026-07-06", agentId: "AG005", agentName: "Horizon Holidays", ref: "CN-3312", description: "Commission payable adjustment", type: "Credit", amount: 8000 },
]

function formatInr(n: number) {
  const sign = n < 0 ? "-" : ""
  return `${sign}₹${Math.abs(n).toLocaleString("en-IN")}`
}

function formatDisplayDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
}

export default function LedgerReportPage() {
  const [agentFilter, setAgentFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState<"All" | "Debit" | "Credit">("All")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [search, setSearch] = useState("")

  // Compute running balance per agent in true chronological order (independent of filters)
  const ledgerWithBalance = useMemo<LedgerEntry[]>(() => {
    const byAgent: Record<string, RawEntry[]> = {}
    for (const e of rawEntries) {
      byAgent[e.agentId] = byAgent[e.agentId] || []
      byAgent[e.agentId].push(e)
    }
    const result: LedgerEntry[] = []
    for (const agentId of Object.keys(byAgent)) {
      const sorted = [...byAgent[agentId]].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id)
      let balance = openingBalances[agentId] ?? 0
      for (const e of sorted) {
        balance += e.type === "Debit" ? e.amount : -e.amount
        result.push({ ...e, balance })
      }
    }
    return result
  }, [])

  const closingBalances = useMemo(() => {
    const map: Record<string, number> = {}
    for (const agentId of Object.keys(agentNames)) {
      const entries = ledgerWithBalance.filter((e) => e.agentId === agentId)
      map[agentId] = entries.length ? entries[entries.length - 1].balance : openingBalances[agentId] ?? 0
    }
    return map
  }, [ledgerWithBalance])

  const filtered = useMemo(() => {
    return ledgerWithBalance
      .filter((e) => agentFilter === "All" || e.agentId === agentFilter)
      .filter((e) => typeFilter === "All" || e.type === typeFilter)
      .filter((e) => !dateFrom || e.date >= dateFrom)
      .filter((e) => !dateTo || e.date <= dateTo)
      .filter((e) => {
        if (!search.trim()) return true
        const q = search.toLowerCase()
        return e.ref.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.agentName.toLowerCase().includes(q)
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
  }, [ledgerWithBalance, agentFilter, typeFilter, dateFrom, dateTo, search])

  const totalDebit = filtered.filter((e) => e.type === "Debit").reduce((s, e) => s + e.amount, 0)
  const totalCredit = filtered.filter((e) => e.type === "Credit").reduce((s, e) => s + e.amount, 0)

  const openingForView = agentFilter === "All"
    ? Object.values(openingBalances).reduce((s, v) => s + v, 0)
    : openingBalances[agentFilter] ?? 0

  const closingForView = agentFilter === "All"
    ? Object.values(closingBalances).reduce((s, v) => s + v, 0)
    : closingBalances[agentFilter] ?? 0

  const resetFilters = () => {
    setAgentFilter("All")
    setTypeFilter("All")
    setDateFrom("")
    setDateTo("")
    setSearch("")
  }

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Agent</label>
            <select value={agentFilter} onChange={(e) => setAgentFilter(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300">
              <option value="All">All Agents</option>
              {Object.entries(agentNames).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Type</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as "All" | "Debit" | "Credit")} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300">
              <option value="All">All</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">From Date</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">To Date</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Search</label>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <svg className="h-4 w-4 flex-shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ref, description..." className="w-full bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none" />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button onClick={resetFilters} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">Reset Filters</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">Export</button>
        </div>
      </div>

      {/* Stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="text-sm font-bold text-slate-700">{formatInr(openingForView)}</span>
          <span className="text-xs text-slate-500">Opening Balance</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600">{formatInr(totalDebit)}</span>
          <span className="text-xs text-red-600/70">Total Debit</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{formatInr(totalCredit)}</span>
          <span className="text-xs text-emerald-600/70">Total Credit</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">{formatInr(closingForView)}</span>
          <span className="text-xs text-blue-600/70">Closing Balance</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">{filtered.length}</span>
          <span className="text-xs text-violet-600/70">Entries</span>
        </div>
      </div>

      {/* Ledger table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Agent Ledger Report</h2>
            <p className="text-xs text-slate-400">Debit / credit transactions and running balance per agent</p>
          </div>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{filtered.length} entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Date</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Reference</th>
                <th className="px-6 py-3 text-left font-medium">Description</th>
                <th className="px-6 py-3 text-left font-medium">Type</th>
                <th className="px-6 py-3 text-right font-medium">Debit</th>
                <th className="px-6 py-3 text-right font-medium">Credit</th>
                <th className="px-6 py-3 text-right font-medium">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 text-xs text-slate-500 whitespace-nowrap">{formatDisplayDate(e.date)}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 whitespace-nowrap">{e.agentName}</td>
                  <td className="px-6 py-3 font-mono text-xs text-blue-700 whitespace-nowrap">{e.ref}</td>
                  <td className="px-6 py-3 text-slate-600">{e.description}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${e.type === "Debit" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>{e.type}</span>
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-red-600">{e.type === "Debit" ? formatInr(e.amount) : "-"}</td>
                  <td className="px-6 py-3 text-right font-medium text-emerald-600">{e.type === "Credit" ? formatInr(e.amount) : "-"}</td>
                  <td className="px-6 py-3 text-right font-semibold text-slate-800 whitespace-nowrap">{formatInr(e.balance)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-sm text-slate-400">No ledger entries match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {ledgerWithBalance.length} entries</p>
        </div>
      </div>
    </div>
  )
}
