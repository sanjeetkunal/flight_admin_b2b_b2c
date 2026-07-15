"use client"

import { useState } from "react"

const allBookings = [
  { id: "BUS7721", passenger: "Vikram Nair", operator: "RedBus", from: "Mumbai", to: "Pune", date: "30 Jun 2026", depart: "07:00", arrive: "10:30", type: "AC Sleeper", seats: "A1, A2", pax: 2, amount: "₹1,700", status: "Confirmed", agent: "TravelBox" },
  { id: "BUS7722", passenger: "Sunita Rao", operator: "VRL Travels", from: "Bangalore", to: "Hyderabad", date: "30 Jun 2026", depart: "21:00", arrive: "06:00+1", type: "Non-AC Sleeper", seats: "B3", pax: 1, amount: "₹650", status: "Confirmed", agent: "FlyDeal" },
  { id: "BUS7723", passenger: "Arun Sharma", operator: "Orange Travels", from: "Chennai", to: "Coimbatore", date: "01 Jul 2026", depart: "22:30", arrive: "05:00+1", type: "AC Semi-Sleeper", seats: "C5, C6", pax: 2, amount: "₹1,200", status: "Pending", agent: "StarTravel" },
  { id: "BUS7724", passenger: "Priya Iyer", operator: "Parveen Travels", from: "Hyderabad", to: "Vijayawada", date: "01 Jul 2026", depart: "06:00", arrive: "11:30", type: "AC Seater", seats: "12, 13", pax: 2, amount: "₹900", status: "Confirmed", agent: "QuickBook" },
  { id: "BUS7725", passenger: "Rahul Gupta", operator: "KSRTC", from: "Mysore", to: "Bangalore", date: "30 Jun 2026", depart: "05:30", arrive: "08:45", type: "Non-AC Seater", seats: "8", pax: 1, amount: "₹190", status: "Cancelled", agent: "TravelBox" },
  { id: "BUS7726", passenger: "Meena Patel", operator: "Neeta Tours", from: "Ahmedabad", to: "Surat", date: "02 Jul 2026", depart: "08:00", arrive: "11:30", type: "AC Seater", seats: "4, 5", pax: 2, amount: "₹780", status: "Confirmed", agent: "FlyDeal" },
  { id: "BUS7727", passenger: "Deepak Singh", operator: "Rajasthan Travels", from: "Jaipur", to: "Delhi", date: "02 Jul 2026", depart: "23:00", arrive: "05:30+1", type: "AC Sleeper", seats: "U1", pax: 1, amount: "₹950", status: "Pending", agent: "StarTravel" },
  { id: "BUS7728", passenger: "Kavita Reddy", operator: "IntrCity SmartBus", from: "Bangalore", to: "Goa", date: "04 Jul 2026", depart: "18:00", arrive: "06:00+1", type: "AC Sleeper", seats: "L2, L3", pax: 2, amount: "₹3,200", status: "Confirmed", agent: "TravelBox" },
]

const statusColors: Record<string, string> = { Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400" }
const typeColors: Record<string, string> = { "AC Sleeper": "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", "Non-AC Sleeper": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", "AC Semi-Sleeper": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400", "AC Seater": "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400", "Non-AC Seater": "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300" }

export default function BusesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = allBookings.filter((b) => {
    const matchSearch = search === "" || b.passenger.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()) || b.operator.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || b.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = { All: allBookings.length, Confirmed: allBookings.filter(b => b.status === "Confirmed").length, Pending: allBookings.filter(b => b.status === "Pending").length, Cancelled: allBookings.filter(b => b.status === "Cancelled").length }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Bookings", value: "198", sub: "today", color: "text-orange-600 bg-orange-50 border-orange-100" },
          { label: "Revenue", value: "₹2,45,600", sub: "today", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "AC Buses", value: "142", sub: "bookings", color: "text-blue-600 bg-blue-50 border-blue-100" },
          { label: "Cancelled", value: "5", sub: "today", color: "text-red-600 bg-red-50 border-red-100" },
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
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${statusFilter === s ? "bg-orange-500 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>
                {s} <span className="ml-0.5 opacity-70">({counts[s as keyof typeof counts]})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search booking, passenger..." className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-44 dark:text-slate-200" />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2 text-xs font-medium text-white hover:bg-orange-600 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Booking
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Booking ID</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Operator</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Date & Time</th>
                <th className="px-6 py-3 text-left font-medium">Type</th>
                <th className="px-6 py-3 text-left font-medium">Seats</th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-orange-600 dark:text-orange-400">{b.id}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{b.passenger}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{b.operator}</td>
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
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${typeColors[b.type] ?? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>{b.type}</span>
                  </td>
                  <td className="px-6 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">{b.seats}</td>
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
            {[1, 2, 3, "...", 12].map((p, i) => (
              <button key={i} className={`h-7 min-w-7 rounded-md px-2 text-xs font-medium ${p === 1 ? "bg-orange-500 text-white" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
