"use client"

import { useEffect, useState } from "react"
import Pagination from "../components/Pagination"

const PAGE_SIZE = 5

const allBookings = [
  { id: "HTL00219", guest: "Rajesh Kumar", hotel: "Taj Palace", city: "New Delhi", stars: 5, rooms: 2, checkin: "01 Jul 2026", checkout: "03 Jul 2026", nights: 2, type: "Deluxe Room", pax: "2A", amount: "₹28,400", status: "Confirmed", agent: "TravelBox", mealPlan: "MAP" },
  { id: "HTL00220", guest: "Priya Sharma", hotel: "The Leela", city: "Mumbai", stars: 5, rooms: 1, checkin: "02 Jul 2026", checkout: "04 Jul 2026", nights: 2, type: "Sea View Suite", pax: "2A 1C", amount: "₹42,000", status: "Confirmed", agent: "FlyDeal", mealPlan: "AP" },
  { id: "HTL00221", guest: "Amit Singh", hotel: "Novotel", city: "Goa", stars: 4, rooms: 2, checkin: "05 Jul 2026", checkout: "10 Jul 2026", nights: 5, type: "Pool View Room", pax: "2A 2C", amount: "₹68,000", status: "Pending", agent: "StarTravel", mealPlan: "CP" },
  { id: "HTL00222", guest: "Sneha Patel", hotel: "Courtyard Marriott", city: "Bangalore", stars: 4, rooms: 1, checkin: "03 Jul 2026", checkout: "05 Jul 2026", nights: 2, type: "Superior Room", pax: "2A", amount: "₹12,600", status: "Confirmed", agent: "TravelBox", mealPlan: "EP" },
  { id: "HTL00223", guest: "Vikram Nair", hotel: "Radisson Blu", city: "Hyderabad", stars: 4, rooms: 1, checkin: "30 Jun 2026", checkout: "01 Jul 2026", nights: 1, type: "Business Room", pax: "1A", amount: "₹5,800", status: "Confirmed", agent: "QuickBook", mealPlan: "CP" },
  { id: "HTL00224", guest: "Deepa Menon", hotel: "Backwater Ripples", city: "Kerala", stars: 3, rooms: 2, checkin: "08 Jul 2026", checkout: "12 Jul 2026", nights: 4, type: "Houseboat Suite", pax: "2A", amount: "₹38,400", status: "Confirmed", agent: "FlyDeal", mealPlan: "MAP" },
  { id: "HTL00225", guest: "Ravi Gupta", hotel: "Hyatt Regency", city: "Delhi", stars: 5, rooms: 1, checkin: "04 Jul 2026", checkout: "06 Jul 2026", nights: 2, type: "King Room", pax: "2A", amount: "₹18,200", status: "Cancelled", agent: "StarTravel", mealPlan: "EP" },
  { id: "HTL00226", guest: "Anuj Rawat", hotel: "Ibis Styles", city: "Pune", stars: 3, rooms: 3, checkin: "07 Jul 2026", checkout: "09 Jul 2026", nights: 2, type: "Standard Room", pax: "6A", amount: "₹14,400", status: "Pending", agent: "TravelBox", mealPlan: "CP" },
]

const statusColors: Record<string, string> = { Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400" }

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3 w-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
      ))}
    </div>
  )
}

export default function HotelsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [page, setPage] = useState(1)

  const filtered = allBookings.filter((b) => {
    const matchSearch = search === "" || b.guest.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()) || b.hotel.toLowerCase().includes(search.toLowerCase()) || b.city.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || b.status === statusFilter
    return matchSearch && matchStatus
  })

  useEffect(() => setPage(1), [search, statusFilter])
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const counts = { All: allBookings.length, Confirmed: allBookings.filter(b => b.status === "Confirmed").length, Pending: allBookings.filter(b => b.status === "Pending").length, Cancelled: allBookings.filter(b => b.status === "Cancelled").length }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Bookings", value: "143", sub: "today", color: "text-purple-600 bg-purple-50 border-purple-100" },
          { label: "Revenue", value: "₹6,78,900", sub: "today", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Room Nights", value: "298", sub: "booked today", color: "text-violet-600 bg-violet-50 border-violet-100" },
          { label: "Avg. Stay", value: "2.1 nights", sub: "per booking", color: "text-blue-600 bg-blue-50 border-blue-100" },
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
              <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${statusFilter === s ? "bg-purple-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>
                {s} <span className="ml-0.5 opacity-70">({counts[s as keyof typeof counts]})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hotel, city, guest..." className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-44 dark:text-slate-200" />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-2 text-xs font-medium text-white hover:bg-purple-700 transition-colors">
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
                <th className="px-6 py-3 text-left font-medium">Guest</th>
                <th className="px-6 py-3 text-left font-medium">Hotel</th>
                <th className="px-6 py-3 text-left font-medium">City</th>
                <th className="px-6 py-3 text-left font-medium">Check-in</th>
                <th className="px-6 py-3 text-left font-medium">Check-out</th>
                <th className="px-6 py-3 text-left font-medium">Nights</th>
                <th className="px-6 py-3 text-left font-medium">Room Type</th>
                <th className="px-6 py-3 text-left font-medium">Meal</th>
                <th className="px-6 py-3 text-left font-medium">Pax</th>
                <th className="px-6 py-3 text-left font-medium">Amount</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {paginated.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-purple-700 dark:text-purple-400">{b.id}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{b.guest}</td>
                  <td className="px-6 py-3">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{b.hotel}</p>
                    <StarRating count={b.stars} />
                  </td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{b.city}</td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{b.checkin}</td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{b.checkout}</td>
                  <td className="px-6 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">{b.nights}</td>
                  <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">{b.type}</td>
                  <td className="px-6 py-3">
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">{b.mealPlan}</span>
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">{b.pax}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{b.amount}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{b.agent}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filtered.length} onPageChange={setPage} itemLabel="bookings" />
      </div>
    </div>
  )
}
