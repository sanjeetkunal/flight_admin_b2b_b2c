"use client"

import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/flights": "Flight Bookings",
  "/flights/pending-pnr": "Pending PNR Requests",
  "/flights/issue-ticket": "Issue Ticket",
  "/flights/pnr-update": "Flight PNR Update",
  "/flights/reissue": "Reissue Request",
  "/flights/reissue-in-process": "Reissue In Process",
  "/flights/refund-request": "Refund Request",
  "/flights/refund-in-process": "Refund In Process",
  "/flights/commission-master": "Commission Master",
  "/flights/misc-service-charge": "Misc Service Charge",
  "/agents": "B2B Agents",
  "/agents/emulate": "Emulate Agent",
  "/agents/credit-upload": "Credit Upload",
  "/agents/credit": "Credit Management",
  "/reports/ledger": "Ledger Report",
  "/tools/email": "Email",
  "/tools/chat": "Chat",
  "/settings": "Settings",
  "/settings/api": "API & Integrations",
  "/settings/markup": "Markup & Pricing",
  "/settings/notifications": "Notifications",
  "/settings/users": "Users & Roles",
  "/settings/billing": "Billing",
}

function categoryFor(pathname: string) {
  if (pathname === "/") return "Overview"
  if (pathname.startsWith("/flights")) return "Bookings"
  if (pathname.startsWith("/agents")) return "Management"
  if (pathname.startsWith("/reports")) return "Reports"
  if (pathname.startsWith("/tools")) return "Tools"
  if (pathname.startsWith("/settings")) return "System"
  return "Admin Panel"
}

export default function PageHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? "Admin Panel"
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
