"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

type AgentLookup = {
  id: string
  name: string
  contact: string
  email: string
  tier: string
  status: string
  balance: string
}

const agentDirectory: Record<string, AgentLookup> = {
  AG001: { id: "AG001", name: "TravelBox Pvt Ltd", contact: "Rahul Mehta", email: "info@travelbox.in", tier: "Gold", status: "Active", balance: "₹1,57,200" },
  AG002: { id: "AG002", name: "FlyDeal Travel Agency", contact: "Priya Kapoor", email: "admin@flydeal.com", tier: "Silver", status: "Active", balance: "₹81,500" },
  AG003: { id: "AG003", name: "StarTravel Solutions", contact: "Amit Joshi", email: "contact@startrav.in", tier: "Silver", status: "Active", balance: "₹21,100" },
  AG004: { id: "AG004", name: "QuickBook Tours", contact: "Deepa Singh", email: "sales@quickbook.in", tier: "Bronze", status: "Active", balance: "₹51,600" },
  AG005: { id: "AG005", name: "Horizon Holidays", contact: "Suresh Nair", email: "ops@horizonhols.com", tier: "Gold", status: "Warning", balance: "₹10,800" },
  AG007: { id: "AG007", name: "Royal Wings Pvt Ltd", contact: "Vikram Verma", email: "director@royalwings.in", tier: "Platinum", status: "Active", balance: "₹5,66,000" },
  AG008: { id: "AG008", name: "Global Yatra Agency", contact: "Anita Roy", email: "gya@globalyatra.com", tier: "Silver", status: "Suspended", balance: "₹1,100" },
}

type HistoryEntry = {
  id: number
  agentId: string
  agentName: string
  emulatedBy: string
  remarks: string
  startedAt: string
  endedAt: string
  status: "Active" | "Ended"
}

const initialHistory: HistoryEntry[] = [
  { id: 1, agentId: "AG002", agentName: "FlyDeal Travel Agency", emulatedBy: "Admin User", remarks: "Agent reported checkout error, verifying booking flow", startedAt: "09 Jul, 11:20", endedAt: "09 Jul, 11:34", status: "Ended" },
  { id: 2, agentId: "AG005", agentName: "Horizon Holidays", emulatedBy: "Admin User", remarks: "Investigating low credit balance warning", startedAt: "08 Jul, 16:05", endedAt: "08 Jul, 16:22", status: "Ended" },
  { id: 3, agentId: "AG001", agentName: "TravelBox Pvt Ltd", emulatedBy: "Admin User", remarks: "Support ticket #4521 — fare not loading for agent", startedAt: "07 Jul, 09:48", endedAt: "07 Jul, 10:01", status: "Ended" },
]

