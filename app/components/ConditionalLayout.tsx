"use client"

import { usePathname } from "next/navigation"
import TopNav from "./TopNav"
import PageHeader from "./PageHeader"
import Sidebar from "./Sidebar"

const AUTH_ROUTES = ["/login"]

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = AUTH_ROUTES.includes(pathname)

  if (isAuthPage) {
    return <div className="h-full">{children}</div>
  }

  return (
    <div className="flex h-full flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <PageHeader />
          <main className="p-6 pt-3">{children}</main>
        </div>
      </div>
    </div>
  )
}
