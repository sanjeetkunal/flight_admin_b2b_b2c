const moduleStats = [
  { label: "Flights", bookings: 487, revenue: 823400, color: "bg-blue-500", lightBg: "bg-blue-50", textColor: "text-blue-600", pct: 38 },
  { label: "Railways", bookings: 324, revenue: 412800, color: "bg-green-500", lightBg: "bg-green-50", textColor: "text-green-600", pct: 25 },
  { label: "Hotels", bookings: 143, revenue: 678900, color: "bg-purple-500", lightBg: "bg-purple-50", textColor: "text-purple-600", pct: 26 },
  { label: "Bus", bookings: 198, revenue: 245600, color: "bg-orange-500", lightBg: "bg-orange-50", textColor: "text-orange-600", pct: 15 },
  { label: "Holidays", bookings: 67, revenue: 721500, color: "bg-pink-500", lightBg: "bg-pink-50", textColor: "text-pink-600", pct: 28 },
  { label: "Utility", bookings: 228, revenue: 63100, color: "bg-teal-500", lightBg: "bg-teal-50", textColor: "text-teal-600", pct: 5 },
]

const topAgents = [
  { name: "Royal Wings Pvt Ltd", city: "Hyderabad", bookings: 2341, revenue: "₹18,42,000", tier: "Platinum" },
  { name: "TravelBox Pvt Ltd", city: "Mumbai", bookings: 1247, revenue: "₹9,82,400", tier: "Gold" },
  { name: "Horizon Holidays", city: "Kochi", bookings: 1089, revenue: "₹8,12,300", tier: "Gold" },
  { name: "FlyDeal Travel Agency", city: "Delhi", bookings: 842, revenue: "₹5,67,800", tier: "Silver" },
  { name: "StarTravel Solutions", city: "Bangalore", bookings: 634, revenue: "₹4,23,100", tier: "Silver" },
]

const monthlyData = [
  { month: "Jan", bookings: 3420, revenue: 48.2 },
  { month: "Feb", bookings: 3890, revenue: 52.1 },
  { month: "Mar", bookings: 4200, revenue: 58.4 },
  { month: "Apr", bookings: 3780, revenue: 51.8 },
  { month: "May", bookings: 4650, revenue: 63.2 },
  { month: "Jun", bookings: 5100, revenue: 72.4 },
]

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

const tierColors: Record<string, string> = {
  Platinum: "bg-violet-100 text-violet-700",
  Gold: "bg-yellow-100 text-yellow-700",
  Silver: "bg-slate-100 text-slate-600",
}

export default function ReportsPage() {
  const totalRevenue = moduleStats.reduce((a, b) => a + b.revenue, 0)
  const totalBookings = moduleStats.reduce((a, b) => a + b.bookings, 0)

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Bookings (Today)", value: totalBookings.toLocaleString(), sub: "+12.5% vs yesterday", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
          { label: "Total Revenue (Today)", value: `₹${(totalRevenue / 100000).toFixed(2)} L`, sub: "+8.2% vs yesterday", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "Active Agents (MTD)", value: "318", sub: "out of 342 total", color: "text-violet-600 bg-violet-50 border-violet-100" },
          { label: "Avg. Booking Value", value: `₹${Math.round(totalRevenue / totalBookings).toLocaleString()}`, sub: "per transaction", color: "text-blue-600 bg-blue-50 border-blue-100" },
        ].map((c) => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
            <p className="text-xs font-medium opacity-70">{c.label}</p>
            <p className="mt-1 text-2xl font-bold">{c.value}</p>
            <p className="text-xs opacity-60">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Revenue chart */}
        <div className="xl:col-span-2 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Monthly Revenue Trend</h3>
              <p className="text-xs text-slate-400">Jan – Jun 2026 (₹ Lakhs)</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">Last 6 months</span>
          </div>
          {/* Bar chart */}
          <div className="flex items-end justify-between gap-3 h-48">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">₹{d.revenue}L</span>
                <div className="w-full rounded-t-md bg-indigo-500 transition-all" style={{ height: `${(d.revenue / maxRevenue) * 160}px` }} />
                <span className="text-xs text-slate-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Module revenue pie-like breakdown */}
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Revenue by Module</h3>
          <div className="space-y-3">
            {moduleStats.map((m) => {
              const pct = Math.round((m.revenue / totalRevenue) * 100)
              return (
                <div key={m.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className={`text-xs font-medium ${m.textColor}`}>{m.label}</span>
                    <span className="text-xs text-slate-500">₹{(m.revenue / 100000).toFixed(1)}L ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div className={`h-2 rounded-full ${m.color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Module breakdown table */}
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Module-wise Performance</h3>
            <p className="text-xs text-slate-400">Today's snapshot</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="px-6 py-3 text-left font-medium">Module</th>
                  <th className="px-6 py-3 text-left font-medium">Bookings</th>
                  <th className="px-6 py-3 text-left font-medium">Revenue</th>
                  <th className="px-6 py-3 text-left font-medium">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {moduleStats.map((m) => (
                  <tr key={m.label} className="hover:bg-slate-50/60">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${m.color}`} />
                        <span className="font-medium text-slate-800">{m.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-semibold text-slate-700">{m.bookings}</td>
                    <td className="px-6 py-3 font-semibold text-slate-700">₹{(m.revenue / 100000).toFixed(1)}L</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-slate-100">
                          <div className={`h-1.5 rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{m.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top agents */}
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Top Performing Agents</h3>
            <p className="text-xs text-slate-400">By total bookings (all-time)</p>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {topAgents.map((a, i) => (
              <div key={a.name} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60">
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-slate-100 text-slate-600" : "bg-orange-100 text-orange-700"}`}>
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-slate-800">{a.name}</p>
                  <p className="text-xs text-slate-400">{a.city}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-slate-800">{a.revenue}</p>
                  <p className="text-xs text-slate-400">{a.bookings.toLocaleString()} bookings</p>
                </div>
                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${tierColors[a.tier]}`}>{a.tier}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export options */}
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Export Reports</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Booking Summary (Today)", fmt: "Excel" },
            { label: "Agent-wise Report (MTD)", fmt: "Excel" },
            { label: "Revenue Report (Monthly)", fmt: "PDF" },
            { label: "GST Report (June 2026)", fmt: "PDF" },
            { label: "Cancelled Bookings", fmt: "CSV" },
            { label: "Ledger Statement", fmt: "PDF" },
          ].map((r) => (
            <button key={r.label} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              {r.label}
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-500">{r.fmt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
