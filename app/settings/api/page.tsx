"use client"

import { useState } from "react"

type ApiEntry = {
  id: string
  provider: string
  baseUrl: string
  apiKey: string
  apiSecret: string
  environment: "Live" | "Test"
  enabled: boolean
}

type ModuleMeta = {
  id: string
  label: string
  color: string
  bg: string
  iconBg: string
}

const MODULE_TABS: ModuleMeta[] = [
  { id: "flight", label: "Flight", color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 border-blue-100", iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" },
  { id: "railway", label: "Railway", color: "text-green-700 dark:text-green-400", bg: "bg-green-50 border-green-100", iconBg: "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400" },
  { id: "bus", label: "Bus", color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-50 border-orange-100", iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" },
  { id: "hotel", label: "Hotel", color: "text-purple-700 dark:text-purple-400", bg: "bg-purple-50 border-purple-100", iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400" },
  { id: "holiday", label: "Holiday", color: "text-pink-700 dark:text-pink-400", bg: "bg-pink-50 border-pink-100", iconBg: "bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400" },
  { id: "utility", label: "Utility", color: "text-teal-700 dark:text-teal-400", bg: "bg-teal-50 border-teal-100", iconBg: "bg-teal-100 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400" },
  { id: "other", label: "Other Integrations", color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-50 border-indigo-100", iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" },
]

const moduleIcons: Record<string, React.ReactElement> = {
  flight: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  railway: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="14" rx="2" /><path d="M4 11h16" /><path d="M9 17l-2 4" /><path d="M15 17l2 4" />
      <circle cx="8" cy="14" r="1" fill="currentColor" /><circle cx="16" cy="14" r="1" fill="currentColor" />
    </svg>
  ),
  bus: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="10" rx="2" /><path d="M3 12h18" />
      <circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" />
    </svg>
  ),
  hotel: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20v-7a2 2 0 012-2h16a2 2 0 012 2v7" /><path d="M2 13V6a2 2 0 012-2h5v7" /><path d="M2 20h20" />
    </svg>
  ),
  holiday: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  utility: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  other: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
}

const initialModuleApis: Record<string, ApiEntry[]> = {
  flight: [
    { id: "flight-1", provider: "Amadeus GDS", baseUrl: "https://api.amadeus.travel/v2", apiKey: "AM-LIVE-7F2K-9X31-4821", apiSecret: "sk_live_9f82ha62kd82", environment: "Live", enabled: true },
  ],
  railway: [
    { id: "railway-1", provider: "IRCTC eTicketing API", baseUrl: "https://api.irctc.co.in/v3", apiKey: "IRCTC-BKND-2C41-9910", apiSecret: "irctc_sec_a91k28dj", environment: "Live", enabled: true },
  ],
  bus: [
    { id: "bus-1", provider: "RedBus Partner API", baseUrl: "https://api.redbus.in/partner/v1", apiKey: "RB-API-5G61-3321", apiSecret: "rb_sec_772hd91k", environment: "Live", enabled: true },
  ],
  hotel: [
    { id: "hotel-1", provider: "TBO Hotel API", baseUrl: "https://api.tboholidays.com/hotel/v2", apiKey: "TBO-9K21-KJ71-7712", apiSecret: "tbo_sec_k29dj182", environment: "Live", enabled: true },
  ],
  holiday: [
    { id: "holiday-1", provider: "Internal Package Engine", baseUrl: "https://api.primerouteholidays.com/packages/v1", apiKey: "PRH-PKG-4471-2091", apiSecret: "prh_sec_88ak02mz", environment: "Live", enabled: true },
  ],
  utility: [
    { id: "utility-1", provider: "BBPS Bharat BillPay", baseUrl: "", apiKey: "", apiSecret: "", environment: "Test", enabled: false },
  ],
}

type OtherIntegration = {
  id: string
  name: string
  apiKey: string
  webhookUrl: string
  enabled: boolean
}

const initialOthers: OtherIntegration[] = [
  { id: "razorpay", name: "Razorpay Payment Gateway", apiKey: "rzp_live_a91k2882jd91", webhookUrl: "https://api.primerouteholidays.com/webhooks/razorpay", enabled: true },
  { id: "msg91", name: "SMS Gateway (MSG91)", apiKey: "MSG91-2A61-KD91-5642", webhookUrl: "", enabled: true },
]

