"use client"

import { useState } from "react"

type ModuleApiConfig = {
  id: string
  label: string
  color: string
  bg: string
  iconBg: string
  provider: string
  baseUrl: string
  apiKey: string
  apiSecret: string
  environment: "Live" | "Test"
  enabled: boolean
}

const initialModules: ModuleApiConfig[] = [
  {
    id: "flight",
    label: "Flight",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100 text-blue-600",
    provider: "Amadeus GDS",
    baseUrl: "https://api.amadeus.travel/v2",
    apiKey: "AM-LIVE-7F2K-9X31-4821",
    apiSecret: "sk_live_9f82ha62kd82",
    environment: "Live",
    enabled: true,
  },
  {
    id: "railway",
    label: "Railway",
    color: "text-green-700",
    bg: "bg-green-50 border-green-100",
    iconBg: "bg-green-100 text-green-600",
    provider: "IRCTC eTicketing API",
    baseUrl: "https://api.irctc.co.in/v3",
    apiKey: "IRCTC-BKND-2C41-9910",
    apiSecret: "irctc_sec_a91k28dj",
    environment: "Live",
    enabled: true,
  },
  {
    id: "bus",
    label: "Bus",
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100 text-orange-600",
    provider: "RedBus Partner API",
    baseUrl: "https://api.redbus.in/partner/v1",
    apiKey: "RB-API-5G61-3321",
    apiSecret: "rb_sec_772hd91k",
    environment: "Live",
    enabled: true,
  },
  {
    id: "hotel",
    label: "Hotel",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100 text-purple-600",
    provider: "TBO Hotel API",
    baseUrl: "https://api.tboholidays.com/hotel/v2",
    apiKey: "TBO-9K21-KJ71-7712",
    apiSecret: "tbo_sec_k29dj182",
    environment: "Live",
    enabled: true,
  },
  {
    id: "holiday",
    label: "Holiday",
    color: "text-pink-700",
    bg: "bg-pink-50 border-pink-100",
    iconBg: "bg-pink-100 text-pink-600",
    provider: "Internal Package Engine",
    baseUrl: "https://api.primerouteholidays.com/packages/v1",
    apiKey: "PRH-PKG-4471-2091",
    apiSecret: "prh_sec_88ak02mz",
    environment: "Live",
    enabled: true,
  },
  {
    id: "utility",
    label: "Utility",
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-100",
    iconBg: "bg-teal-100 text-teal-600",
    provider: "BBPS Bharat BillPay",
    baseUrl: "",
    apiKey: "",
    apiSecret: "",
    environment: "Test",
    enabled: false,
  },
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

export default function ApiIntegrationSettingsPage() {
  const [modules, setModules] = useState<ModuleApiConfig[]>(initialModules)
  const [others, setOthers] = useState<OtherIntegration[]>(initialOthers)
  const [reveal, setReveal] = useState<Record<string, { key: boolean; secret: boolean }>>({})
  const [toast, setToast] = useState<string | null>(null)

  function updateModule(id: string, patch: Partial<ModuleApiConfig>) {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
  }

  function updateOther(id: string, patch: Partial<OtherIntegration>) {
    setOthers((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)))
  }

  function toggleReveal(id: string, field: "key" | "secret") {
    setReveal((prev) => ({ ...prev, [id]: { key: prev[id]?.key ?? false, secret: prev[id]?.secret ?? false, [field]: !prev[id]?.[field] } }))
  }

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Module-wise API Configuration</h3>
        <p className="mt-1 text-xs text-slate-400">Manage the API credentials each booking module connects with. Changes apply only to the module they're saved under.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {modules.map((m) => {
          const isConfigured = Boolean(m.apiKey)
          const showKey = reveal[m.id]?.key ?? false
          const showSecret = reveal[m.id]?.secret ?? false
          return (
            <div key={m.id} className={`rounded-xl border p-5 shadow-sm ${m.bg}`}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.iconBg}`}>{moduleIcons[m.id]}</div>
                  <div>
                    <p className={`text-sm font-semibold ${m.color}`}>{m.label} API</p>
                    <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${isConfigured ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {isConfigured ? "Connected" : "Not Configured"}
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" checked={m.enabled} onChange={(e) => updateModule(m.id, { enabled: e.target.checked })} className="peer sr-only" />
                  <div className="h-5 w-9 rounded-full bg-slate-200 transition-colors relative peer-checked:bg-indigo-600 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">Provider Name</label>
                  <input
                    value={m.provider}
                    onChange={(e) => updateModule(m.id, { provider: e.target.value })}
                    className="w-full rounded-lg border border-white bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">API Base URL</label>
                  <input
                    value={m.baseUrl}
                    onChange={(e) => updateModule(m.id, { baseUrl: e.target.value })}
                    placeholder="https://api.example.com/v1"
                    className="w-full rounded-lg border border-white bg-white px-3 py-2 font-mono text-xs text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">API Key</label>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={m.apiKey}
                      onChange={(e) => updateModule(m.id, { apiKey: e.target.value })}
                      placeholder="Enter API key"
                      className="w-full rounded-lg border border-white bg-white px-3 py-2 pr-9 font-mono text-xs text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                    <button type="button" onClick={() => toggleReveal(m.id, "key")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {showKey ? (
                          <><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a19.7 19.7 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 10 8 10 8a19.7 19.7 0 01-3.22 4.36M14.12 14.12a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                        ) : (
                          <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">API Secret</label>
                  <div className="relative">
                    <input
                      type={showSecret ? "text" : "password"}
                      value={m.apiSecret}
                      onChange={(e) => updateModule(m.id, { apiSecret: e.target.value })}
                      placeholder="Enter API secret"
                      className="w-full rounded-lg border border-white bg-white px-3 py-2 pr-9 font-mono text-xs text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                    <button type="button" onClick={() => toggleReveal(m.id, "secret")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {showSecret ? (
                          <><path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a19.7 19.7 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 10 8 10 8a19.7 19.7 0 01-3.22 4.36M14.12 14.12a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                        ) : (
                          <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">Environment</label>
                  <div className="flex gap-1 rounded-lg border border-white bg-white p-1">
                    {(["Live", "Test"] as const).map((env) => (
                      <button
                        key={env}
                        type="button"
                        onClick={() => updateModule(m.id, { environment: env })}
                        className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${m.environment === env ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
                      >
                        {env}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <button type="button" className="text-xs font-medium text-slate-500 hover:text-slate-700">Test Connection</button>
                <button
                  type="button"
                  onClick={() => showToast(`${m.label} API settings saved`)}
                  className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Other Integrations</h3>
          <p className="mt-0.5 text-xs text-slate-400">Shared services not tied to a single booking module.</p>
        </div>
        <div className="divide-y divide-slate-50 dark:divide-slate-800">
          {others.map((o) => (
            <div key={o.id} className="grid gap-3 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">{o.name}</label>
                <input
                  value={o.apiKey}
                  onChange={(e) => updateOther(o.id, { apiKey: e.target.value })}
                  placeholder="Enter API key"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Webhook URL</label>
                <input
                  value={o.webhookUrl}
                  onChange={(e) => updateOther(o.id, { webhookUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" checked={o.enabled} onChange={(e) => updateOther(o.id, { enabled: e.target.checked })} className="peer sr-only" />
                  <div className="h-5 w-9 rounded-full bg-slate-200 transition-colors relative peer-checked:bg-indigo-600 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                </label>
                <button
                  type="button"
                  onClick={() => showToast(`${o.name} settings saved`)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
