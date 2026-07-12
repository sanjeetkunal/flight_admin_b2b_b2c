"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavChild = { href: string; label: string }
type NavItem = { href: string; label: string; icon: string; children?: NavChild[] }

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  {
    href: "/flights",
    label: "Flights",
    icon: "flight",
    children: [
      { href: "/flights", label: "All Bookings" },
      { href: "/flights/pending-pnr", label: "Pending PNR Requests" },
      { href: "/flights/issue-ticket", label: "Issue Ticket" },
      { href: "/flights/pnr-update", label: "Flight PNR Update" },
      { href: "/flights/reissue", label: "Reissue Request" },
      { href: "/flights/reissue-in-process", label: "Reissue In Process" },
      { href: "/flights/refund-request", label: "Refund Request" },
      { href: "/flights/refund-in-process", label: "Refund In Process" },
      { href: "/flights/commission-master", label: "Commission Master" },
      { href: "/flights/misc-service-charge", label: "Misc Service Charge" },
    ],
  },
  {
    href: "/railways",
    label: "Railways",
    icon: "train",
    children: [
      { href: "/railways", label: "All Bookings" },
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
    href: "/agents",
    label: "B2B Agents",
    icon: "agents",
    children: [
      { href: "/agents", label: "All Agents" },
      { href: "/agents/emulate", label: "Emulate Agent" },
      { href: "/agents/credit-upload", label: "Credit Upload" },
      { href: "/agents/credit", label: "Credit Management" },
    ],
  },
  {
    href: "/reports/ledger",
    label: "Reports",
    icon: "reports",
    children: [
      { href: "/reports/ledger", label: "Ledger Report" },
    ],
  },
  {
    href: "/tools/email",
    label: "Tools",
    icon: "tools",
    children: [
      { href: "/tools/email", label: "Email" },
      { href: "/tools/chat", label: "Chat" },
    ],
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "settings",
    children: [
      { href: "/settings", label: "General" },
      { href: "/settings/api", label: "API & Integrations" },
      { href: "/settings/markup", label: "Markup & Pricing" },
      { href: "/settings/notifications", label: "Notifications" },
      { href: "/settings/users", label: "Users & Roles" },
      { href: "/settings/billing", label: "Billing" },
    ],
  },
]

function NavIcon({ type }: { type: string }) {
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

export default function TopNav() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    setIsDark(next)
  }

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
        setNotifOpen(false)
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  useEffect(() => setOpenMenu(null), [pathname])

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/"
    return pathname === item.href || pathname.startsWith(item.href + "/") || !!item.children?.some((c) => pathname === c.href)
  }

  const notifications = [
    { text: "New agent registration: StarTravel Pvt Ltd", time: "2 min ago", dot: "bg-blue-500" },
    { text: "Flight booking #6E2847 confirmed", time: "14 min ago", dot: "bg-green-500" },
    { text: "Payment pending for booking #AI1045", time: "1 hr ago", dot: "bg-yellow-500" },
    { text: "Hotel booking cancelled by agent TravelBox", time: "3 hr ago", dot: "bg-red-500" },
  ]

  return (
    <div ref={navRef} className="sticky top-0 z-30 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Utility bar */}
      <div className="flex h-14 items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Primer Route</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">B2B Admin Portal</p>
          </div>
        </Link>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 w-64 dark:border-slate-700 dark:bg-slate-800">
          <svg className="h-4 w-4 text-slate-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search bookings, agents..." className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-full dark:text-slate-300" />
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          {isDark ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-slate-900" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Notifications</p>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">4 new</span>
              </div>
              <div className="divide-y divide-slate-50 dark:divide-slate-800 dark:divide-slate-700">
                {notifications.map((n, i) => (
                  <div key={i} className="flex gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer dark:hover:bg-slate-700/50">
                    <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${n.dot}`} />
                    <div>
                      <p className="text-xs text-slate-700 dark:text-slate-300">{n.text}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 px-4 py-2.5 text-center dark:border-slate-700">
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
            className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors dark:hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">PR</div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Admin</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40">
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Primer Route</p>
                <p className="text-xs text-slate-400 truncate">info@primerouteholidays.com</p>
              </div>
              <div className="py-1">
                {["My Profile", "Account Settings", "API Keys", "Help & Support"].map((item) => (
                  <button key={item} className="flex w-full items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">{item}</button>
                ))}
              </div>
              <div className="border-t border-slate-100 py-1 dark:border-slate-700">
                <button className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menu bar */}
      <nav className="flex items-center gap-1 border-t border-slate-100 px-6 dark:border-slate-800">
        {navItems.map((item) => {
          const active = isActive(item)
          const hasChildren = !!item.children?.length
          return (
            <div
              key={item.href}
              className="relative flex-shrink-0"
              onMouseEnter={() => hasChildren && setOpenMenu(item.href)}
              onMouseLeave={() => hasChildren && setOpenMenu((cur) => (cur === item.href ? null : cur))}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  active ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400" : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                }`}
              >
                <NavIcon type={item.icon} />
                {item.label}
                {hasChildren && (
                  <svg className={`h-3.5 w-3.5 transition-transform ${openMenu === item.href ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </Link>

              {hasChildren && openMenu === item.href && (
                <div className="absolute left-0 top-full z-40 w-64 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        pathname === child.href ? "bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
