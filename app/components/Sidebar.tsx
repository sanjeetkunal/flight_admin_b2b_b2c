"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems, NavIcon } from "../lib/navConfig"

const colorMap: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  blue: { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", dot: "bg-blue-500" },
  green: { text: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10", border: "border-green-100 dark:border-green-500/20", dot: "bg-green-500" },
  pink: { text: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10", border: "border-pink-100 dark:border-pink-500/20", dot: "bg-pink-500" },
  violet: { text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-100 dark:border-violet-500/20", dot: "bg-violet-500" },
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-100 dark:border-indigo-500/20", dot: "bg-indigo-500" },
  slate: { text: "text-slate-600 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-800", border: "border-slate-200 dark:border-slate-700", dot: "bg-slate-500" },
}

export default function Sidebar() {
  const pathname = usePathname()
  const activeModule = navItems.find(
    (item) => item.children?.length && (pathname === item.href || pathname.startsWith(item.href + "/"))
  )

  if (!activeModule?.children?.length) return null

  const c = colorMap[activeModule.color ?? "slate"]

  return (
    <aside className="hidden md:flex w-60 flex-shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-4 dark:border-slate-800">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
          <NavIcon type={activeModule.icon} />
        </span>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{activeModule.label}</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {activeModule.children.map((child) => {
          const isActive = pathname === child.href
          return (
            <Link
              key={child.href}
              href={child.href}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                isActive
                  ? `${c.bg} ${c.text} font-medium ${c.border}`
                  : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              }`}
            >
              {isActive && <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${c.dot}`} />}
              {child.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
