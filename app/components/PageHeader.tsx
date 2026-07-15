"use client"

import { usePathname } from "next/navigation"

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

export default function PageHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? (pathname.startsWith("/flights/all-bookings/") ? "Booking Details" : "Admin Panel")
  const category = categoryFor(pathname)

  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-1">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{category}</p>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
      </div>
    </div>
  )
}
