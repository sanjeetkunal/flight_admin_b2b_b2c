"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems, NavIcon, type NavItem } from "../lib/navConfig"

export default function TopNav() {
  const pathname = usePathname()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
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
        setNotifOpen(false)
        setProfileOpen(false)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileSubmenu(null)
  }, [pathname])

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
    <div ref={navRef} className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
      {/* Utility bar */}
      <div className="flex h-14 items-center gap-2 px-3 sm:gap-4 sm:px-6">
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 md:hidden"
        >
          {mobileMenuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-sm shadow-indigo-500/30">
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

        <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 w-64 transition-colors focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-indigo-500/50 dark:focus-within:bg-slate-800 dark:focus-within:ring-indigo-500/20">
          <svg className="h-4 w-4 text-slate-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search bookings, agents..." className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-full dark:text-slate-300" />
          <kbd className="flex-shrink-0 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400">⌘K</kbd>
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
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-slate-900" />
            </span>
          </button>
          {notifOpen && (
            <div className="animate-dropdown absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-xs font-bold text-white shadow-sm shadow-indigo-500/30">PR</div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Admin</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {profileOpen && (
            <div className="animate-dropdown absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 ring-1 ring-black/5 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/40">
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

      {/* Menu bar (desktop) */}
      <nav className="hidden md:flex items-center gap-1 border-t border-slate-100 px-4 py-2 dark:border-slate-800">
        {navItems.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                active
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              }`}
            >
              <NavIcon type={item.icon} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Menu bar (mobile) */}
      {mobileMenuOpen && (
        <nav className="md:hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t border-slate-100 dark:border-slate-800">
          {navItems.map((item) => {
            const active = isActive(item)
            const hasChildren = !!item.children?.length
            const submenuOpen = mobileSubmenu === item.href
            return (
              <div key={item.href} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`flex flex-1 items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors ${
                      active ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <NavIcon type={item.icon} />
                    {item.label}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => setMobileSubmenu((cur) => (cur === item.href ? null : item.href))}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center text-slate-400"
                    >
                      <svg className={`h-4 w-4 transition-transform ${submenuOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  )}
                </div>

                {hasChildren && submenuOpen && (
                  <div className="bg-slate-50 pb-2 dark:bg-slate-800/50">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center gap-2.5 py-2 pl-12 pr-4 text-sm transition-colors ${
                          pathname === child.href ? "font-medium text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <NavIcon type={child.icon} />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      )}
    </div>
  )
}
