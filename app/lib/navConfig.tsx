import React from "react"

export type NavChild = { href: string; label: string; icon: string }
export type NavItem = { href: string; label: string; icon: string; color?: string; children?: NavChild[] }

export const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
 
  {
    href: "/flights",
    label: "Flights",
    icon: "flight",
    color: "blue",
    children: [
      { href: "/flights", label: "Overview", icon: "overview" },
      { href: "/flights/all-bookings", label: "All Bookings", icon: "list" },
      { href: "/flights/pending-pnr", label: "Pending PNR Requests", icon: "clock" },
      { href: "/flights/issue-ticket", label: "Issue Ticket", icon: "ticket" },
      { href: "/flights/pnr-update", label: "Flight PNR Update", icon: "edit" },
      { href: "/flights/reissue", label: "Reissue Requests", icon: "refresh" },
      { href: "/flights/refund-request", label: "Refund Requests", icon: "wallet" },
      { href: "/flights/commission-master", label: "Commission Master", icon: "percent" },
      { href: "/flights/misc-service-charge", label: "Misc Service Charge", icon: "receipt" },
    ],
  },
  {
    href: "/railways",
    label: "Railways",
    icon: "train",
    color: "blue",
    children: [
      { href: "/railways", label: "Overview", icon: "overview" },
      { href: "/railways/all-bookings", label: "All Bookings", icon: "list" },
      { href: "/railways/pending-pnr", label: "Pending PNR Requests", icon: "clock" },
      { href: "/railways/issue-ticket", label: "Issue Ticket", icon: "ticket" },
      { href: "/railways/pnr-update", label: "Train PNR Update", icon: "edit" },
      { href: "/railways/reissue", label: "Reissue Request", icon: "refresh" },
      { href: "/railways/reissue-in-process", label: "Reissue In Process", icon: "hourglass" },
      { href: "/railways/refund-request", label: "Refund Request", icon: "wallet" },
      { href: "/railways/refund-in-process", label: "Refund In Process", icon: "hourglass" },
      { href: "/railways/commission-master", label: "Commission Master", icon: "percent" },
      { href: "/railways/misc-service-charge", label: "Misc Service Charge", icon: "receipt" },
    ],
  },
  {
    href: "/holidays",
    label: "Holidays",
    icon: "holiday",
    color: "blue",
    children: [
      { href: "/holidays", label: "Overview", icon: "overview" },
      { href: "/holidays/all-bookings", label: "All Bookings", icon: "list" },
      { href: "/holidays/pending-requests", label: "Pending Requests", icon: "clock" },
      { href: "/holidays/confirm-booking", label: "Confirm Booking", icon: "ticket" },
      { href: "/holidays/package-update", label: "Package Update", icon: "edit" },
      { href: "/holidays/amendment-request", label: "Amendment Request", icon: "refresh" },
      { href: "/holidays/amendment-in-process", label: "Amendment In Process", icon: "hourglass" },
      { href: "/holidays/refund-request", label: "Refund Request", icon: "wallet" },
      { href: "/holidays/refund-in-process", label: "Refund In Process", icon: "hourglass" },
      { href: "/holidays/commission-master", label: "Commission Master", icon: "percent" },
      { href: "/holidays/misc-service-charge", label: "Misc Service Charge", icon: "receipt" },
    ],
  },
  {
    href: "/agents",
    label: "B2B Agents",
    icon: "agents",
    color: "blue",
    children: [
      { href: "/agents", label: "Overview", icon: "overview" },
      { href: "/agents/all-agents", label: "All Agents", icon: "users" },
      { href: "/agents/emulate", label: "Emulate Agent", icon: "swap" },
      { href: "/agents/credit-upload", label: "Credit Upload", icon: "upload" },
      { href: "/agents/credit", label: "Credit Management", icon: "creditcard" },
    ],
  },
  {
    href: "/reports",
    label: "Reports",
    icon: "reports",
    color: "blue",
    children: [
      { href: "/reports", label: "Overview", icon: "overview" },
      { href: "/reports/ledger", label: "Ledger Report", icon: "filetext" },
    ],
  },
   { href: "/calendar", label: "Travel Calendar", icon: "calendar" },
  {
    href: "/tools",
    label: "Tools",
    icon: "tools",
    color: "blue",
    children: [
      { href: "/tools", label: "Overview", icon: "overview" },
      { href: "/tools/email", label: "Email", icon: "mail" },
      { href: "/tools/chat", label: "Chat", icon: "chat" },
    ],
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "settings",
    color: "slate",
    children: [
      { href: "/settings", label: "General", icon: "sliders" },
      { href: "/settings/api", label: "API & Integrations", icon: "plug" },
      { href: "/settings/users", label: "Users & Roles", icon: "shield" },
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
    overview: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" />
      </svg>
    ),
    calendar: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    list: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    clock: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
      </svg>
    ),
    ticket: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M3 9a2 2 0 002 2v2a2 2 0 01-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 010-4V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
        <line x1="10" y1="7" x2="10" y2="17" strokeDasharray="2 2" />
      </svg>
    ),
    edit: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z" />
      </svg>
    ),
    refresh: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M4 4v6h6M20 20v-6h-6M4.5 15a8 8 0 0014.9 2.5M19.5 9A8 8 0 004.6 6.5" />
      </svg>
    ),
    hourglass: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M5 2h14M5 22h14" />
        <path d="M6 2v4a6 6 0 003 5.2A6 6 0 006 16.4V21M18 2v4a6 6 0 01-3 5.2 6 6 0 013 5.2V21" />
      </svg>
    ),
    wallet: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5z" />
        <path d="M16 12h4v4h-4a2 2 0 010-4z" />
      </svg>
    ),
    percent: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    receipt: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M4 2l2 1.5L8 2l2 1.5L12 2l2 1.5L16 2l2 1.5L20 2v20l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L4 22z" />
        <line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="13" y2="16" />
      </svg>
    ),
    users: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    swap: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M17 3l4 4-4 4" /><path d="M3 7h18" /><path d="M7 21l-4-4 4-4" /><path d="M21 17H3" />
      </svg>
    ),
    upload: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M12 17V3" /><path d="M6.5 8.5L12 3l5.5 5.5" /><path d="M4 17v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
      </svg>
    ),
    creditcard: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    ),
    filetext: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
    mail: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" />
      </svg>
    ),
    chat: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    sliders: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
    plug: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M9 2v5M15 2v5" /><path d="M6 7h12v4a6 6 0 01-12 0z" /><path d="M12 17v5" />
      </svg>
    ),
    shield: (
      <svg className={cls} viewBox="0 0 24 24" {...base}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  }
  return icons[type] ?? null
}
