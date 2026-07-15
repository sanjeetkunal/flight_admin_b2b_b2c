"use client"

import Link from "next/link"
import { Sparkline } from "../components/charts"

const last8Days = ["07 Jul", "08 Jul", "09 Jul", "10 Jul", "11 Jul", "12 Jul", "13 Jul", "14 Jul"]

const analyticsCards = [
  { label: "Emails Sent", value: "1,248", change: "+11%", sparkline: [120, 135, 128, 150, 142, 160, 155, 172], color: "#475569", formatValue: (v: number) => `${v} emails` },
  { label: "Chats Handled", value: "86", change: "+6%", sparkline: [8, 10, 9, 12, 11, 13, 12, 15], color: "#7c3aed", formatValue: (v: number) => `${v} chats` },
]

const quickLinks = [
  { href: "/tools/email", label: "Email", desc: "Manage and send templated emails to agents", icon: "M4 4h16v16H4z M22 6l-10 7L2 6" },
  { href: "/tools/chat", label: "Chat", desc: "Live chat support console", icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
]

export default function ToolsDashboardPage() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">Utilities for communicating with agents and customers.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {analyticsCards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.label}</p>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">Last 8 days</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 10H4z" /></svg>
                {c.change}
              </span>
            </div>
            <div className="mt-2">
              <Sparkline points={c.sparkline} color={c.color} labels={last8Days} formatValue={c.formatValue} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((q) => (
          <Link key={q.href} href={q.href} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800/60">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-700 dark:bg-slate-700">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={q.icon} /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{q.label}</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{q.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