export default function EmulateAgentPage() {
  const [agentIdInput, setAgentIdInput] = useState("")
  const [fetchedAgent, setFetchedAgent] = useState<AgentLookup | null>(null)
  const [fetchError, setFetchError] = useState("")
  const [remarks, setRemarks] = useState("")
  const [remarksError, setRemarksError] = useState("")

  const [activeEmulation, setActiveEmulation] = useState<HistoryEntry | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory)

  const [dialog, setDialog] = useState<DialogState>(null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)

  const closeDialog = () => { setDialog(null); setConfirmAction(null) }
  const runConfirm = () => { confirmAction?.(); closeDialog() }

  const handleFetch = () => {
    const key = agentIdInput.trim().toUpperCase()
    const found = agentDirectory[key]
    if (!found) {
      setFetchedAgent(null)
      setFetchError("No agent found with this ID")
      return
    }
    setFetchedAgent(found)
    setFetchError("")
  }

  const handleStartEmulation = () => {
    if (!fetchedAgent) return
    if (!remarks.trim()) { setRemarksError("Remarks are required to start emulation"); return }
    setDialog({
      mode: "confirm",
      title: "Start Agent Emulation",
      summary: [
        { label: "Agent ID", value: fetchedAgent.id },
        { label: "Agency Name", value: fetchedAgent.name },
        { label: "Remarks", value: remarks.trim() },
      ],
      details: [],
      confirmLabel: "Start Emulation",
    })
    setConfirmAction(() => () => {
      const entry: HistoryEntry = {
        id: Date.now(),
        agentId: fetchedAgent.id,
        agentName: fetchedAgent.name,
        emulatedBy: "Admin User",
        remarks: remarks.trim(),
        startedAt: "Just now",
        endedAt: "-",
        status: "Active",
      }
      setHistory((prev) => [entry, ...prev])
      setActiveEmulation(entry)
      setRemarks("")
      setFetchedAgent(null)
      setAgentIdInput("")
    })
  }

  const handleEndEmulation = () => {
    if (!activeEmulation) return
    setDialog({
      mode: "confirm",
      title: "End Agent Emulation",
      summary: [
        { label: "Agent ID", value: activeEmulation.agentId },
        { label: "Agency Name", value: activeEmulation.agentName },
        { label: "Started At", value: activeEmulation.startedAt },
      ],
      details: [],
      confirmLabel: "End Emulation",
    })
    setConfirmAction(() => () => {
      setHistory((prev) => prev.map((h) => h.id === activeEmulation.id ? { ...h, endedAt: "Just now", status: "Ended" } : h))
      setActiveEmulation(null)
    })
  }

  const viewHistoryEntry = (h: HistoryEntry) => setDialog({
    mode: "view",
    title: `${h.agentId} · ${h.agentName}`,
    summary: [],
    details: [
      { label: "Agent ID", value: h.agentId },
      { label: "Agency Name", value: h.agentName },
      { label: "Emulated By", value: h.emulatedBy },
      { label: "Remarks", value: h.remarks },
      { label: "Started At", value: h.startedAt },
      { label: "Ended At", value: h.endedAt },
      { label: "Status", value: h.status },
    ],
  })

  return (
    <div className="space-y-4">
      {/* Active emulation banner */}
      {activeEmulation && (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-amber-800">Currently emulating {activeEmulation.agentName} ({activeEmulation.agentId})</p>
              <p className="text-xs text-amber-700/70">Started {activeEmulation.startedAt} · Remarks: {activeEmulation.remarks}</p>
            </div>
          </div>
          <button onClick={handleEndEmulation} className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-medium text-white hover:bg-amber-700 transition-colors">
            End Emulation
          </button>
        </div>
      )}

      {/* Fetch agent card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Emulate Agent</h2>
          <p className="text-xs text-slate-400">Enter an agent ID to fetch their account and log in as them for support / troubleshooting</p>
        </div>

        <div className="px-6 py-5">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Agent ID</label>
              <input
                value={agentIdInput}
                onChange={(e) => { setAgentIdInput(e.target.value.toUpperCase()); setFetchError("") }}
                placeholder="e.g. AG001"
                className="w-48 rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono uppercase text-slate-700 outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
            </div>
            <button onClick={handleFetch} className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white hover:bg-violet-700 transition-colors">
              Fetch Agent
            </button>
          </div>
          {fetchError && <p className="mt-2 text-xs text-red-500">{fetchError}</p>}

          {fetchedAgent && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-4 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-800">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Agency Name</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{fetchedAgent.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Contact Person</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{fetchedAgent.contact}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Email</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{fetchedAgent.email}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Tier</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{fetchedAgent.tier}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Status</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{fetchedAgent.status}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Balance</p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{fetchedAgent.balance}</p>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Remarks <span className="text-red-500">*</span></label>
                <textarea
                  value={remarks}
                  onChange={(e) => { setRemarks(e.target.value); setRemarksError("") }}
                  placeholder="Reason for emulating this agent..."
                  rows={3}
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 dark:text-slate-200 ${remarksError ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:ring-violet-100 focus:border-violet-300 dark:border-slate-700 dark:bg-slate-800"}`}
                />
                {remarksError && <p className="mt-1 text-xs text-red-500">{remarksError}</p>}
              </div>

              <button
                onClick={handleStartEmulation}
                disabled={!!activeEmulation}
                className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white hover:bg-violet-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {activeEmulation ? "End current emulation first" : "Start Emulation"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">{history.length}</span>
          <span className="text-xs text-violet-600/70">Total Emulations</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm font-bold text-amber-600">{history.filter((h) => h.status === "Active").length}</span>
          <span className="text-xs text-amber-600/70">Active Now</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{new Set(history.map((h) => h.agentId)).size}</span>
          <span className="text-xs text-emerald-600/70">Unique Agents</span>
        </div>
      </div>

      {/* Emulate history */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Emulate History</h2>
            <p className="text-xs text-slate-400">Audit trail of all agent emulation sessions with remarks</p>
          </div>
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">{history.length} sessions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Agent ID</th>
                <th className="px-6 py-3 text-left font-medium">Agency Name</th>
                <th className="px-6 py-3 text-left font-medium">Emulated By</th>
                <th className="px-6 py-3 text-left font-medium">Remarks</th>
                <th className="px-6 py-3 text-left font-medium">Started At</th>
                <th className="px-6 py-3 text-left font-medium">Ended At</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-violet-700 dark:text-violet-400">{h.agentId}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{h.agentName}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{h.emulatedBy}</td>
                  <td className="px-6 py-3 max-w-xs truncate text-xs text-slate-600 dark:text-slate-300">{h.remarks}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{h.startedAt}</td>
                  <td className="px-6 py-3 text-xs text-slate-400">{h.endedAt}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${h.status === "Active" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{h.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <button onClick={() => viewHistoryEntry(h)} className="text-xs text-slate-400 hover:text-slate-600">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RecordDialog state={dialog} onClose={closeDialog} onConfirm={runConfirm} />
    </div>
  )
}
