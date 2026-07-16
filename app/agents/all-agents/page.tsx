"use client"

import { useEffect, useState } from "react"
import RecordDialog, { DialogState } from "../../components/RecordDialog"
import Pagination from "../../components/Pagination"

const PAGE_SIZE = 5

type Agent = {
  id: string
  name: string
  contact: string
  mobile: string
  email: string
  city: string
  state: string
  gst: string
  credit: string
  used: string
  balance: string
  status: string
  tier: string
  modules: string[]
  joined: string
  bookings: number
}

const initialAgents: Agent[] = [
  { id: "AG001", name: "TravelBox Pvt Ltd", contact: "Rahul Mehta", mobile: "9876543210", email: "info@travelbox.in", city: "Mumbai", state: "Maharashtra", gst: "27ABCDE1234F1Z5", credit: "₹5,00,000", used: "₹3,42,800", balance: "₹1,57,200", status: "Active", tier: "Gold", modules: ["Flight", "Hotel", "Holiday"], joined: "Jan 2024", bookings: 1247 },
  { id: "AG002", name: "FlyDeal Travel Agency", contact: "Priya Kapoor", mobile: "9234567890", email: "admin@flydeal.com", city: "Delhi", state: "Delhi", gst: "07FGHIJ5678K2L6", credit: "₹3,00,000", used: "₹2,18,500", balance: "₹81,500", status: "Active", tier: "Silver", modules: ["Flight", "Railway", "Utility"], joined: "Mar 2024", bookings: 842 },
  { id: "AG003", name: "StarTravel Solutions", contact: "Amit Joshi", mobile: "9345678901", email: "contact@startrav.in", city: "Bangalore", state: "Karnataka", gst: "29MNOPQ9012R3S7", credit: "₹2,00,000", used: "₹1,78,900", balance: "₹21,100", status: "Active", tier: "Silver", modules: ["Flight", "Bus", "Hotel", "Railway"], joined: "Feb 2024", bookings: 634 },
  { id: "AG004", name: "QuickBook Tours", contact: "Deepa Singh", mobile: "9456789012", email: "sales@quickbook.in", city: "Chennai", state: "Tamil Nadu", gst: "33RSTUV3456W4X8", credit: "₹1,50,000", used: "₹98,400", balance: "₹51,600", status: "Active", tier: "Bronze", modules: ["Bus", "Utility", "Flight"], joined: "Apr 2024", bookings: 421 },
  { id: "AG005", name: "Horizon Holidays", contact: "Suresh Nair", mobile: "9567890123", email: "ops@horizonhols.com", city: "Kochi", state: "Kerala", gst: "32WXYZ7890A5B9", credit: "₹4,00,000", used: "₹3,89,200", balance: "₹10,800", status: "Warning", tier: "Gold", modules: ["Holiday", "Hotel", "Flight"], joined: "Dec 2023", bookings: 1089 },
  { id: "AG006", name: "Disha Travels", contact: "Meena Agarwal", mobile: "9678901234", email: "info@dishatravels.net", city: "Jaipur", state: "Rajasthan", gst: "08CDEFG2345H6I0", credit: "₹1,00,000", used: "₹45,600", balance: "₹54,400", status: "Active", tier: "Bronze", modules: ["Railway", "Bus", "Utility"], joined: "May 2024", bookings: 287 },
  { id: "AG007", name: "Royal Wings Pvt Ltd", contact: "Vikram Verma", mobile: "9789012345", email: "director@royalwings.in", city: "Hyderabad", state: "Telangana", gst: "36HIJKL6789M7N1", credit: "₹8,00,000", used: "₹2,34,000", balance: "₹5,66,000", status: "Active", tier: "Platinum", modules: ["Flight", "Hotel", "Holiday", "Railway", "Bus"], joined: "Nov 2023", bookings: 2341 },
  { id: "AG008", name: "Global Yatra Agency", contact: "Anita Roy", mobile: "9890123456", email: "gya@globalyatra.com", city: "Kolkata", state: "West Bengal", gst: "19MNOPQ0123R8S2", credit: "₹2,50,000", used: "₹2,48,900", balance: "₹1,100", status: "Suspended", tier: "Silver", modules: ["Flight", "Railway"], joined: "Jun 2024", bookings: 156 },
]

