"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"
import FormDialog from "../../components/FormDialog"

type CommissionRow = {
  id: number
  groupType: string
  category: string
  tripType: string
  packageType: string
  commBasic: string
  commTax: string
  commBasicTax: string
  plbBasic: string
  plbBasicTax: string
  cashback: string
  bookingFrom: string
  bookingTo: string
  travelFrom: string
  travelTo: string
  restriction: string
  operator: string
}

const initialRows: CommissionRow[] = [
  { id: 1, groupType: "testgroup", category: "ALL", tripType: "International", packageType: "ALL", commBasic: "12.00", commTax: "0.00", commBasicTax: "0.00", plbBasic: "0.00", plbBasicTax: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", travelFrom: "-", travelTo: "-", restriction: "BOTH", operator: "-" },
  { id: 2, groupType: "testgroup", category: "Beach", tripType: "Domestic", packageType: "ALL", commBasic: "8.50", commTax: "0.00", commBasicTax: "0.00", plbBasic: "0.00", plbBasicTax: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", travelFrom: "-", travelTo: "-", restriction: "BOTH", operator: "-" },
  { id: 3, groupType: "testgroup", category: "Adventure", tripType: "Domestic", packageType: "ALL", commBasic: "10.00", commTax: "0.00", commBasicTax: "0.00", plbBasic: "0.00", plbBasicTax: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", travelFrom: "-", travelTo: "-", restriction: "BOTH", operator: "-" },
  { id: 4, groupType: "testgroup", category: "Heritage", tripType: "Domestic", packageType: "ALL", commBasic: "7.00", commTax: "0.00", commBasicTax: "0.00", plbBasic: "0.00", plbBasicTax: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", travelFrom: "-", travelTo: "-", restriction: "BOTH", operator: "-" },
  { id: 5, groupType: "testgroup", category: "Hill Station", tripType: "Domestic", packageType: "ALL", commBasic: "9.50", commTax: "0.00", commBasicTax: "0.00", plbBasic: "0.00", plbBasicTax: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", travelFrom: "-", travelTo: "-", restriction: "BOTH", operator: "-" },
  { id: 6, groupType: "testgroup", category: "Nature", tripType: "Domestic", packageType: "ALL", commBasic: "8.00", commTax: "0.00", commBasicTax: "0.00", plbBasic: "0.00", plbBasicTax: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", travelFrom: "-", travelTo: "-", restriction: "BOTH", operator: "-" },
  { id: 7, groupType: "testgroup", category: "International", tripType: "International", packageType: "ALL", commBasic: "14.00", commTax: "0.00", commBasicTax: "0.00", plbBasic: "0.00", plbBasicTax: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", travelFrom: "-", travelTo: "-", restriction: "BOTH", operator: "-" },
]

const emptyForm = {
  groupType: "",
  category: "",
  packageType: "ALL",
  bookingChannel: "ALL",
  tripType: "Domestic",
  commBasic: "0",
  commTax: "0",
  commBasicTax: "0",
  plbBasic: "0",
  plbBasicTax: "0",
  bookingFrom: "",
  bookingTo: "",
  travelFrom: "",
  travelTo: "",
  cashback: "0",
  restriction: "BOTH",
  operator: "",
}

export default function HolidaysCommissionMasterPage() {
  const [rows, setRows] = useState<CommissionRow[]>(initialRows)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [dialog, setDialog] = useState<DialogState>(null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const [form, setForm] = useState(emptyForm)

  const closeDialog = () => { setDialog(null); setConfirmAction(null) }
  const runConfirm = () => { confirmAction?.(); closeDialog() }

  const update = (key: keyof typeof emptyForm, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = () => {
    if (!form.groupType || !form.category) return
    setFormOpen(false)
    setDialog({
      mode: "confirm",
      title: "Add Commission Rule",
      summary: [
        { label: "Group Type", value: form.groupType },
        { label: "Category", value: form.category },
        { label: "Trip Type", value: form.tripType },
        { label: "Commission Basic", value: `${form.commBasic}%` },
      ],
      details: [],
      confirmLabel: "Submit",
    })
    setConfirmAction(() => () => {
      setRows((prev) => [
        {
          id: Date.now(),
          groupType: form.groupType,
          category: form.category,
          tripType: form.tripType,
          packageType: form.packageType,
          commBasic: Number(form.commBasic || 0).toFixed(2),
          commTax: Number(form.commTax || 0).toFixed(2),
          commBasicTax: Number(form.commBasicTax || 0).toFixed(2),
          plbBasic: Number(form.plbBasic || 0).toFixed(2),
          plbBasicTax: Number(form.plbBasicTax || 0).toFixed(2),
          cashback: Number(form.cashback || 0).toFixed(2),
          bookingFrom: form.bookingFrom || "-",
          bookingTo: form.bookingTo || "-",
          travelFrom: form.travelFrom || "-",
          travelTo: form.travelTo || "-",
          restriction: form.restriction,
          operator: form.operator || "-",
        },
        ...prev,
      ])
      setForm(emptyForm)
    })
  }

  const viewRow = (r: CommissionRow) => setDialog({
    mode: "view",
    title: `${r.groupType} · ${r.category}`,
    summary: [],
    details: [
      { label: "Group Type", value: r.groupType },
      { label: "Category", value: r.category },
      { label: "Trip Type", value: r.tripType },
      { label: "Package Type", value: r.packageType },
      { label: "Commission Basic", value: `${r.commBasic}%` },
      { label: "Commission Tax", value: `${r.commTax}%` },
      { label: "Commission (Basic+Tax)", value: `${r.commBasicTax}%` },
      { label: "PLB Basic", value: r.plbBasic },
      { label: "PLB (Basic+Tax)", value: r.plbBasicTax },
      { label: "Cashback Amount", value: r.cashback },
      { label: "Booking From", value: r.bookingFrom },
      { label: "Booking To", value: r.bookingTo },
      { label: "Travel From", value: r.travelFrom },
      { label: "Travel To", value: r.travelTo },
      { label: "Restriction On", value: r.restriction },
      { label: "Operator", value: r.operator },
    ],
  })

  const removeRow = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id))

  const labelCls = "mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"
  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
  const selectCls = inputCls + " bg-white"

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Commission Master</h2>
          <p className="text-xs text-slate-400">Set commission for all holiday packages, or override it for a specific destination category</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Export</button>
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Search</button>
          <button onClick={() => setFormOpen(true)} className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600 transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add New
          </button>
        </div>
      </div>

      <FormDialog
        open={formOpen}
        title="Add Commission Rule"
        subtitle="Set commission for all holiday packages, or override it for a specific destination category"
        onClose={() => setFormOpen(false)}
        footer={
          <>
            <button onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
            <button onClick={handleSubmit} className="rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600 transition-colors">Submit</button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={labelCls}>Group Type</label>
            <select value={form.groupType} onChange={(e) => update("groupType", e.target.value)} className={selectCls}>
              <option value="">-- Select Type --</option>
              <option value="All Agents">All Agents</option>
              <option value="testgroup">testgroup</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Destination Category</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className={selectCls}>
              <option value="">-- Select Category --</option>
              <option value="ALL">ALL</option>
              <option value="Beach">Beach</option>
              <option value="Nature">Nature</option>
              <option value="Adventure">Adventure</option>
              <option value="Heritage">Heritage</option>
              <option value="Hill Station">Hill Station</option>
              <option value="International">International</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Package Type</label>
            <select value={form.packageType} onChange={(e) => update("packageType", e.target.value)} className={selectCls}>
              <option>ALL</option>
              <option>Fixed Departure</option>
              <option>Customized</option>
              <option>Group Tour</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Booking Channel</label>
            <select value={form.bookingChannel} onChange={(e) => update("bookingChannel", e.target.value)} className={selectCls}>
              <option>ALL</option>
              <option>Web</option>
              <option>Mobile App</option>
              <option>B2B Portal</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Trip Type</label>
            <select value={form.tripType} onChange={(e) => update("tripType", e.target.value)} className={selectCls}>
              <option>Domestic</option>
              <option>International</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Commission Basic</label>
            <input value={form.commBasic} onChange={(e) => update("commBasic", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Commission Tax</label>
            <input value={form.commTax} onChange={(e) => update("commTax", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Commission (Basic+Tax)</label>
            <input value={form.commBasicTax} onChange={(e) => update("commBasicTax", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>

          {showMoreFilters && (
            <>
              <div>
                <label className={labelCls}>PLB Basic</label>
                <input value={form.plbBasic} onChange={(e) => update("plbBasic", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>PLB (Basic+Tax)</label>
                <input value={form.plbBasicTax} onChange={(e) => update("plbBasicTax", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Booking From Date</label>
                <input type="date" value={form.bookingFrom} onChange={(e) => update("bookingFrom", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Booking To Date</label>
                <input type="date" value={form.bookingTo} onChange={(e) => update("bookingTo", e.target.value)} className={inputCls} />
              </div>

              <div>
                <label className={labelCls}>Travel From Date</label>
                <input type="date" value={form.travelFrom} onChange={(e) => update("travelFrom", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Travel To Date</label>
                <input type="date" value={form.travelTo} onChange={(e) => update("travelTo", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Cashback Amount</label>
                <input value={form.cashback} onChange={(e) => update("cashback", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Restriction ON</label>
                <select value={form.restriction} onChange={(e) => update("restriction", e.target.value)} className={selectCls}>
                  <option>BOTH</option>
                  <option>Booking Date</option>
                  <option>Travel Date</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Operator</label>
                <select value={form.operator} onChange={(e) => update("operator", e.target.value)} className={selectCls}>
                  <option value="">Select Operator</option>
                  <option>Thomas Cook</option>
                  <option>SOTC</option>
                  <option>Cox &amp; Kings</option>
                  <option>Direct</option>
                </select>
              </div>
            </>
          )}
        </div>

        <button onClick={() => setShowMoreFilters((v) => !v)} className="mt-4 text-xs font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2">
          {showMoreFilters ? "Hide extra filters" : "Click here for more filter show/hide"}
        </button>
      </FormDialog>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">{rows.length}</span>
          <span className="text-xs text-blue-600/70">Commission Rules</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{rows.filter((r) => r.category === "ALL").length}</span>
          <span className="text-xs text-emerald-600/70">Global Rules</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">{rows.filter((r) => r.category !== "ALL").length}</span>
          <span className="text-xs text-violet-600/70">Category Overrides</span>
        </div>
      </div>

      {/* Results table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Commission Rules</h2>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">{rows.length} rules</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Type</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Category</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Trip Type</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Package Type</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Comm Basic</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Comm Tax</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Comm (Basic+Tax)</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">PLB Basic</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">PLB (Basic+Tax)</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Cashback Amt</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Booking From</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Booking To</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Travel From</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Travel To</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => viewRow(r)} className="font-medium text-blue-700 hover:text-blue-900 hover:underline dark:text-blue-400">{r.groupType}</button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700 dark:text-slate-200">{r.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.tripType}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.packageType}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold text-slate-800 dark:text-slate-100">{r.commBasic}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.commTax}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.commBasicTax}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.plbBasic}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.plbBasicTax}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-slate-300">{r.cashback}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{r.bookingFrom}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{r.bookingTo}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{r.travelFrom}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{r.travelTo}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => viewRow(r)} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">View</button>
                      <button onClick={() => removeRow(r.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                    </div>
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
