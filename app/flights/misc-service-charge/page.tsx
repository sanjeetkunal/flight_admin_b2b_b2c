"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

type ChargeRow = {
  id: number
  trip: string
  airline: string
  fareType: string
  groupType: string
  agentId: string
  origin: string
  destination: string
  markupType: string
  amount: string
  markupBasic: string
  markupYQ: string
  markupBasicYQ: string
  createdDate: string
  updatedDate: string
}

const initialRows: ChargeRow[] = [
  { id: 1, trip: "D", airline: "ALL", fareType: "ALL", groupType: "ALL", agentId: "ALL", origin: "ALL", destination: "ALL", markupType: "F", amount: "725.0000", markupBasic: "0.00", markupYQ: "0.00", markupBasicYQ: "0.00", createdDate: "2/11/2026 10:45:37 AM", updatedDate: "-" },
  { id: 2, trip: "I", airline: "ALL", fareType: "FDD", groupType: "ALL", agentId: "ALL", origin: "ALL", destination: "ALL", markupType: "F", amount: "1000.0000", markupBasic: "0.00", markupYQ: "0.00", markupBasicYQ: "0.00", createdDate: "8/6/2024 8:49:30 PM", updatedDate: "-" },
  { id: 3, trip: "D", airline: "ALL", fareType: "FDD", groupType: "ALL", agentId: "ALL", origin: "ALL", destination: "ALL", markupType: "F", amount: "200.0000", markupBasic: "0.00", markupYQ: "0.00", markupBasicYQ: "0.00", createdDate: "4/16/2023 1:06:23 PM", updatedDate: "-" },
]

const emptyForm = {
  tripType: "Domestic",
  airline: "",
  fareType: "ALL",
  groupType: "",
  agentId: "ALL",
  markupType: "",
  origin: "ALL",
  destination: "ALL",
  markupBasic: "0",
  markupYQ: "0",
  markupBasicYQ: "0",
  amount: "0",
}