const tierColors: Record<string, string> = {
  Platinum: "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  Gold: "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20",
  Silver: "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  Bronze: "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
}
const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Suspended: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}
const moduleColors: Record<string, string> = {
  Flight: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Railway: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Bus: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  Hotel: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  Holiday: "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400",
  Utility: "bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400",
}
const allModules = ["Flight", "Railway", "Bus", "Hotel", "Holiday", "Utility"]

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [tierFilter, setTierFilter] = useState("All")

  const [dialog, setDialog] = useState<DialogState>(null)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [editForm, setEditForm] = useState<Agent | null>(null)
  const [page, setPage] = useState(1)

  const filtered = agents.filter((a) => {
    const matchSearch = search === "" || a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase()) || a.contact.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || a.status === statusFilter
    const matchTier = tierFilter === "All" || a.tier === tierFilter
    return matchSearch && matchStatus && matchTier
  })

  useEffect(() => setPage(1), [search, statusFilter, tierFilter])
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const openView = (a: Agent) => setDialog({
    mode: "view",
    title: `${a.id} · ${a.name}`,
    summary: [],
    details: [
      { label: "Agency ID", value: a.id },
      { label: "Agency Name", value: a.name },
      { label: "Contact Person", value: a.contact },
      { label: "Mobile", value: a.mobile },
      { label: "Email", value: a.email },
      { label: "City", value: a.city },
      { label: "State", value: a.state },
      { label: "GSTIN", value: a.gst },
      { label: "Tier", value: a.tier },
      { label: "Status", value: a.status },
      { label: "Modules", value: a.modules.join(", ") },
      { label: "Credit Limit", value: a.credit },
      { label: "Credit Used", value: a.used },
      { label: "Balance", value: a.balance },
      { label: "Joined", value: a.joined },
      { label: "Total Bookings", value: a.bookings.toLocaleString() },
    ],
  })

  const openEdit = (a: Agent) => {
    setEditingAgent(a)
    setEditForm({ ...a, modules: [...a.modules] })
  }

  const closeEdit = () => { setEditingAgent(null); setEditForm(null) }

  const saveEdit = () => {
    if (!editForm) return
    setAgents((prev) => prev.map((a) => a.id === editForm.id ? editForm : a))
    closeEdit()
  }

  const toggleModule = (m: string) => {
    if (!editForm) return
    setEditForm({
      ...editForm,
      modules: editForm.modules.includes(m) ? editForm.modules.filter((x) => x !== m) : [...editForm.modules, m],
    })
  }

  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
  const labelCls = "mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total Agents", value: String(agents.length), sub: "registered",
            iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
            icon: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
          },
          {
            label: "Active Agents", value: String(agents.filter((a) => a.status === "Active").length), sub: "this month",
            iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
            icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
          },
          {
            label: "Total Credit Issued", value: "₹2.8 Cr", sub: "outstanding",
            iconBg: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
            icon: <path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5zM16 12h4v4h-4a2 2 0 010-4z" />,
          },
          {
            label: "Pending Approvals", value: "6", sub: "new registrations",
            iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
            icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
          },
        ].map((c) => (
          <div key={c.label} className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${c.iconBg}`}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.label}</p>
              <p className="mt-0.5 text-2xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              {["All", "Active", "Warning", "Suspended"].map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${statusFilter === s ? "bg-blue-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>{s}</button>
              ))}
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1">
              {["All", "Platinum", "Gold", "Silver", "Bronze"].map((t) => (
                <button key={t} onClick={() => setTierFilter(t)} className={`rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap transition-all ${tierFilter === t ? "bg-slate-700 text-white" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search agent, city, ID..." className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-40 dark:text-slate-200" />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add Agent
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">ID</th>
                <th className="px-6 py-3 text-left font-medium">Agency</th>
                <th className="px-6 py-3 text-left font-medium">Contact</th>
                <th className="px-6 py-3 text-left font-medium">Location</th>
                <th className="px-6 py-3 text-left font-medium">Tier</th>
                <th className="px-6 py-3 text-left font-medium">Modules</th>
                <th className="px-6 py-3 text-left font-medium">Credit Limit</th>
                <th className="px-6 py-3 text-left font-medium">Balance</th>
                <th className="px-6 py-3 text-left font-medium">Bookings</th>
                <th className="px-6 py-3 text-left font-medium">Joined</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {paginated.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{a.id}</td>
                  <td className="px-6 py-3">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{a.name}</p>
                    <p className="text-xs text-slate-400">{a.email}</p>
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-slate-700 dark:text-slate-200">{a.contact}</p>
                    <p className="font-mono text-xs text-slate-400">{a.mobile}</p>
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-slate-700 dark:text-slate-200">{a.city}</p>
                    <p className="text-xs text-slate-400">{a.state}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${tierColors[a.tier]}`}>{a.tier}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex flex-wrap gap-1">
                      {a.modules.map((m) => (
                        <span key={m} className={`rounded px-1.5 py-0.5 text-xs font-medium ${moduleColors[m]}`}>{m}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3 font-medium text-slate-700 dark:text-slate-200">{a.credit}</td>
                  <td className="px-6 py-3">
                    <p className={`font-semibold ${parseInt(a.balance.replace(/[^0-9]/g, "")) < 50000 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>{a.balance}</p>
                  </td>
                  <td className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-200">{a.bookings.toLocaleString()}</td>
                  <td className="px-6 py-3 text-xs text-slate-500 dark:text-slate-400">{a.joined}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openView(a)} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View</button>
                      <button onClick={() => openEdit(a)} className="text-xs text-slate-400 hover:text-slate-600">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filtered.length} onPageChange={setPage} itemLabel="agents" />
      </div>

      <RecordDialog state={dialog} onClose={() => setDialog(null)} onConfirm={() => setDialog(null)} />

      {/* Edit Agent modal */}
      {editingAgent && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4" onClick={closeEdit}>
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Edit Agent · {editingAgent.id}</h3>
                <p className="text-xs text-slate-400">Update agency details, tier, status and module access</p>
              </div>
              <button onClick={closeEdit} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 px-6 py-5 sm:grid-cols-2 max-h-[70vh] overflow-y-auto">
              <div>
                <label className={labelCls}>Agency Name</label>
                <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Contact Person</label>
                <input value={editForm.contact} onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Mobile</label>
                <input value={editForm.mobile} onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>City</label>
                <input value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>State</label>
                <input value={editForm.state} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>GSTIN</label>
                <input value={editForm.gst} onChange={(e) => setEditForm({ ...editForm, gst: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Credit Limit</label>
                <input value={editForm.credit} onChange={(e) => setEditForm({ ...editForm, credit: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Tier</label>
                <select value={editForm.tier} onChange={(e) => setEditForm({ ...editForm, tier: e.target.value })} className={inputCls + " bg-white"}>
                  <option>Platinum</option>
                  <option>Gold</option>
                  <option>Silver</option>
                  <option>Bronze</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className={inputCls + " bg-white"}>
                  <option>Active</option>
                  <option>Warning</option>
                  <option>Suspended</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Module Access</label>
                <div className="flex flex-wrap gap-2">
                  {allModules.map((m) => (
                    <button
                      key={m}
                      onClick={() => toggleModule(m)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${editForm.modules.includes(m) ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400" : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button onClick={closeEdit} className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
              <button onClick={saveEdit} className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
