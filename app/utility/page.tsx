"use client"

import { useEffect, useState } from "react"
import Pagination from "../components/Pagination"

const PAGE_SIZE = 5

const transactions = [
  { id: "UT00341", type: "Electricity", provider: "BSES Delhi", consumer: "1234567890", amount: "₹2,340", charges: "₹12", total: "₹2,352", status: "Success", agent: "TravelBox", time: "30 Jun, 09:14", mobile: "9876543210" },
  { id: "UT00342", type: "Mobile Recharge", provider: "Jio", consumer: "9876543210", amount: "₹599", charges: "₹0", total: "₹599", status: "Success", agent: "FlyDeal", time: "30 Jun, 09:32", mobile: "9876543210" },
  { id: "UT00343", type: "DTH Recharge", provider: "Tata Play", consumer: "DTH-7654321", amount: "₹350", charges: "₹5", total: "₹355", status: "Success", agent: "StarTravel", time: "30 Jun, 10:05", mobile: "9123456789" },
  { id: "UT00344", type: "Gas", provider: "Indane LPG", consumer: "HP-234567", amount: "₹903", charges: "₹10", total: "₹913", status: "Pending", agent: "TravelBox", time: "30 Jun, 10:18", mobile: "9456789012" },
  { id: "UT00345", type: "Water", provider: "Delhi Jal Board", consumer: "WB-890123", amount: "₹1,240", charges: "₹15", total: "₹1,255", status: "Success", agent: "QuickBook", time: "30 Jun, 11:00", mobile: "9345678901" },
  { id: "UT00346", type: "Broadband", provider: "ACT Fibernet", consumer: "ACT-456789", amount: "₹1,499", charges: "₹0", total: "₹1,499", status: "Failed", agent: "FlyDeal", time: "30 Jun, 11:22", mobile: "9234567890" },
  { id: "UT00347", type: "Insurance", provider: "LIC Premium", consumer: "LIC-987654321", amount: "₹8,500", charges: "₹50", total: "₹8,550", status: "Success", agent: "StarTravel", time: "30 Jun, 12:05", mobile: "9567890123" },
  { id: "UT00348", type: "Mobile Recharge", provider: "Airtel", consumer: "8765432109", amount: "₹399", charges: "₹0", total: "₹399", status: "Success", agent: "TravelBox", time: "30 Jun, 12:40", mobile: "8765432109" },
  { id: "UT00349", type: "Electricity", provider: "MSEB", consumer: "MSE-123456", amount: "₹4,120", charges: "₹20", total: "₹4,140", status: "Success", agent: "QuickBook", time: "30 Jun, 13:15", mobile: "9012345678" },
  { id: "UT00350", type: "Credit Card", provider: "HDFC Bank", consumer: "XXXX XXXX 4521", amount: "₹24,500", charges: "₹100", total: "₹24,600", status: "Pending", agent: "FlyDeal", time: "30 Jun, 14:00", mobile: "9901234567" },
]

const statusColors: Record<string, string> = { Success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", Failed: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400" }
const typeColors: Record<string, string> = {
  Electricity: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  "Mobile Recharge": "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  "DTH Recharge": "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  Gas: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  Water: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",
  Broadband: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  Insurance: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  "Credit Card": "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400",
}

export default function UtilityPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [page, setPage] = useState(1)

  const types = ["All", "Electricity", "Mobile Recharge", "Gas", "DTH Recharge", "Water", "Broadband", "Insurance", "Credit Card"]

  const filtered = transactions.filter((t) => {
    const matchSearch = search === "" || t.consumer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.provider.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === "All" || t.type === typeFilter
    const matchStatus = statusFilter === "All" || t.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  useEffect(() => setPage(1), [search, typeFilter, statusFilter])
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Transactions", value: "228", sub: "today", color: "text-teal-600 bg-teal-50 border-teal-100" },
          { label: "Revenue (Commission)", value: "₹3,840", sub: "today", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Total Volume", value: "₹63,100", sub: "processed today", color: "text-blue-600 bg-blue-50 border-blue-100" },
          { label: "Failed Txns", value: "3", sub: "today", color: "text-red-600 bg-red-50 border-red-100" },
        ].map((c) => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
            <p className="text-xs font-medium opacity-70">{c.label}</p>
            <p className="mt-1 text-2xl font-bold">{c.value}</p>
            <p className="text-xs opacity-60">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick type pills */}
      <div className="flex flex-wrap gap-2">
        {types.slice(1).map((t) => (
          <button key={t} onClick={() => setTypeFilter(typeFilter === t ? "All" : t)} className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${typeFilter === t ? "bg-teal-600 text-white border-teal-600" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:border-teal-500/40"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="flex items-center gap-2">
            {["All", "Success", "Pending", "Failed"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${statusFilter === s ? "bg-teal-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Consumer no., provider, ID..." className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-44 dark:text-slate-200" />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-xs font-medium text-white hover:bg-teal-700 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Transaction
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Txn ID</th>
                <th className="px-6 py-3 text-left font-medium">Type</th>
                <th className="px-6 py-3 text-left font-medium">Provider</th>
                <th className="px-6 py-3 text-left font-medium">Consumer No.</th>
                <th className="px-6 py-3 text-left font-medium">Mobile</th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium">Charges</th>
                <th className="px-6 py-3 text-left font-medium">Total</th>
                <th className="px-6 py-3 text-left font-medium">Time</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {paginated.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-teal-700 dark:text-teal-400">{t.id}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${typeColors[t.type] ?? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>{t.type}</span>
                  </td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{t.provider}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">{t.consumer}</td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">{t.mobile}</td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{t.amount}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{t.charges}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{t.total}</td>
                  <td className="px-6 py-3 text-xs text-slate-500 dark:text-slate-400">{t.time}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{t.agent}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[t.status]}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filtered.length} onPageChange={setPage} itemLabel="transactions" />
      </div>
    </div>
  )
}
