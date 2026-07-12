"use client"

import { useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"

type CommissionRow = {
  id: number
  groupType: string
  airline: string
  tripType: string
  fareType: string
  commBasic: string
  commYQ: string
  commBasicYQ: string
  plbBasic: string
  plbBasicYQ: string
  cashback: string
  bookingFrom: string
  bookingTo: string
  onwardFrom: string
  onwardTo: string
  returnFrom: string
  returnTo: string
  cabinClass: string
  restriction: string
  pppSegment: string
  provider: string
  apiCommission: string
}

const initialRows: CommissionRow[] = [
  { id: 1, groupType: "testgroup", airline: "ALL", tripType: "International", fareType: "ALL", commBasic: "60.00", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
  { id: 2, groupType: "testgroup", airline: "AirIndia Express", tripType: "Domestic", fareType: "ALL", commBasic: "1.50", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
  { id: 3, groupType: "testgroup", airline: "Alliance Air", tripType: "Domestic", fareType: "ALL", commBasic: "1.00", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
  { id: 4, groupType: "testgroup", airline: "Akasa Air", tripType: "Domestic", fareType: "ALL", commBasic: "2.50", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
  { id: 5, groupType: "testgroup", airline: "Spicejet", tripType: "Domestic", fareType: "ALL", commBasic: "4.20", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
  { id: 6, groupType: "testgroup", airline: "Vistara", tripType: "Domestic", fareType: "ALL", commBasic: "6.50", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
  { id: 7, groupType: "testgroup", airline: "Air Asia", tripType: "Domestic", fareType: "ALL", commBasic: "2.50", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
  { id: 8, groupType: "testgroup", airline: "Air India", tripType: "Domestic", fareType: "ALL", commBasic: "1.10", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
  { id: 9, groupType: "testgroup", airline: "Indigo", tripType: "Domestic", fareType: "ALL", commBasic: "2.00", commYQ: "0.00", commBasicYQ: "0.00", plbBasic: "0.00", plbBasicYQ: "0.00", cashback: "0.00", bookingFrom: "-", bookingTo: "-", onwardFrom: "-", onwardTo: "-", returnFrom: "-", returnTo: "-", cabinClass: "All", restriction: "BOTH", pppSegment: "PPP Segment", provider: "-", apiCommission: "0.00" },
]

const emptyForm = {
  groupType: "",
  airline: "",
  fareType: "ALL",
  bookingChannel: "ALL",
  tripType: "Domestic",
  commBasic: "0",
  commYQ: "0",
  commBasicYQ: "0",
  plbBasic: "0",
  plbBasicYQ: "0",
  bookingFrom: "",
  bookingTo: "",
  onwardFrom: "",
  onwardTo: "",
  returnFrom: "",
  returnTo: "",
  cabinClass: "All",
  cashback: "0",
  restriction: "BOTH",
  pppSegment: "PPP Segment",
  provider: "",
  apiCommission: "0",
}

export default function CommissionMasterPage() {
  const [rows, setRows] = useState<CommissionRow[]>(initialRows)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [dialog, setDialog] = useState<DialogState>(null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)
  const [form, setForm] = useState(emptyForm)

  const closeDialog = () => { setDialog(null); setConfirmAction(null) }
  const runConfirm = () => { confirmAction?.(); closeDialog() }

  const update = (key: keyof typeof emptyForm, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = () => {
    if (!form.groupType || !form.airline) return
    setDialog({
      mode: "confirm",
      title: "Add Commission Rule",
      summary: [
        { label: "Group Type", value: form.groupType },
        { label: "Airline", value: form.airline },
        { label: "Trip Type", value: form.tripType },
        { label: "Fare Type", value: form.fareType },
        { label: "Commission Basic", value: `${form.commBasic}%` },
        { label: "Commission YQ", value: `${form.commYQ}%` },
      ],
      details: [],
      confirmLabel: "Submit",
    })
    setConfirmAction(() => () => {
      setRows((prev) => [
        {
          id: Date.now(),
          groupType: form.groupType,
          airline: form.airline,
          tripType: form.tripType,
          fareType: form.fareType,
          commBasic: Number(form.commBasic || 0).toFixed(2),
          commYQ: Number(form.commYQ || 0).toFixed(2),
          commBasicYQ: Number(form.commBasicYQ || 0).toFixed(2),
          plbBasic: Number(form.plbBasic || 0).toFixed(2),
          plbBasicYQ: Number(form.plbBasicYQ || 0).toFixed(2),
          cashback: Number(form.cashback || 0).toFixed(2),
          bookingFrom: form.bookingFrom || "-",
          bookingTo: form.bookingTo || "-",
          onwardFrom: form.onwardFrom || "-",
          onwardTo: form.onwardTo || "-",
          returnFrom: form.returnFrom || "-",
          returnTo: form.returnTo || "-",
          cabinClass: form.cabinClass,
          restriction: form.restriction,
          pppSegment: form.pppSegment,
          provider: form.provider || "-",
          apiCommission: Number(form.apiCommission || 0).toFixed(2),
        },
        ...prev,
      ])
      setForm(emptyForm)
    })
  }

  const viewRow = (r: CommissionRow) => setDialog({
    mode: "view",
    title: `${r.groupType} · ${r.airline}`,
    summary: [],
    details: [
      { label: "Group Type", value: r.groupType },
      { label: "Airline", value: r.airline },
      { label: "Trip Type", value: r.tripType },
      { label: "Fare Type", value: r.fareType },
      { label: "Commission Basic", value: `${r.commBasic}%` },
      { label: "Commission YQ", value: `${r.commYQ}%` },
      { label: "Commission (Basic+YQ)", value: `${r.commBasicYQ}%` },
      { label: "PLB Basic", value: r.plbBasic },
      { label: "PLB (Basic+YQ)", value: r.plbBasicYQ },
      { label: "Cashback Amount", value: r.cashback },
      { label: "Booking From", value: r.bookingFrom },
      { label: "Booking To", value: r.bookingTo },
      { label: "Onward Travel From", value: r.onwardFrom },
      { label: "Onward Travel To", value: r.onwardTo },
      { label: "Return Travel From", value: r.returnFrom },
      { label: "Return Travel To", value: r.returnTo },
      { label: "Cabin Class", value: r.cabinClass },
      { label: "Restriction On", value: r.restriction },
      { label: "PPP Segment / Sector", value: r.pppSegment },
      { label: "Provider", value: r.provider },
      { label: "On API Commission %", value: `${r.apiCommission}%` },
    ],
  })

  const removeRow = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id))

  const labelCls = "mb-1.5 block text-xs font-medium text-slate-500"
  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
  const selectCls = inputCls + " bg-white"

  return (
    <div className="space-y-4">
      {/* Filter / Add form */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Commission Master</h2>
          <p className="text-xs text-slate-400">Set commission for all flights, or override it for a specific airline / fare type</p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-4">
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
            <label className={labelCls}>Airline</label>
            <select value={form.airline} onChange={(e) => update("airline", e.target.value)} className={selectCls}>
              <option value="">-- Select Airline --</option>
              <option value="ALL">ALL</option>
              <option value="IndiGo">IndiGo</option>
              <option value="Air India">Air India</option>
              <option value="Air Asia">Air Asia</option>
              <option value="Spicejet">Spicejet</option>
              <option value="Vistara">Vistara</option>
              <option value="Akasa Air">Akasa Air</option>
              <option value="Alliance Air">Alliance Air</option>
              <option value="AirIndia Express">AirIndia Express</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Fare Type</label>
            <select value={form.fareType} onChange={(e) => update("fareType", e.target.value)} className={selectCls}>
              <option>ALL</option>
              <option>Published</option>
              <option>Net</option>
              <option>SME</option>
              <option>Corporate</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Booking Channel</label>
            <select value={form.bookingChannel} onChange={(e) => update("bookingChannel", e.target.value)} className={selectCls}>
              <option>ALL</option>
              <option>Web</option>
              <option>Mobile App</option>
              <option>API</option>
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
            <label className={labelCls}>Commission YQ</label>
            <input value={form.commYQ} onChange={(e) => update("commYQ", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Commission (Basic+YQ)</label>
            <input value={form.commBasicYQ} onChange={(e) => update("commBasicYQ", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
          </div>

          {showMoreFilters && (
            <>
              <div>
                <label className={labelCls}>PLB Basic</label>
                <input value={form.plbBasic} onChange={(e) => update("plbBasic", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>PLB (Basic+YQ)</label>
                <input value={form.plbBasicYQ} onChange={(e) => update("plbBasicYQ", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
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
                <label className={labelCls}>Onward Travel From Date</label>
                <input type="date" value={form.onwardFrom} onChange={(e) => update("onwardFrom", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Onward Travel To Date</label>
                <input type="date" value={form.onwardTo} onChange={(e) => update("onwardTo", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Return Travel From Date</label>
                <input type="date" value={form.returnFrom} onChange={(e) => update("returnFrom", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Return Travel To Date</label>
                <input type="date" value={form.returnTo} onChange={(e) => update("returnTo", e.target.value)} className={inputCls} />
              </div>

              <div>
                <label className={labelCls}>Cabin Class</label>
                <select multiple value={[form.cabinClass]} onChange={(e) => update("cabinClass", e.target.selectedOptions[0]?.value || "All")} className={`${selectCls} h-24`}>
                  <option>All</option>
                  <option>Business</option>
                  <option>Economy</option>
                  <option>First</option>
                  <option>Premium Economy</option>
                </select>
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
                <label className={labelCls}>PPP Segment / Sector</label>
                <select value={form.pppSegment} onChange={(e) => update("pppSegment", e.target.value)} className={selectCls}>
                  <option>PPP Segment</option>
                  <option>Sector Wise</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Provider</label>
                <select value={form.provider} onChange={(e) => update("provider", e.target.value)} className={selectCls}>
                  <option value="">Select Provider</option>
                  <option>Amadeus</option>
                  <option>Galileo</option>
                  <option>Sabre</option>
                  <option>Direct / LCC</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>On API Commission Amount %</label>
                <input value={form.apiCommission} onChange={(e) => update("apiCommission", e.target.value.replace(/[^0-9.]/g, ""))} className={inputCls} />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <button onClick={() => setShowMoreFilters((v) => !v)} className="text-xs font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2">
            {showMoreFilters ? "Hide extra filters" : "Click here for more filter show/hide"}
          </button>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">Export</button>
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">Search</button>
            <button onClick={handleSubmit} className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">Submit</button>
          </div>
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">{rows.length}</span>
          <span className="text-xs text-blue-600/70">Commission Rules</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-600">{rows.filter((r) => r.airline === "ALL").length}</span>
          <span className="text-xs text-emerald-600/70">Global Rules</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">{rows.filter((r) => r.airline !== "ALL").length}</span>
          <span className="text-xs text-violet-600/70">Airline Overrides</span>
        </div>
      </div>

      {/* Results table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Commission Rules</h2>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{rows.length} rules</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Type</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Airline</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Trip Type</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Fare Type</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Comm Basic</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Comm YQ</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Comm (Basic+YQ)</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">PLB Basic</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">PLB (Basic+YQ)</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Cashback Amt</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Booking From</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Booking To</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Onward From</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Onward To</th>
                <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => viewRow(r)} className="font-medium text-blue-700 hover:text-blue-900 hover:underline">{r.groupType}</button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700">{r.airline}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.tripType}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.fareType}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold text-slate-800">{r.commBasic}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.commYQ}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.commBasicYQ}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.plbBasic}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.plbBasicYQ}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">{r.cashback}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{r.bookingFrom}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{r.bookingTo}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{r.onwardFrom}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">{r.onwardTo}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => viewRow(r)} className="text-xs text-slate-400 hover:text-slate-600">View</button>
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
