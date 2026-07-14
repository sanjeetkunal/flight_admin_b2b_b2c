"use client"

import { useState } from "react"

const packages = [
  { id: "HOL08821", client: "Sneha Patel", package: "Goa Beach Escape", duration: "4N/5D", destination: "Goa", category: "Beach", travel: "05 Jul 2026", return: "10 Jul 2026", pax: "2A 2C", inclusions: ["Flight", "Hotel", "Transfers", "Sightseeing"], amount: "₹84,000", status: "Confirmed", agent: "TravelBox", markup: "₹8,400" },
  { id: "HOL08822", client: "Rahul Sharma", package: "Kerala Backwaters", duration: "5N/6D", destination: "Kerala", category: "Nature", travel: "08 Jul 2026", return: "14 Jul 2026", pax: "2A", inclusions: ["Hotel", "Houseboat", "Transfers", "Meals"], amount: "₹62,000", status: "Confirmed", agent: "FlyDeal", markup: "₹6,200" },
  { id: "HOL08823", client: "Meera Iyer", package: "Manali Snow Adventure", duration: "6N/7D", destination: "Manali", category: "Adventure", travel: "15 Jul 2026", return: "22 Jul 2026", pax: "4A", inclusions: ["Flight", "Hotel", "Activities", "Meals"], amount: "₹1,52,000", status: "Pending", agent: "StarTravel", markup: "₹15,200" },
  { id: "HOL08824", client: "Vikram Nair", package: "Rajasthan Royal Tour", duration: "7N/8D", destination: "Rajasthan", category: "Heritage", travel: "20 Jul 2026", return: "28 Jul 2026", pax: "2A", inclusions: ["Flight", "Heritage Hotels", "Cab", "Guide", "Breakfast"], amount: "₹98,000", status: "Confirmed", agent: "TravelBox", markup: "₹9,800" },
  { id: "HOL08825", client: "Anita Roy", package: "Andaman Islands", duration: "5N/6D", destination: "Andaman", category: "Beach", travel: "12 Jul 2026", return: "18 Jul 2026", pax: "2A 1C", inclusions: ["Flight", "Hotel", "Ferry", "Snorkeling"], amount: "₹1,12,500", status: "Pending", agent: "QuickBook", markup: "₹11,250" },
  { id: "HOL08826", client: "Deepak Singh", package: "Shimla Manali Combo", duration: "8N/9D", destination: "Himachal", category: "Hill Station", travel: "01 Aug 2026", return: "10 Aug 2026", pax: "2A 2C", inclusions: ["Train", "Hotel", "Cab", "Breakfast"], amount: "₹68,000", status: "Confirmed", agent: "FlyDeal", markup: "₹6,800" },
  { id: "HOL08827", client: "Kavita Reddy", package: "Thailand Bangkok Pattaya", duration: "5N/6D", destination: "Thailand", category: "International", travel: "10 Jul 2026", return: "16 Jul 2026", pax: "2A", inclusions: ["Flight", "Hotel", "Visa", "Transfers", "Breakfast"], amount: "₹1,45,000", status: "Cancelled", agent: "StarTravel", markup: "₹14,500" },
]

const statusColors: Record<string, string> = { Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400" }
const categoryColors: Record<string, string> = { Beach: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400", Nature: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400", Adventure: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400", Heritage: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400", "Hill Station": "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", International: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400" }

export default function HolidaysPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = packages.filter((p) => {
    const matchSearch = search === "" || p.client.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || p.package.toLowerCase().includes(search.toLowerCase()) || p.destination.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = { All: packages.length, Confirmed: packages.filter(p => p.status === "Confirmed").length, Pending: packages.filter(p => p.status === "Pending").length, Cancelled: packages.filter(p => p.status === "Cancelled").length }
  const totalRev = "₹7,21,500"

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Packages", value: "67", sub: "this month", color: "text-pink-600 bg-pink-50 border-pink-100" },
          { label: "Revenue", value: totalRev, sub: "this month", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "International", value: "12", sub: "packages", color: "text-violet-600 bg-violet-50 border-violet-100" },
          { label: "Total Pax", value: "187", sub: "travelers", color: "text-blue-600 bg-blue-50 border-blue-100" },
        ].map((c) => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
            <p className="text-xs font-medium opacity-70">{c.label}</p>
            <p className="mt-1 text-2xl font-bold">{c.value}</p>
            <p className="text-xs opacity-60">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="flex items-center gap-2">
            {["All", "Confirmed", "Pending", "Cancelled"].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${statusFilter === s ? "bg-pink-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}>
                {s} <span className="ml-0.5 opacity-70">({counts[s as keyof typeof counts]})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search package, client, dest..." className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-44 dark:text-slate-200" />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-pink-500 px-3 py-2 text-xs font-medium text-white hover:bg-pink-600 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Package
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">ID</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Package</th>
                <th className="px-6 py-3 text-left font-medium">Category</th>
                <th className="px-6 py-3 text-left font-medium">Destination</th>
                <th className="px-6 py-3 text-left font-medium">Travel Date</th>
                <th className="px-6 py-3 text-left font-medium">Duration</th>
                <th className="px-6 py-3 text-left font-medium">Pax</th>
                <th className="px-6 py-3 text-left font-medium">Inclusions</th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium">Markup</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-pink-600 dark:text-pink-400">{p.id}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{p.client}</td>
                  <td className="px-6 py-3">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{p.package}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${categoryColors[p.category] ?? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>{p.category}</span>
                  </td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{p.destination}</td>
                  <td className="px-6 py-3">
                    <p className="text-slate-700 dark:text-slate-200">{p.travel}</p>
                    <p className="text-xs text-slate-400">Return: {p.return}</p>
                  </td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{p.duration}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{p.pax}</td>
                  <td className="px-6 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.inclusions.slice(0, 3).map((inc) => (
                        <span key={inc} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{inc}</span>
                      ))}
                      {p.inclusions.length > 3 && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">+{p.inclusions.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{p.amount}</td>
                  <td className="px-6 py-3 font-medium text-emerald-600 dark:text-emerald-400">{p.markup}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{p.agent}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {filtered.length} of {packages.length} packages</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p, i) => (
              <button key={i} className={`h-7 min-w-7 rounded-md px-2 text-xs font-medium ${p === 1 ? "bg-pink-500 text-white" : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
