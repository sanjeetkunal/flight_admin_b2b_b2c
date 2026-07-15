import React from "react"

export type NavChild = { href: string; label: string }
export type NavItem = { href: string; label: string; icon: string; color?: string; children?: NavChild[] }

export const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  {
    href: "/flights",
    label: "Flights",
    icon: "flight",
    color: "blue",
    children: [
      { href: "/flights", label: "Overview" },
      { href: "/flights/all-bookings", label: "All Bookings" },
      { href: "/flights/pending-pnr", label: "Pending PNR Requests" },
      { href: "/flights/issue-ticket", label: "Issue Ticket" },
      { href: "/flights/pnr-update", label: "Flight PNR Update" },
      { href: "/flights/reissue", label: "Reissue Requests" },
      { href: "/flights/refund-request", label: "Refund Requests" },
      { href: "/flights/commission-master", label: "Commission Master" },
      { href: "/flights/misc-service-charge", label: "Misc Service Charge" },
    ],
  },
  {
    href: "/railways",
    label: "Railways",
    icon: "train",
    color: "green",
    children: [
      { href: "/railways", label: "Overview" },
      { href: "/railways/all-bookings", label: "All Bookings" },
      { href: "/railways/pending-pnr", label: "Pending PNR Requests" },
      { href: "/railways/issue-ticket", label: "Issue Ticket" },
      { href: "/railways/pnr-update", label: "Train PNR Update" },
      { href: "/railways/reissue", label: "Reissue Request" },
      { href: "/railways/reissue-in-process", label: "Reissue In Process" },
      { href: "/railways/refund-request", label: "Refund Request" },
      { href: "/railways/refund-in-process", label: "Refund In Process" },
      { href: "/railways/commission-master", label: "Commission Master" },
      { href: "/railways/misc-service-charge", label: "Misc Service Charge" },
    ],
  },
  {
    href: "/holidays",
    label: "Holidays",
    icon: "holiday",
    color: "pink",
    children: [
      { href: "/holidays", label: "Overview" },
      { href: "/holidays/all-bookings", label: "All Bookings" },
      { href: "/holidays/pending-requests", label: "Pending Requests" },
      { href: "/holidays/confirm-booking", label: "Confirm Booking" },
      { href: "/holidays/package-update", label: "Package Update" },
      { href: "/holidays/amendment-request", label: "Amendment Request" },
      { href: "/holidays/amendment-in-process", label: "Amendment In Process" },
      { href: "/holidays/refund-request", label: "Refund Request" },
      { href: "/holidays/refund-in-process", label: "Refund In Process" },
      { href: "/holidays/commission-master", label: "Commission Master" },
      { href: "/holidays/misc-service-charge", label: "Misc Service Charge" },
    ],
  },
  {
    href: "/agents",
    label: "B2B Agents",
    icon: "agents",
    color: "violet",
    children: [
      { href: "/agents", label: "Overview" },
      { href: "/agents/all-agents", label: "All Agents" },
      { href: "/agents/emulate", label: "Emulate Agent" },
      { href: "/agents/credit-upload", label: "Credit Upload" },
      { href: "/agents/credit", label: "Credit Management" },
    ],
  },
  {
    href: "/reports",
    label: "Reports",
    icon: "reports",
    color: "indigo",
    children: [
      { href: "/reports", label: "Overview" },
      { href: "/reports/ledger", label: "Ledger Report" },
    ],
  },
  {
    href: "/tools",
    label: "Tools",
    icon: "tools",
    color: "slate",
    children: [
      { href: "/tools", label: "Overview" },
      { href: "/tools/email", label: "Email" },
      { href: "/tools/chat", label: "Chat" },
    ],
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "settings",
    color: "slate",
    children: [
      { href: "/settings", label: "General" },
      { href: "/settings/api", label: "API & Integrations" },
      { href: "/settings/users", label: "Users & Roles" },
    ],
  },
]

export function NavIcon({ type }: { type: string }) {
  const cls = "w-4 h-4 flex-shrink-0"
  const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  const icons: Record<string, React.ReactElement> = {
    dashboard: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    flight: (<svg className={cls} viewBox="0 0 24 24" {...base}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>),
    train: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <rect x="4" y="3" width="16" height="13" rx="4" />
        <path d="M4 11h16" /><path d="M8 3v8" /><path d="M16 3v8" />
        <circle cx="8.5" cy="14.5" r="0.6" fill="currentColor" /><circle cx="15.5" cy="14.5" r="0.6" fill="currentColor" />
        <path d="M7 16l-2 5M17 16l2 5" />
      </svg>
    ),
    holiday: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M12 2v2" /><path d="M12 8a6 6 0 016 6c0 3-2.5 4-6 8-3.5-4-6-5-6-8a6 6 0 016-6z" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
    agents: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    tools: (<svg className={cls} viewBox="0 0 24 24" {...base}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>),
    reports: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    settings: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  }
  return icons[type] ?? null
}
