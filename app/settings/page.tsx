"use client"

import { useState } from "react"

const tabs = ["General", "API & Integration", "Markup & Pricing", "Notifications", "Users & Roles", "Billing"]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General")
  const [markupValues, setMarkupValues] = useState({ flight: "2.5", railway: "1.5", bus: "3.0", hotel: "5.0", holiday: "8.0", utility: "1.0" })

  return (
    <div className="space-y-5">
      {/* Tab bar */}
      <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${activeTab === tab ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* General */}
      {activeTab === "General" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm space-y-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Company Information</h3>
            {[
              { label: "Company Name", value: "VirtualToActual Pvt Ltd" },
              { label: "GSTIN", value: "27AACP1234Q1Z5" },
              { label: "PAN Number", value: "AACP1234Q" },
              { label: "IATA / TAAI Code", value: "PR-1234" },
              { label: "Phone Number", value: "+91 98765 43210" },
              { label: "Website", value: "www.virtualtoactual.com" },
            ].map((f) => (
              <div key={f.label}>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">{f.label}</label>
                <input defaultValue={f.value} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm space-y-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Registered Address</h3>
              {[
                { label: "Address Line 1", value: "123, Travel House, Andheri East" },
                { label: "City", value: "Mumbai" },
                { label: "State", value: "Maharashtra" },
                { label: "PIN Code", value: "400069" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">{f.label}</label>
                  <input defaultValue={f.value} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Bank Details</h3>
              <div className="space-y-4">
                {[
                  { label: "Bank Name", value: "HDFC Bank" },
                  { label: "Account Number", value: "XXXX XXXX 4521" },
                  { label: "IFSC Code", value: "HDFC0001234" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300">{f.label}</label>
                    <input defaultValue={f.value} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 flex justify-end">
            <button className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">Save Changes</button>
          </div>
        </div>
      )}

      {/* Markup & Pricing */}
      {activeTab === "Markup & Pricing" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-100">Default Markup Configuration</h3>
            <p className="mb-6 text-xs text-slate-400">Set default markup % for each service. Agents can override within their allowed range.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { key: "flight", label: "Flights", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
                { key: "railway", label: "Railways", color: "text-green-600", bg: "bg-green-50 border-green-100" },
                { key: "bus", label: "Bus", color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
                { key: "hotel", label: "Hotels", color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
                { key: "holiday", label: "Holidays", color: "text-pink-600", bg: "bg-pink-50 border-pink-100" },
                { key: "utility", label: "Utility", color: "text-teal-600", bg: "bg-teal-50 border-teal-100" },
              ].map((m) => (
                <div key={m.key} className={`rounded-xl border p-4 ${m.bg}`}>
                  <label className={`text-xs font-semibold ${m.color}`}>{m.label}</label>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={markupValues[m.key as keyof typeof markupValues]}
                      onChange={(e) => setMarkupValues(prev => ({ ...prev, [m.key]: e.target.value }))}
                      className="w-20 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-400 shadow-sm"
                    />
                    <span className="text-sm font-medium text-slate-600">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Tier-wise Markup Overrides</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <th className="py-3 pr-6 text-left font-medium">Tier</th>
                    {["Flight", "Railway", "Bus", "Hotel", "Holiday", "Utility"].map(h => (
                      <th key={h} className="py-3 pr-4 text-left font-medium">{h} (%)</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {[
                    { tier: "Platinum", values: [1.5, 1.0, 2.0, 3.5, 6.0, 0.5], color: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400" },
                    { tier: "Gold", values: [2.0, 1.5, 2.5, 4.0, 7.0, 0.8], color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400" },
                    { tier: "Silver", values: [2.5, 1.5, 3.0, 5.0, 8.0, 1.0], color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" },
                    { tier: "Bronze", values: [3.0, 2.0, 3.5, 6.0, 9.0, 1.2], color: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400" },
                  ].map((row) => (
                    <tr key={row.tier} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="py-3 pr-6">
                        <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${row.color}`}>{row.tier}</span>
                      </td>
                      {row.values.map((v, i) => (
                        <td key={i} className="py-3 pr-4">
                          <input defaultValue={v.toFixed(1)} className="w-16 rounded border border-slate-200 px-2 py-1 text-xs text-slate-700 outline-none focus:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">Save Pricing</button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "Notifications" && (
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-100">Notification Preferences</h3>
          <p className="mb-6 text-xs text-slate-400">Configure when and how you receive alerts.</p>
          <div className="space-y-4">
            {[
              { label: "New booking confirmation", email: true, sms: true, push: true },
              { label: "Booking cancellation", email: true, sms: true, push: true },
              { label: "New agent registration", email: true, sms: false, push: true },
              { label: "Credit limit exceeded (80%)", email: true, sms: true, push: true },
              { label: "Payment received", email: true, sms: false, push: false },
              { label: "Daily revenue summary", email: true, sms: false, push: false },
              { label: "Ticket status change (PNR)", email: false, sms: true, push: true },
              { label: "API failure alert", email: true, sms: true, push: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60">
                <span className="text-sm text-slate-700 dark:text-slate-200">{item.label}</span>
                <div className="flex items-center gap-6">
                  {[
                    { key: "email", label: "Email", value: item.email },
                    { key: "sms", label: "SMS", value: item.sms },
                    { key: "push", label: "Push", value: item.push },
                  ].map((ch) => (
                    <label key={ch.key} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked={ch.value} className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">{ch.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">Save Preferences</button>
          </div>
        </div>
      )}

      {/* API & Integration */}
      {activeTab === "API & Integration" && (
        <div className="space-y-5">
          {[
            { name: "GDS / Amadeus", status: "Connected", key: "AM-LIVE-****-****-4821", color: "text-emerald-600", bg: "bg-emerald-100" },
            { name: "IRCTC API", status: "Connected", key: "IRCTC-BKND-****-****-9910", color: "text-emerald-600", bg: "bg-emerald-100" },
            { name: "RedBus API", status: "Connected", key: "RB-API-****-****-3321", color: "text-emerald-600", bg: "bg-emerald-100" },
            { name: "TBO Hotel API", status: "Connected", key: "TBO-****-****-****-7712", color: "text-emerald-600", bg: "bg-emerald-100" },
            { name: "Razorpay Payment", status: "Connected", key: "rzp_live_****_****_8891", color: "text-emerald-600", bg: "bg-emerald-100" },
            { name: "BBPS Utility API", status: "Not Configured", key: "—", color: "text-slate-400", bg: "bg-slate-100" },
            { name: "SMS Gateway (MSG91)", status: "Connected", key: "MSG91-****-****-5642", color: "text-emerald-600", bg: "bg-emerald-100" },
          ].map((api) => (
            <div key={api.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${api.bg} ${api.status === "Connected" ? "dark:bg-emerald-500/10" : "dark:bg-slate-800"}`}>
                  <svg className={`h-5 w-5 ${api.color} ${api.status === "Connected" ? "dark:text-emerald-400" : "dark:text-slate-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{api.name}</p>
                  <p className="font-mono text-xs text-slate-400">{api.key}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${api.status === "Connected" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>{api.status}</span>
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">{api.status === "Connected" ? "Configure" : "Setup"}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users & Roles */}
      {activeTab === "Users & Roles" && (
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Admin Users</h3>
            <button className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add User
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Name</th>
                <th className="px-6 py-3 text-left font-medium">Email</th>
                <th className="px-6 py-3 text-left font-medium">Role</th>
                <th className="px-6 py-3 text-left font-medium">Modules Access</th>
                <th className="px-6 py-3 text-left font-medium">Last Login</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {[
                { name: "Admin", email: "info@virtualtoactual.com", role: "Super Admin", modules: "All", lastLogin: "30 Jun, 14:22", status: "Active" },
                { name: "Rahul Mehta", email: "rahul@virtualtoactual.com", role: "Operations", modules: "Flight, Railway, Bus", lastLogin: "30 Jun, 12:10", status: "Active" },
                { name: "Pooja Sharma", email: "pooja@virtualtoactual.com", role: "Sales", modules: "Hotel, Holiday", lastLogin: "29 Jun, 18:45", status: "Active" },
                { name: "Sanjay Kumar", email: "sanjay@virtualtoactual.com", role: "Accounts", modules: "Reports, Utility", lastLogin: "28 Jun, 09:30", status: "Inactive" },
              ].map((u) => (
                <tr key={u.email} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                        {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium text-slate-800 dark:text-slate-100">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{u.email}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${u.role === "Super Admin" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">{u.modules}</td>
                  <td className="px-6 py-3 text-xs text-slate-500 dark:text-slate-400">{u.lastLogin}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>{u.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                      {u.role !== "Super Admin" && <button className="text-xs text-red-400 hover:text-red-600">Remove</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Billing */}
      {activeTab === "Billing" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Current Plan", value: "Enterprise", sub: "Unlimited agents & bookings", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
              { label: "Next Billing Date", value: "01 Aug 2026", sub: "Auto-renewal on", color: "text-slate-600 bg-slate-50 border-slate-100" },
              { label: "Monthly Cost", value: "₹9,999", sub: "+ GST = ₹11,799", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
            ].map((c) => (
              <div key={c.label} className={`rounded-xl border p-5 ${c.color}`}>
                <p className="text-xs font-medium opacity-70">{c.label}</p>
                <p className="mt-1 text-xl font-bold">{c.value}</p>
                <p className="text-xs opacity-60">{c.sub}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Billing History</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="py-3 pr-6 text-left font-medium">Invoice #</th>
                  <th className="py-3 pr-6 text-left font-medium">Period</th>
                  <th className="py-3 pr-6 text-left font-medium">Amount</th>
                  <th className="py-3 pr-6 text-left font-medium">Status</th>
                  <th className="py-3 text-left font-medium">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {[
                  { inv: "INV-2026-006", period: "Jun 2026", amount: "₹11,799", status: "Paid" },
                  { inv: "INV-2026-005", period: "May 2026", amount: "₹11,799", status: "Paid" },
                  { inv: "INV-2026-004", period: "Apr 2026", amount: "₹11,799", status: "Paid" },
                  { inv: "INV-2026-003", period: "Mar 2026", amount: "₹11,799", status: "Paid" },
                ].map((r) => (
                  <tr key={r.inv} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                    <td className="py-3 pr-6 font-mono text-xs text-slate-700 dark:text-slate-200">{r.inv}</td>
                    <td className="py-3 pr-6 text-slate-700 dark:text-slate-200">{r.period}</td>
                    <td className="py-3 pr-6 font-semibold text-slate-800 dark:text-slate-100">{r.amount}</td>
                    <td className="py-3 pr-6"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">{r.status}</span></td>
                    <td className="py-3">
                      <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
