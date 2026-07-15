"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems, NavIcon } from "../lib/navConfig"

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/flights": "Flights Dashboard",
  "/flights/all-bookings": "Flight Bookings",
  "/flights/pending-pnr": "Pending PNR Requests",
  "/flights/issue-ticket": "Issue Ticket",
  "/flights/pnr-update": "Flight PNR Update",
  "/flights/reissue": "Reissue Requests",
  "/flights/refund-request": "Refund Requests",
  "/flights/commission-master": "Commission Master",
  "/flights/misc-service-charge": "Misc Service Charge",
  "/railways": "Railways Dashboard",
  "/railways/all-bookings": "Train Bookings",
  "/railways/pending-pnr": "Pending PNR Requests",
  "/railways/issue-ticket": "Issue Ticket",
  "/railways/pnr-update": "Train PNR Update",
  "/railways/reissue": "Reissue Request",
  "/railways/reissue-in-process": "Reissue In Process",
  "/railways/refund-request": "Refund Request",
  "/railways/refund-in-process": "Refund In Process",
  "/railways/commission-master": "Commission Master",
  "/railways/misc-service-charge": "Misc Service Charge",
  "/holidays": "Holidays Dashboard",
  "/holidays/all-bookings": "Holiday Packages",
  "/holidays/pending-requests": "Pending Requests",
  "/holidays/confirm-booking": "Confirm Booking",
  "/holidays/package-update": "Package Update",
  "/holidays/amendment-request": "Amendment Request",
  "/holidays/amendment-in-process": "Amendment In Process",
  "/holidays/refund-request": "Refund Request",
  "/holidays/refund-in-process": "Refund In Process",
  "/holidays/commission-master": "Commission Master",
  "/holidays/misc-service-charge": "Misc Service Charge",
  "/agents": "B2B Agents Dashboard",
  "/agents/all-agents": "B2B Agents",
  "/agents/emulate": "Emulate Agent",
  "/agents/credit-upload": "Credit Upload",
  "/agents/credit": "Credit Management",
  "/reports": "Reports Dashboard",
  "/reports/ledger": "Ledger Report",
  "/tools": "Tools",
  "/tools/email": "Email",
  "/tools/chat": "Chat",
  "/settings": "Settings",
  "/settings/api": "API & Integrations",
  "/settings/users": "Users & Roles",
}

function categoryFor(pathname: string) {
  if (pathname === "/") return "Overview"
  if (pathname.startsWith("/flights")) return "Bookings"
  if (pathname.startsWith("/railways")) return "Bookings"
  if (pathname.startsWith("/holidays")) return "Bookings"
  if (pathname.startsWith("/agents")) return "Management"
  if (pathname.startsWith("/reports")) return "Reports"
  if (pathname.startsWith("/tools")) return "Tools"
  if (pathname.startsWith("/settings")) return "System"
  return "Admin Panel"
}

const colorMap: Record<string, { text: string; bg: string }> = {
  blue: { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
  green: { text: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10" },
  pink: { text: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10" },
  violet: { text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10" },
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
  slate: { text: "text-slate-600 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-800" },
}

function activeNavItem(pathname: string) {
  if (pathname === "/") return navItems[0]
  return navItems.find((item) => item.href !== "/" && (pathname === item.href || pathname.startsWith(item.href + "/")))
}

export default function PageHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? (pathname.startsWith("/flights/all-bookings/") ? "Booking Details" : "Admin Panel")
  const category = categoryFor(pathname)
  const active = activeNavItem(pathname)
  const c = colorMap[active?.color ?? "slate"]

  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
      <div className="flex items-center gap-3">
        {active && (
          <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
            <NavIcon type={active.icon} />
          </span>
        )}
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
            <Link href="/" className="hover:text-slate-600 dark:hover:text-slate-300">Home</Link>
            <span>/</span>
            <span className="uppercase tracking-wider">{category}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
        </div>
      </div>
    </div>
  )
}
