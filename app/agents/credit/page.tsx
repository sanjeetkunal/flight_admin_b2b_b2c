"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

type AgentCredit = {
  id: string
  name: string
  tier: string
  status: string
  currentLimit: number
  used: number
}

const initialAgents: AgentCredit[] = [
  { id: "AG001", name: "TravelBox Pvt Ltd", tier: "Gold", status: "Active", currentLimit: 500000, used: 342800 },
  { id: "AG002", name: "FlyDeal Travel Agency", tier: "Silver", status: "Active", currentLimit: 300000, used: 218500 },
  { id: "AG003", name: "StarTravel Solutions", tier: "Silver", status: "Active", currentLimit: 200000, used: 178900 },
  { id: "AG004", name: "QuickBook Tours", tier: "Bronze", status: "Active", currentLimit: 150000, used: 98400 },
  { id: "AG005", name: "Horizon Holidays", tier: "Gold", status: "Warning", currentLimit: 400000, used: 389200 },
  { id: "AG006", name: "Disha Travels", tier: "Bronze", status: "Active", currentLimit: 100000, used: 45600 },
  { id: "AG007", name: "Royal Wings Pvt Ltd", tier: "Platinum", status: "Active", currentLimit: 800000, used: 234000 },
  { id: "AG008", name: "Global Yatra Agency", tier: "Silver", status: "Suspended", currentLimit: 250000, used: 248900 },
]

const tierColors: Record<string, string> = {
  Platinum: "bg-violet-100 text-violet-700 border border-violet-200",
  Gold: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Silver: "bg-slate-100 text-slate-600 border border-slate-200",
  Bronze: "bg-orange-100 text-orange-700 border border-orange-200",
}
const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Warning: "bg-amber-100 text-amber-700",
  Suspended: "bg-red-100 text-red-700",
}

function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`
}

export default function CreditManagementPage() {
  const [agents, setAgents] = useState<AgentCredit[]>(initialAgents)
  const [search, setSearch] = useState("")
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [reasonDrafts, setReasonDrafts] = useState<Record<string, string>>({})

  const [dialog, setDialog] = useState<DialogState>(null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)

  const closeDialog = () => { setDialog(null); setConfirmAction(null) }
  const runConfirm = () => { confirmAction?.(); closeDialog() }

  const filtered = agents.filter((a) =>
    search === "" || a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())
  )

  const totalIssued = agents.reduce((sum, a) => sum + a.currentLimit, 0)
  const nearLimit = agents.filter((a) => a.currentLimit - a.used < a.currentLimit * 0.1).length

  const handleSetLimit = (a: AgentCredit) => {
    const raw = (drafts[a.id] || "").replace(/[^0-9]/g, "")
    if (!raw || Number(raw) <= 0) {
      setErrors((prev) => ({ ...prev, [a.id]: "Enter a valid credit limit" }))
      return
    }
    if (!reasonDrafts[a.id]?.trim()) {
      setErrors((prev) => ({ ...prev, [a.id]: "Reason is required to change credit limit" }))
      return
    }
    const newLimit = Number(raw)
    setDialog({
      mode: "confirm",
      title: `Set Credit Limit · ${a.name}`,
      summary: [
        { label: "Agent ID", value: a.id },
        { label: "Current Limit", value: formatInr(a.currentLimit) },
        { label: "New Limit", value: formatInr(newLimit) },
        { label: "Reason", value: reasonDrafts[a.id].trim() },
      ],
      details: [],
      confirmLabel: "Set Limit",
    })
    setConfirmAction(() => () => {
      setAgents((prev) => prev.map((x) => x.id === a.id ? { ...x, currentLimit: newLimit } : x))
      setDrafts((prev) => ({ ...prev, [a.id]: "" }))
      setReasonDrafts((prev) => ({ ...prev, [a.id]: "" }))
      setErrors((prev) => ({ ...prev, [a.id]: "" }))
    })
  }

  const viewAgent = (a: AgentCredit) => setDialog({
    mode: "view",
    title: `${a.id} · ${a.name}`,
    summary: [],
    details: [
      { label: "Agent ID", value: a.id },
      { label: "Agency Name", value: a.name },
      { label: "Tier", value: a.tier },
      { label: "Status", value: a.status },
      { label: "Current Credit Limit", value: formatInr(a.currentLimit) },
      { label: "Credit Used", value: formatInr(a.used) },
      { label: "Available Balance", value: formatInr(a.currentLimit - a.used) },
    ],
  })

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Credit Management</h2>
          <p className="text-xs text-slate-400">Set or update the credit limit for any B2B agent</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search agent name or ID..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">{formatInr(totalIssued)}</span>
          <span className="text-xs text-blue-600/70">Total Credit Issued</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">{agents.length}</span>
          <span className="text-xs text-violet-600/70">Agents</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600">{nearLimit}</span>
          <span className="text-xs text-red-600/70">Near Limit (&lt;10% left)</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Tier</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Current Limit</th>
                <th className="px-6 py-3 text-left font-medium">Used</th>
                <th className="px-6 py-3 text-left font-medium">Balance</th>
                <th className="px-6 py-3 text-left font-medium">New Limit</th>
                <th className="px-6 py-3 text-left font-medium">Reason</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((a) => {
                const balance = a.currentLimit - a.used
                return (
                  <tr key={a.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60 align-top">
                    <td className="px-6 py-3">
                      <p className="font-medium text-slate-800">{a.name}</p>
                      <p className="font-mono text-xs text-slate-400">{a.id}</p>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${tierColors[a.tier]}`}>{a.tier}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[a.status]}`}>{a.status}</span>
                    </td>
                    <td className="px-6 py-3 font-semibold text-slate-800">{formatInr(a.currentLimit)}</td>
                    <td className="px-6 py-3 text-slate-600">{formatInr(a.used)}</td>
                    <td className="px-6 py-3">
                      <span className={`font-semibold ${balance < a.currentLimit * 0.1 ? "text-red-600" : "text-emerald-600"}`}>{formatInr(balance)}</span>
                    </td>
                    <td className="px-6 py-3">
                      <input
                        value={drafts[a.id] || ""}
                        onChange={(e) => { setDrafts((prev) => ({ ...prev, [a.id]: e.target.value.replace(/[^0-9]/g, "") })); setErrors((prev) => ({ ...prev, [a.id]: "" })) }}
                        placeholder={String(a.currentLimit)}
                        className="w-28 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        value={reasonDrafts[a.id] || ""}
                        onChange={(e) => { setReasonDrafts((prev) => ({ ...prev, [a.id]: e.target.value })); setErrors((prev) => ({ ...prev, [a.id]: "" })) }}
                        placeholder="Reason for change"
                        className="w-40 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300"
                      />
                      {errors[a.id] && <p className="mt-1 text-[11px] text-red-500">{errors[a.id]}</p>}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleSetLimit(a)} className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 transition-colors">Set Limit</button>
                        <button onClick={() => viewAgent(a)} className="text-xs text-slate-400 hover:text-slate-600">View</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-sm text-slate-400">No agents match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {agents.length} agents</p>
        </div>
      </div>

      <RecordDialog state={dialog} onClose={closeDialog} onConfirm={runConfirm} />
    </div>
  )
}
