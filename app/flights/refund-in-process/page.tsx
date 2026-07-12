export default function RefundInProcessPage() {
  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">All <span className="ml-0.5 opacity-70">(6)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">In Process <span className="ml-0.5 opacity-70">(4)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">Awaiting Bank <span className="ml-0.5 opacity-70">(2)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search PNR, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="text-sm font-bold text-orange-600">6</span>
          <span className="text-xs text-orange-600/70">In Process</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600">₹1,84,200</span>
          <span className="text-xs text-blue-600/70">Total Refund Value</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600">3.5 days</span>
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
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Refunds In Process</h2>
            <p className="text-xs text-slate-400">Cancelled bookings whose refund is being processed with the airline / bank</p>
          </div>
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">6 in process</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">PNR</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Airline</th>
                <th className="px-6 py-3 text-left font-medium">Route</th>
                <th className="px-6 py-3 text-left font-medium">Cancelled On</th>
                <th className="px-6 py-3 text-left font-medium">Refund Amount</th>
                <th className="px-6 py-3 text-left font-medium">Reason</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">IX234</td>
                <td className="px-6 py-3 font-medium text-slate-800">Deepa Menon</td>
                <td className="px-6 py-3 text-slate-600">Air Asia</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">COK</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                <td className="px-6 py-3 text-slate-700">28 Jun 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹4,850</td>
                <td className="px-6 py-3 text-xs text-slate-600">Passenger request</td>
                <td className="px-6 py-3 text-slate-500">QuickBook</td>
                <td className="px-6 py-3"><span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">In Process</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Refunded</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">6E4821</td>
                <td className="px-6 py-3 font-medium text-slate-800">Ravi Gupta</td>
                <td className="px-6 py-3 text-slate-600">IndiGo</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">HYD</span></td>
                <td className="px-6 py-3 text-slate-700">02 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹8,900</td>
                <td className="px-6 py-3 text-xs text-slate-600">Flight rescheduled</td>
                <td className="px-6 py-3 text-slate-500">StarTravel</td>
                <td className="px-6 py-3"><span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">In Process</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Refunded</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">SQ422</td>
                <td className="px-6 py-3 font-medium text-slate-800">Meera Iyer</td>
                <td className="px-6 py-3 text-slate-600">Singapore Air</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">DEL</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">SIN</span></td>
                <td className="px-6 py-3 text-slate-700">24 Jun 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹92,000</td>
                <td className="px-6 py-3 text-xs text-slate-600">Duplicate booking</td>
                <td className="px-6 py-3 text-slate-500">FlyDeal</td>
                <td className="px-6 py-3"><span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">Overdue</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Refunded</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">G8502</td>
                <td className="px-6 py-3 font-medium text-slate-800">Vikram Nair</td>
                <td className="px-6 py-3 text-slate-600">Go First</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                <td className="px-6 py-3 text-slate-700">03 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹5,600</td>
                <td className="px-6 py-3 text-xs text-slate-600">Passenger request</td>
                <td className="px-6 py-3 text-slate-500">FlyDeal</td>
                <td className="px-6 py-3"><span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">In Process</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Refunded</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">AI1045</td>
                <td className="px-6 py-3 font-medium text-slate-800">Priya Sharma</td>
                <td className="px-6 py-3 text-slate-600">Air India</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DEL</span></td>
                <td className="px-6 py-3 text-slate-700">30 Jun 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹22,100</td>
                <td className="px-6 py-3 text-xs text-slate-600">Airline cancelled flight</td>
                <td className="px-6 py-3 text-slate-500">TravelBox</td>
                <td className="px-6 py-3"><span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">Awaiting Bank</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Refunded</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700">EK501</td>
                <td className="px-6 py-3 font-medium text-slate-800">Anuj Rawat</td>
                <td className="px-6 py-3 text-slate-600">Emirates</td>
                <td className="px-6 py-3"><span className="font-semibold text-slate-800">BOM</span><span className="mx-1 text-slate-400">→</span><span className="font-semibold text-slate-800">DXB</span></td>
                <td className="px-6 py-3 text-slate-700">04 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800">₹50,750</td>
                <td className="px-6 py-3 text-xs text-slate-600">Visa rejected</td>
                <td className="px-6 py-3 text-slate-500">QuickBook</td>
                <td className="px-6 py-3"><span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">Awaiting Bank</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Refunded</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600">View</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500">Showing 6 of 6 refunds in process</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-600 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>
    </div>
  )
}
