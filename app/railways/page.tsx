"use client"

import { useState } from "react"

const allBookings = [
  { pnr: "1234567890", passenger: "Rajesh Kumar", train: "12951", trainName: "Mumbai Rajdhani", from: "NDLS", to: "MMCT", date: "01 Jul 2026", depart: "16:55", arrive: "08:35+1", class: "3A", pax: 2, amount: "₹2,145", status: "Confirmed", agent: "TravelBox", quota: "General" },
  { pnr: "2345678901", passenger: "Priya Sharma", train: "12301", trainName: "Howrah Rajdhani", from: "NDLS", to: "HWH", date: "01 Jul 2026", depart: "17:00", arrive: "10:05+1", class: "2A", pax: 1, amount: "₹2,890", status: "Confirmed", agent: "FlyDeal", quota: "Tatkal" },
  { pnr: "3456789012", passenger: "Amit Singh", train: "12002", trainName: "Bhopal Shatabdi", from: "NDLS", to: "BPL", date: "30 Jun 2026", depart: "06:00", arrive: "13:30", class: "CC", pax: 3, amount: "₹4,320", status: "Pending", agent: "StarTravel", quota: "General" },
  { pnr: "4567890123", passenger: "Sneha Patel", train: "12009", trainName: "Mumbai Shatabdi", from: "MMCT", to: "PUNE", date: "30 Jun 2026", depart: "07:10", arrive: "10:55", class: "EC", pax: 2, amount: "₹1,440", status: "Confirmed", agent: "TravelBox", quota: "General" },
  { pnr: "5678901234", passenger: "Vikram Nair", train: "22120", trainName: "Tejas Express", from: "CSMT", to: "KYNR", date: "02 Jul 2026", depart: "05:25", arrive: "11:30", class: "EC", pax: 4, amount: "₹5,800", status: "Cancelled", agent: "QuickBook", quota: "Tatkal" },
  { pnr: "6789012345", passenger: "Deepa Menon", train: "12625", trainName: "Kerala Express", from: "NDLS", to: "TVC", date: "03 Jul 2026", depart: "11:05", arrive: "17:00+1", class: "SL", pax: 2, amount: "₹1,180", status: "Confirmed", agent: "FlyDeal", quota: "Ladies" },
  { pnr: "7890123456", passenger: "Ravi Gupta", train: "12953", trainName: "August Kranti Raj", from: "NDLS", to: "MMCT", date: "04 Jul 2026", depart: "17:40", arrive: "10:25+1", class: "1A", pax: 1, amount: "₹4,650", status: "Pending", agent: "StarTravel", quota: "General" },
  { pnr: "8901234567", passenger: "Anuj Rawat", train: "12565", trainName: "Bihar Sampark Kranti", from: "ANVT", to: "BGP", date: "05 Jul 2026", depart: "13:25", arrive: "06:55+1", class: "3A", pax: 5, amount: "₹5,225", status: "Confirmed", agent: "TravelBox", quota: "General" },
]

const statusColors: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

const classColors: Record<string, string> = {
  "1A": "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400",
  "2A": "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400",
  "3A": "bg-indigo-100 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-400",
  "SL": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "CC": "bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-400",
  "EC": "bg-pink-100 text-pink-800 dark:bg-pink-500/10 dark:text-pink-400",
}

export default function RailwaysPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = allBookings.filter((b) => {
    const matchSearch = search === "" || b.passenger.toLowerCase().includes(search.toLowerCase()) || b.pnr.includes(search) || b.trainName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || b.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = { All: allBookings.length, Confirmed: allBookings.filter(b => b.status === "Confirmed").length, Pending: allBookings.filter(b => b.status === "Pending").length, Cancelled: allBookings.filter(b => b.status === "Cancelled").length }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Bookings", value: "324", sub: "today", color: "text-green-600 bg-green-50 border-green-100" },
          { label: "Revenue", value: "₹4,12,800", sub: "today", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Tatkal Bookings", value: "48", sub: "today", color: "text-orange-600 bg-orange-50 border-orange-100" },
          { label: "Waitlisted", value: "7", sub: "pending confirmation", color: "text-amber-600 bg-amber-50 border-amber-100" },
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
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${statusFilter === s ? "bg-green-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}>
                {s} <span className="ml-0.5 opacity-70">({counts[s as keyof typeof counts]})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search PNR, train, passenger..." className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-48 dark:text-slate-200" />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Booking
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">PNR</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Train</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Date & Time</th>
                <th className="px-6 py-3 text-left font-medium">Class</th>
                <th className="px-6 py-3 text-left font-medium">Quota</th>
                <th className="px-6 py-3 text-left font-medium">Pax</th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((b) => (
                <tr key={b.pnr} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-green-700 dark:text-green-400">{b.pnr}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{b.passenger}</td>
                  <td className="px-6 py-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{b.train}</p>
                    <p className="text-xs text-slate-400">{b.trainName}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{b.from}</span>
                    <span className="mx-1 text-slate-400">→</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{b.to}</span>
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-slate-700 dark:text-slate-200">{b.date}</p>
                    <p className="text-xs text-slate-400">{b.depart} – {b.arrive}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${classColors[b.class] ?? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>{b.class}</span>
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">{b.quota}</td>
                  <td className="px-6 py-3 text-center text-slate-700 dark:text-slate-200">{b.pax}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{b.amount}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{b.agent}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View</button>
                      <button className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {filtered.length} of {allBookings.length} bookings</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 18].map((p, i) => (
              <button key={i} className={`h-7 min-w-7 rounded-md px-2 text-xs font-medium ${p === 1 ? "bg-green-600 text-white" : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