const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
const labelCls = "mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"

function emptyApiForm(): Omit<ApiEntry, "id"> {
  return { provider: "", baseUrl: "", apiKey: "", apiSecret: "", environment: "Live", enabled: true }
}

function emptyOtherForm(): Omit<OtherIntegration, "id"> {
  return { name: "", apiKey: "", webhookUrl: "", enabled: true }
}

function maskValue(value: string, reveal: boolean) {
  if (!value) return "—"
  if (reveal) return value
  return value.length > 4 ? `••••••••${value.slice(-4)}` : "••••"
}

let apiSeq = 0
let otherSeq = initialOthers.length

export default function ApiIntegrationSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("flight")
  const [moduleApis, setModuleApis] = useState<Record<string, ApiEntry[]>>(initialModuleApis)
  const [others, setOthers] = useState<OtherIntegration[]>(initialOthers)
  const [reveal, setReveal] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<string | null>(null)

  const [apiDialog, setApiDialog] = useState<{ moduleId: string; editingId: string | null; form: Omit<ApiEntry, "id"> } | null>(null)
  const [otherDialog, setOtherDialog] = useState<{ editingId: string | null; form: Omit<OtherIntegration, "id"> } | null>(null)

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  function toggleReveal(id: string) {
    setReveal((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Module API handlers
  function openAddApi(moduleId: string) {
    setApiDialog({ moduleId, editingId: null, form: emptyApiForm() })
  }

  function openEditApi(moduleId: string, entry: ApiEntry) {
    const { id, ...form } = entry
    setApiDialog({ moduleId, editingId: id, form })
  }

  function saveApi() {
    if (!apiDialog || !apiDialog.form.provider.trim()) return
    const { moduleId, editingId, form } = apiDialog
    if (editingId) {
      setModuleApis((prev) => ({ ...prev, [moduleId]: prev[moduleId].map((e) => (e.id === editingId ? { ...e, ...form } : e)) }))
      showToast(`${form.provider} updated`)
    } else {
      apiSeq += 1
      setModuleApis((prev) => ({ ...prev, [moduleId]: [...(prev[moduleId] ?? []), { id: `${moduleId}-${apiSeq}`, ...form }] }))
      showToast(`${form.provider} added`)
    }
    setApiDialog(null)
  }

  function removeApi(moduleId: string, entry: ApiEntry) {
    setModuleApis((prev) => ({ ...prev, [moduleId]: prev[moduleId].filter((e) => e.id !== entry.id) }))
    showToast(`${entry.provider} removed`)
  }

  function toggleApiEnabled(moduleId: string, entry: ApiEntry) {
    setModuleApis((prev) => ({ ...prev, [moduleId]: prev[moduleId].map((e) => (e.id === entry.id ? { ...e, enabled: !e.enabled } : e)) }))
  }

  // Other integration handlers
  function openAddOther() {
    setOtherDialog({ editingId: null, form: emptyOtherForm() })
  }

  function openEditOther(entry: OtherIntegration) {
    const { id, ...form } = entry
    setOtherDialog({ editingId: id, form })
  }

  function saveOther() {
    if (!otherDialog || !otherDialog.form.name.trim()) return
    const { editingId, form } = otherDialog
    if (editingId) {
      setOthers((prev) => prev.map((o) => (o.id === editingId ? { ...o, ...form } : o)))
      showToast(`${form.name} updated`)
    } else {
      otherSeq += 1
      setOthers((prev) => [...prev, { id: `other-${otherSeq}`, ...form }])
      showToast(`${form.name} added`)
    }
    setOtherDialog(null)
  }

  function removeOther(entry: OtherIntegration) {
    setOthers((prev) => prev.filter((o) => o.id !== entry.id))
    showToast(`${entry.name} removed`)
  }

  function toggleOtherEnabled(entry: OtherIntegration) {
    setOthers((prev) => prev.map((o) => (o.id === entry.id ? { ...o, enabled: !o.enabled } : o)))
  }

  const activeMeta = MODULE_TABS.find((t) => t.id === activeTab)!
  const activeEntries = moduleApis[activeTab] ?? []

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Module-wise API Configuration</h3>
        <p className="mt-1 text-xs text-slate-400">Pick a module tab to view its connected APIs, edit existing credentials, or add a new one.</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto rounded-xl border border-slate-100 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {MODULE_TABS.map((t) => {
          const count = t.id === "other" ? others.length : (moduleApis[t.id]?.length ?? 0)
          const isActive = activeTab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors ${isActive ? t.iconBg : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}
            >
              <span className={isActive ? t.color : ""}>{moduleIcons[t.id]}</span>
              {t.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${isActive ? "bg-white/60 dark:bg-black/20" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>{count}</span>
            </button>
          )
        })}
      </div>

      {activeTab !== "other" ? (
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{activeMeta.label} APIs</h3>
              <p className="mt-0.5 text-xs text-slate-400">Credentials this module uses to connect with its supplier(s).</p>
            </div>
            <button
              onClick={() => openAddApi(activeMeta.id)}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add API
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="px-6 py-3 text-left font-medium">Provider</th>
                  <th className="px-6 py-3 text-left font-medium">Base URL</th>
                  <th className="px-6 py-3 text-left font-medium">API Key</th>
                  <th className="px-6 py-3 text-left font-medium">Environment</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {activeEntries.map((entry) => {
                  const isConfigured = Boolean(entry.apiKey)
                  const showKey = reveal[entry.id] ?? false
                  return (
                    <tr key={entry.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activeMeta.iconBg}`}>{moduleIcons[activeMeta.id]}</div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-100">{entry.provider}</p>
                            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${isConfigured ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                              {isConfigured ? "Connected" : "Not Configured"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">{entry.baseUrl || "—"}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-300">
                          {maskValue(entry.apiKey, showKey)}
                          {entry.apiKey && (
                            <button onClick={() => toggleReveal(entry.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {showKey ? (
                                  <><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a19.7 19.7 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 10 8 10 8a19.7 19.7 0 01-3.22 4.36M14.12 14.12a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                                ) : (
                                  <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                                )}
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${entry.environment === "Live" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}`}>{entry.environment}</span>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => toggleApiEnabled(activeMeta.id, entry)}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${entry.enabled ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}`}
                        >
                          {entry.enabled ? "Enabled" : "Disabled"}
                        </button>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <button onClick={() => openEditApi(activeMeta.id, entry)} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">Edit</button>
                          <button onClick={() => removeApi(activeMeta.id, entry)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {activeEntries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-400">
                      No APIs added for {activeMeta.label} yet. Click <span className="font-medium text-indigo-600">Add API</span> to configure one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Other Integrations</h3>
              <p className="mt-0.5 text-xs text-slate-400">Shared services not tied to a single booking module.</p>
            </div>
            <button
              onClick={openAddOther}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add Integration
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="px-6 py-3 text-left font-medium">Name</th>
                  <th className="px-6 py-3 text-left font-medium">API Key</th>
                  <th className="px-6 py-3 text-left font-medium">Webhook URL</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {others.map((o) => {
                  const showKey = reveal[o.id] ?? false
                  return (
                    <tr key={o.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                      <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{o.name}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-300">
                          {maskValue(o.apiKey, showKey)}
                          {o.apiKey && (
                            <button onClick={() => toggleReveal(o.id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {showKey ? (
                                  <><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a19.7 19.7 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 10 8 10 8a19.7 19.7 0 01-3.22 4.36M14.12 14.12a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                                ) : (
                                  <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                                )}
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">{o.webhookUrl || "—"}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => toggleOtherEnabled(o)}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${o.enabled ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}`}
                        >
                          {o.enabled ? "Enabled" : "Disabled"}
                        </button>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <button onClick={() => openEditOther(o)} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">Edit</button>
                          <button onClick={() => removeOther(o)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {others.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">
                      No integrations added yet. Click <span className="font-medium text-indigo-600">Add Integration</span> to configure one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit API modal */}
      {apiDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4" onClick={() => setApiDialog(null)}>
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {apiDialog.editingId ? `Edit API · ${apiDialog.form.provider}` : `Add API · ${MODULE_TABS.find((t) => t.id === apiDialog.moduleId)?.label}`}
                </h3>
                <p className="text-xs text-slate-400">{apiDialog.editingId ? "Update the connection details for this API" : "Configure a new API connection for this module"}</p>
              </div>
              <button onClick={() => setApiDialog(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 px-6 py-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelCls}>Provider Name</label>
                <input
                  value={apiDialog.form.provider}
                  onChange={(e) => setApiDialog({ ...apiDialog, form: { ...apiDialog.form, provider: e.target.value } })}
                  placeholder="e.g. Amadeus GDS"
                  className={inputCls}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>API Base URL</label>
                <input
                  value={apiDialog.form.baseUrl}
                  onChange={(e) => setApiDialog({ ...apiDialog, form: { ...apiDialog.form, baseUrl: e.target.value } })}
                  placeholder="https://api.example.com/v1"
                  className={inputCls + " font-mono text-xs"}
                />
              </div>
              <div>
                <label className={labelCls}>API Key</label>
                <input
                  value={apiDialog.form.apiKey}
                  onChange={(e) => setApiDialog({ ...apiDialog, form: { ...apiDialog.form, apiKey: e.target.value } })}
                  placeholder="Enter API key"
                  className={inputCls + " font-mono text-xs"}
                />
              </div>
              <div>
                <label className={labelCls}>API Secret</label>
                <input
                  value={apiDialog.form.apiSecret}
                  onChange={(e) => setApiDialog({ ...apiDialog, form: { ...apiDialog.form, apiSecret: e.target.value } })}
                  placeholder="Enter API secret"
                  className={inputCls + " font-mono text-xs"}
                />
              </div>
              <div>
                <label className={labelCls}>Environment</label>
                <div className="flex gap-1 rounded-lg border border-slate-200 p-1 dark:border-slate-700">
                  {(["Live", "Test"] as const).map((env) => (
                    <button
                      key={env}
                      type="button"
                      onClick={() => setApiDialog({ ...apiDialog, form: { ...apiDialog.form, environment: env } })}
                      className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${apiDialog.form.environment === env ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className={labelCls + " mb-0"}>Enabled</label>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={apiDialog.form.enabled}
                    onChange={(e) => setApiDialog({ ...apiDialog, form: { ...apiDialog.form, enabled: e.target.checked } })}
                    className="peer sr-only"
                  />
                  <div className="h-5 w-9 rounded-full bg-slate-200 transition-colors relative peer-checked:bg-indigo-600 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4 dark:bg-slate-700" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button onClick={() => setApiDialog(null)} className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
              <button onClick={saveApi} className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors">
                {apiDialog.editingId ? "Save Changes" : "Add API"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Other Integration modal */}
      {otherDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4" onClick={() => setOtherDialog(null)}>
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{otherDialog.editingId ? `Edit Integration · ${otherDialog.form.name}` : "Add Integration"}</h3>
                <p className="text-xs text-slate-400">{otherDialog.editingId ? "Update this shared service's credentials" : "Connect a shared service not tied to a booking module"}</p>
              </div>
              <button onClick={() => setOtherDialog(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 px-6 py-5">
              <div>
                <label className={labelCls}>Integration Name</label>
                <input
                  value={otherDialog.form.name}
                  onChange={(e) => setOtherDialog({ ...otherDialog, form: { ...otherDialog.form, name: e.target.value } })}
                  placeholder="e.g. Razorpay Payment Gateway"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>API Key</label>
                <input
                  value={otherDialog.form.apiKey}
                  onChange={(e) => setOtherDialog({ ...otherDialog, form: { ...otherDialog.form, apiKey: e.target.value } })}
                  placeholder="Enter API key"
                  className={inputCls + " font-mono text-xs"}
                />
              </div>
              <div>
                <label className={labelCls}>Webhook URL</label>
                <input
                  value={otherDialog.form.webhookUrl}
                  onChange={(e) => setOtherDialog({ ...otherDialog, form: { ...otherDialog.form, webhookUrl: e.target.value } })}
                  placeholder="https://..."
                  className={inputCls + " font-mono text-xs"}
                />
              </div>
              <div className="flex items-center gap-3">
                <label className={labelCls + " mb-0"}>Enabled</label>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={otherDialog.form.enabled}
                    onChange={(e) => setOtherDialog({ ...otherDialog, form: { ...otherDialog.form, enabled: e.target.checked } })}
                    className="peer sr-only"
                  />
                  <div className="h-5 w-9 rounded-full bg-slate-200 transition-colors relative peer-checked:bg-indigo-600 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4 dark:bg-slate-700" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button onClick={() => setOtherDialog(null)} className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
              <button onClick={saveOther} className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors">
                {otherDialog.editingId ? "Save Changes" : "Add Integration"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
