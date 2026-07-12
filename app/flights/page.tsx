"use client"

import { useState } from "react"

const allBookings = [
  { pnr: "6E2847", passenger: "Rajesh Kumar", airline: "IndiGo", from: "DEL", to: "BOM", date: "30 Jun 2026", depart: "06:20", arrive: "08:35", class: "Economy", pax: 2, amount: "₹8,450", status: "Confirmed", agent: "TravelBox", booked: "30 Jun, 09:14" },
  { pnr: "AI1045", passenger: "Priya Sharma", airline: "Air India", from: "BOM", to: "DEL", date: "30 Jun 2026", depart: "13:40", arrive: "15:55", class: "Business", pax: 1, amount: "₹22,100", status: "Pending", agent: "FlyDeal", booked: "30 Jun, 08:52" },
  { pnr: "SG301", passenger: "Amit Singh", airline: "SpiceJet", from: "BOM", to: "GOI", date: "01 Jul 2026", depart: "09:15", arrive: "10:20", class: "Economy", pax: 4, amount: "₹14,800", status: "Confirmed", agent: "StarTravel", booked: "29 Jun, 21:30" },
  { pnr: "UK927", passenger: "Sneha Patel", airline: "Vistara", from: "DEL", to: "BLR", date: "01 Jul 2026", depart: "17:30", arrive: "20:05", class: "Premium Eco", pax: 2, amount: "₹18,600", status: "Confirmed", agent: "TravelBox", booked: "29 Jun, 18:45" },
  { pnr: "IX234", passenger: "Deepa Menon", airline: "Air Asia", from: "COK", to: "DEL", date: "02 Jul 2026", depart: "05:45", arrive: "09:10", class: "Economy", pax: 1, amount: "₹5,200", status: "Cancelled", agent: "QuickBook", booked: "28 Jun, 14:20" },
  { pnr: "G8502", passenger: "Vikram Nair", airline: "Go First", from: "BOM", to: "DEL", date: "02 Jul 2026", depart: "11:00", arrive: "13:15", class: "Economy", pax: 3, amount: "₹11,700", status: "Confirmed", agent: "FlyDeal", booked: "28 Jun, 11:05" },
  { pnr: "6E4821", passenger: "Ravi Gupta", airline: "IndiGo", from: "DEL", to: "HYD", date: "03 Jul 2026", depart: "07:50", arrive: "10:05", class: "Economy", pax: 2, amount: "₹9,800", status: "Pending", agent: "StarTravel", booked: "27 Jun, 16:30" },
  { pnr: "AI202", passenger: "Sunita Rao", airline: "Air India", from: "DEL", to: "LHR", date: "05 Jul 2026", depart: "02:30", arrive: "07:45", class: "Business", pax: 2, amount: "₹2,14,000", status: "Confirmed", agent: "TravelBox", booked: "25 Jun, 10:00" },
  { pnr: "EK501", passenger: "Anuj Rawat", airline: "Emirates", from: "BOM", to: "DXB", date: "04 Jul 2026", depart: "23:55", arrive: "01:50+1", class: "Economy", pax: 5, amount: "₹1,12,500", status: "Confirmed", agent: "QuickBook", booked: "26 Jun, 08:15" },
  { pnr: "SQ422", passenger: "Meera Iyer", airline: "Singapore Air", from: "DEL", to: "SIN", date: "06 Jul 2026", depart: "15:25", arrive: "01:20+1", class: "Premium Eco", pax: 2, amount: "₹98,000", status: "Pending", agent: "FlyDeal", booked: "24 Jun, 19:40" },
]

const statusColors: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
}

export default function FlightsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = allBookings.filter((b) => {
    const matchSearch = search === "" || b.passenger.toLowerCase().includes(search.toLowerCase()) || b.pnr.toLowerCase().includes(search.toLowerCase()) || b.agent.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || b.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = {
    All: allBookings.length,
    Confirmed: allBookings.filter((b) => b.status === "Confirmed").length,
    Pending: allBookings.filter((b) => b.status === "Pending").length,
    Cancelled: allBookings.filter((b) => b.status === "Cancelled").length,
  }

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Bookings", value: "487", sub: "today", color: "text-blue-600 bg-blue-50 border-blue-100" },
          { label: "Revenue", value: "₹8,23,400", sub: "today", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Cancelled", value: "12", sub: "today", color: "text-red-600 bg-red-50 border-red-100" },
          { label: "Avg. Ticket", value: "₹16,900", sub: "per booking", color: "text-violet-600 bg-violet-50 border-violet-100" },
        ].map((c) => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
            <p className="text-xs font-medium opacity-70">{c.label}</p>
            <p className="mt-1 text-2xl font-bold">{c.value}</p>
            <p className="text-xs opacity-60">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {["All", "Confirmed", "Pending", "Cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${statusFilter === s ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
              >
                {s} <span className="ml-0.5 opacity-70">({counts[s as keyof typeof counts]})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search PNR, passenger, agent..." className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-40 sm:w-52" />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Booking
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">PNR</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Airline</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Date & Time</th>
                <th className="px-6 py-3 text-left font-medium">Class</th>
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
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">{b.pnr}</td>
                  <td className="px-6 py-3 font-medium text-slate-800">{b.passenger}</td>
                  <td className="px-6 py-3 text-slate-600">{b.airline}</td>
                  <td className="px-6 py-3">
                    <span className="font-semibold text-slate-800">{b.from}</span>
                    <span className="mx-1 text-slate-400">→</span>
                    <span className="font-semibold text-slate-800">{b.to}</span>
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-slate-700">{b.date}</p>
                    <p className="text-xs text-slate-400">{b.depart} – {b.arrive}</p>
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-600">{b.class}</td>
                  <td className="px-6 py-3 text-center text-slate-700">{b.pax}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800">{b.amount}</td>
                  <td className="px-6 py-3 text-slate-500">{b.agent}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View</button>
                      <button className="text-xs text-slate-400 hover:text-slate-600">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {allBookings.length} bookings</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 24].map((p, i) => (
              <button key={i} className={`h-7 min-w-7 rounded-md px-2 text-xs font-medium ${p === 1 ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