export default function MiscServiceChargePage() {
  const [rows, setRows] = useState<ChargeRow[]>(initialRows)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [dialog, setDialog] = useState<DialogState>(null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)

  const closeDialog = () => { setDialog(null); setConfirmAction(null) }
  const runConfirm = () => { confirmAction?.(); closeDialog() }

  const update = (key: keyof typeof emptyForm, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const resetForm = () => { setForm(emptyForm); setEditingId(null) }

  const handleSave = () => {
    if (!form.airline || !form.groupType || !form.markupType) return
    const isEdit = editingId !== null
    setDialog({
      mode: "confirm",
      title: isEdit ? "Update Misc Service Charge" : "Add Misc Service Charge",
      summary: [
        { label: "Trip", value: form.tripType },
        { label: "Airline", value: form.airline },
        { label: "Group Type", value: form.groupType },
        { label: "Markup Type", value: form.markupType },
        { label: "Amount", value: form.amount },
      ],
      details: [],
      confirmLabel: isEdit ? "Update" : "Save",
    })
    setConfirmAction(() => () => {
      const now = "Just now"
      if (isEdit) {
        setRows((prev) => prev.map((r) => r.id === editingId ? {
          ...r,
          trip: form.tripType === "Domestic" ? "D" : "I",
          airline: form.airline,
          fareType: form.fareType,
          groupType: form.groupType,
          agentId: form.agentId || "ALL",
          origin: form.origin || "ALL",
          destination: form.destination || "ALL",
          markupType: form.markupType,
          amount: Number(form.amount || 0).toFixed(4),
          markupBasic: Number(form.markupBasic || 0).toFixed(2),
          markupYQ: Number(form.markupYQ || 0).toFixed(2),
          markupBasicYQ: Number(form.markupBasicYQ || 0).toFixed(2),
          updatedDate: now,
        } : r))
      } else {
        setRows((prev) => [
          {
            id: Date.now(),
            trip: form.tripType === "Domestic" ? "D" : "I",
            airline: form.airline,
            fareType: form.fareType,
            groupType: form.groupType,
            agentId: form.agentId || "ALL",
            origin: form.origin || "ALL",
            destination: form.destination || "ALL",
            markupType: form.markupType,
            amount: Number(form.amount || 0).toFixed(4),
            markupBasic: Number(form.markupBasic || 0).toFixed(2),
            markupYQ: Number(form.markupYQ || 0).toFixed(2),
            markupBasicYQ: Number(form.markupBasicYQ || 0).toFixed(2),
            createdDate: now,
            updatedDate: "-",
          },
          ...prev,
        ])
      }
      resetForm()
    })
  }

  const editRow = (r: ChargeRow) => {
    setEditingId(r.id)
    setForm({
      tripType: r.trip === "D" ? "Domestic" : "International",
      airline: r.airline,
      fareType: r.fareType,
      groupType: r.groupType,
      agentId: r.agentId,
      markupType: r.markupType,
      origin: r.origin,
      destination: r.destination,
      markupBasic: r.markupBasic,
      markupYQ: r.markupYQ,
      markupBasicYQ: r.markupBasicYQ,
      amount: r.amount,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const removeRow = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id))

  const labelCls = "mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"
  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
  const selectCls = inputCls + " bg-white"

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="rounded-xl bg-blue-600 px-6 py-3 shadow-sm">
        <p className="text-sm font-medium text-white">Flight Setting <span className="opacity-70">&gt;</span> MISC SERVICE CHARGE</p>
      </div>

      {/* Form card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={labelCls}>Trip</label>
            <select value={form.tripType} onChange={(e) => update("tripType", e.target.value)} className={selectCls}>
              <option>Domestic</option>
              <option>International</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Airline</label>
            <select value={form.airline} onChange={(e) => update("airline", e.target.value)} className={selectCls}>
              <option value="">-- ALL Airline --</option>
              <option value="ALL">ALL</option>
              <option value="IndiGo">IndiGo</option>
              <option value="Air India">Air India</option>
              <option value="Air Asia">Air Asia</option>
              <option value="Spicejet">Spicejet</option>
              <option value="Vistara">Vistara</option>
              <option value="Akasa Air">Akasa Air</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Fare Type</label>
            <select value={form.fareType} onChange={(e) => update("fareType", e.target.value)} className={selectCls}>
              <option>ALL</option>
              <option>FDD</option>
              <option>Published</option>
              <option>Net</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>GroupType</label>
            <select value={form.groupType} onChange={(e) => update("groupType", e.target.value)} className={selectCls}>
              <option value="">--ALL--</option>
              <option value="ALL">ALL</option>
              <option value="testgroup">testgroup</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Agent Id</label>
            <input value={form.agentId} onChange={(e) => update("agentId", e.target.value)} placeholder="ALL" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Markup Type</label>
            <select value={form.markupType} onChange={(e) => update("markupType", e.target.value)} className={selectCls}>
              <option value="">--Select Markup Type--</option>
              <option value="F">Fixed</option>
              <option value="P">Percentage</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Origin</label>
            <input value={form.origin} onChange={(e) => update("origin", e.target.value)} placeholder="ALL" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Destination</label>
            <input value={form.destination} onChange={(e) => update("destination", e.target.value)} placeholder="ALL" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Markup Basic</label>
            <input value={form.markupBasic} onChange={(e) => update("markupBasic", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Markup YQ</label>
            <input value={form.markupYQ} onChange={(e) => update("markupYQ", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Markup (Basic+YQ)</label>
            <input value={form.markupBasicYQ} onChange={(e) => update("markupBasicYQ", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Amount</label>
            <input value={form.amount} onChange={(e) => update("amount", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <button onClick={handleSave} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
            {editingId !== null ? "Update" : "Save"}
          </button>
          {editingId !== null && (
            <button onClick={resetForm} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">Cancel Edit</button>
          )}
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">{rows.length}</span>
          <span className="text-xs text-blue-600/70">Service Charges</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{rows.filter((r) => r.trip === "D").length}</span>
          <span className="text-xs text-emerald-600/70">Domestic</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">{rows.filter((r) => r.trip === "I").length}</span>
          <span className="text-xs text-violet-600/70">International</span>
        </div>
      </div>

      {/* Results table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 text-xs text-white">
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Trip</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Airline</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">FareType</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">GroupType</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">AgentId</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Origin</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Destination</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">MarkupType</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Amount</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">MarkupOnBasic</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">MarkupOnYq</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">MarkupOnBasicYq</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">CreatedDate</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">UpdatedDate</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Edit</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800 dark:text-slate-100">{r.trip}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700 dark:text-slate-200">{r.airline}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.fareType}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.groupType}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.agentId}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.origin}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.destination}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-blue-700 dark:text-blue-400">{r.markupType}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold text-slate-800 dark:text-slate-100">{r.amount}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.markupBasic}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.markupYQ}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.markupBasicYQ}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-400">{r.createdDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-400">{r.updatedDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => editRow(r)} className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Edit</button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => removeRow(r.id)} className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50">Delete</button>
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
