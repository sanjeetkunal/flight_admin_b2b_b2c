type Row = { bookingId: string; client: string; package: string; destination: string; cancelledOn: string; amount: string; reason: string; agent: string; status: "In Process" | "Awaiting Bank" | "Overdue" }

const rows: Row[] = [
  { bookingId: "HOL08820", client: "Priya Sharma", package: "Coorg Coffee Trail", destination: "Coorg", cancelledOn: "28 Jun 2026", amount: "₹38,500", reason: "Duplicate booking", agent: "TravelBox", status: "In Process" },
  { bookingId: "HOL08818", client: "Ravi Gupta", package: "Lakshadweep Getaway", destination: "Lakshadweep", cancelledOn: "02 Jul 2026", amount: "₹76,000", reason: "Client request", agent: "StarTravel", status: "In Process" },
  { bookingId: "HOL08815", client: "Sunita Rao", package: "Ladakh Bike Expedition", destination: "Ladakh", cancelledOn: "24 Jun 2026", amount: "₹1,68,000", reason: "Operator cancelled package", agent: "FlyDeal", status: "Overdue" },
  { bookingId: "HOL08812", client: "Nikhil Joshi", package: "Sikkim Darjeeling Tour", destination: "Sikkim", cancelledOn: "03 Jul 2026", amount: "₹54,600", reason: "Client request", agent: "FlyDeal", status: "In Process" },
  { bookingId: "HOL08819", client: "Anuj Rawat", package: "Dubai City Tour", destination: "Dubai", cancelledOn: "04 Jul 2026", amount: "₹95,750", reason: "Visa rejected", agent: "QuickBook", status: "Awaiting Bank" },
]

const statusColors: Record<string, string> = {
  "In Process": "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  "Awaiting Bank": "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  Overdue: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

export default function HolidaysRefundInProcessPage() {
  const inProcessCount = rows.filter((r) => r.status === "In Process").length
  const awaitingCount = rows.filter((r) => r.status === "Awaiting Bank").length

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">({rows.length})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">In Process <span className="ml-0.5 opacity-70">({inProcessCount})</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Awaiting Bank <span className="ml-0.5 opacity-70">({awaitingCount})</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search booking ID, client, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="text-sm font-bold text-orange-600">{rows.length}</span>
          <span className="text-xs text-orange-600/70">In Process</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">₹4,32,850</span>
          <span className="text-xs text-blue-600/70">Total Refund Value</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">4.2 days</span>
          <span className="text-xs text-violet-600/70">Avg. Processing Time</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600">1</span>
          <span className="text-xs text-red-600/70">Overdue (&gt;7 days)</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Refunds In Process</h2>
            <p className="text-xs text-slate-400">Cancelled packages whose refund is being processed with the operator / bank</p>
          </div>
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">{rows.length} in process</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Booking ID</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Package</th>
                <th className="px-6 py-3 text-left font-medium">Cancelled On</th>
                <th className="px-6 py-3 text-left font-medium">Refund Amount</th>
                <th className="px-6 py-3 text-left font-medium">Reason</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.bookingId} className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">{r.bookingId}</td>
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">{r.client}</td>
                  <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{r.package}</td>
                  <td className="px-6 py-3 text-slate-700 dark:text-slate-200">{r.cancelledOn}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">{r.amount}</td>
                  <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">{r.reason}</td>
                  <td className="px-6 py-3 text-slate-500 dark:text-slate-400">{r.agent}</td>
                  <td className="px-6 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[r.status]}`}>{r.status}</span></td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Refunded</button>
                      <button className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {rows.length} of {rows.length} refunds in process</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-500 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>
    </div>
  )
}
