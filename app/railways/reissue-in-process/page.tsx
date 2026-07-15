export default function RailwaysReissueInProcessPage() {
  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-sm">All <span className="ml-0.5 opacity-70">(5)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">In Process <span className="ml-0.5 opacity-70">(3)</span></button>
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Awaiting Railway <span className="ml-0.5 opacity-70">(2)</span></button>
          <span className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <button className="rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Oldest First</button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input placeholder="Search PNR, passenger, agent..." className="w-40 bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none sm:w-56 dark:text-slate-200" />
        </div>
      </div>

      {/* Compact stat chips */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 dark:border-orange-500/20 dark:bg-orange-500/10">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="text-sm font-bold text-orange-600 dark:text-orange-400">5</span>
          <span className="text-xs text-orange-600/70 dark:text-orange-400/70">In Process</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 dark:border-blue-500/20 dark:bg-blue-500/10">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">₹2,100</span>
          <span className="text-xs text-blue-600/70 dark:text-blue-400/70">Fare Diff. Collected</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 dark:border-violet-500/20 dark:bg-violet-500/10">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span className="text-sm font-bold text-violet-600 dark:text-violet-400">2.1 days</span>
          <span className="text-xs text-violet-600/70 dark:text-violet-400/70">Avg. Processing Time</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 dark:border-red-500/20 dark:bg-red-500/10">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-sm font-bold text-red-600 dark:text-red-400">1</span>
          <span className="text-xs text-red-600/70 dark:text-red-400/70">Overdue (&gt;3 days)</span>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Reissue In Process</h2>
            <p className="text-xs text-slate-400">Approved reissue requests being processed with the railway for new PNR / chart preparation</p>
          </div>
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">5 in process</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">PNR</th>
                <th className="px-6 py-3 text-left font-medium">Passenger</th>
                <th className="px-6 py-3 text-left font-medium">Train</th>
                <th className="px-6 py-3 text-left font-medium">Original Date</th>
                <th className="px-6 py-3 text-left font-medium">New Date</th>
                <th className="px-6 py-3 text-left font-medium">Fare Diff.</th>
                <th className="px-6 py-3 text-left font-medium">Reissue Fee</th>
                <th className="px-6 py-3 text-left font-medium">Agent</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">6712345890</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Rajesh Kumar</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">12951 Mumbai Rajdhani</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">12 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">19 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹450</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">₹150</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3"><span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">In Process</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Reissued</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">9045678123</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sneha Patel</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">12009 Mumbai Shatabdi</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">01 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">08 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹320</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">₹100</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3"><span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">In Process</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Reissued</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">2109876543</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Sunita Rao</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">12002 Bhopal Shatabdi</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">05 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">12 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹900</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">₹200</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">TravelBox</td>
                <td className="px-6 py-3"><span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">Overdue</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Reissued</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">8934567012</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Amit Singh</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">22120 Tejas Express</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">01 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">06 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹280</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">₹100</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">StarTravel</td>
                <td className="px-6 py-3"><span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">Awaiting Railway</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Reissued</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">View</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors dark:hover:bg-slate-800/60">
                <td className="px-6 py-3 font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">1056789234</td>
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-100">Vikram Nair</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">12625 Kerala Express</td>
                <td className="px-6 py-3 text-slate-700 dark:text-slate-200">02 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">04 Jul 2026</td>
                <td className="px-6 py-3 font-semibold text-slate-800 dark:text-slate-100">₹150</td>
                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">₹75</td>
                <td className="px-6 py-3 text-slate-500 dark:text-slate-400">FlyDeal</td>
                <td className="px-6 py-3"><span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">Awaiting Railway</span></td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">Mark Reissued</button>
                    <button className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">View</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing 5 of 5 reissues in process</p>
          <div className="flex items-center gap-1">
            <button className="h-7 min-w-7 rounded-md bg-blue-600 px-2 text-xs font-medium text-white">1</button>
          </div>
        </div>
      </div>
    </div>
  )
}
