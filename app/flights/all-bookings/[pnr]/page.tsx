"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getBookingByPnr } from "../../../lib/flightBookings"
import { buildInvoicePdf, buildTicketPdf, shareBookingPdfOnWhatsApp } from "../../../lib/bookingPdf"

const statusColors: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

export default function FlightBookingDetailsPage() {
  const params = useParams<{ pnr: string }>()
  const booking = getBookingByPnr(params.pnr)
  const [shareState, setShareState] = useState<"idle" | "sharing" | "shared" | "fallback">("idle")

  if (!booking) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Booking not found</p>
        <p className="mt-1 text-xs text-slate-400">No booking exists for PNR &quot;{params.pnr}&quot;.</p>
        <Link href="/flights/all-bookings" className="mt-4 inline-block text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">← Back to all bookings</Link>
      </div>
    )
  }

  const b = booking

  const downloadInvoice = () => buildInvoicePdf(b).save(`Invoice-${b.pnr}.pdf`)
  const downloadTicket = () => buildTicketPdf(b).save(`Ticket-${b.pnr}.pdf`)

  const shareOnWhatsApp = async () => {
    setShareState("sharing")
    try {
      const doc = buildInvoicePdf(b)
      const message = `Booking invoice for PNR ${b.pnr} · ${b.from} → ${b.to} · ${b.date} · ${b.amount}`
      const result = await shareBookingPdfOnWhatsApp(doc, `Invoice-${b.pnr}.pdf`, message)
      setShareState(result === "shared" ? "shared" : "fallback")
    } catch {
      setShareState("idle")
    }
  }

  return (
    <div className="space-y-5">
      <Link href="/flights/all-bookings" className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        Back to all bookings
      </Link>

      {/* Summary header */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-mono text-lg font-bold text-blue-700 dark:text-blue-400">{b.pnr}</p>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[b.status]}`}>{b.status}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{b.passenger} · Booked on {b.booked} via {b.agent}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={downloadInvoice} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download Invoice
            </button>
            <button onClick={downloadTicket} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 000 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 000-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z" /><path d="M13 5v14" strokeDasharray="2 2" /></svg>
              Download Ticket Copy
            </button>
            <button onClick={shareOnWhatsApp} disabled={shareState === "sharing"} className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-60">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.14h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 01-1.26-4.37c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 012.42 5.83c0 4.55-3.7 8.22-8.26 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.13-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01a.92.92 0 00-.67.31c-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" /></svg>
              {shareState === "sharing" ? "Preparing…" : "Share on WhatsApp"}
            </button>
          </div>
        </div>

        {shareState === "shared" && (
          <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Invoice PDF shared successfully.</p>
        )}
        {shareState === "fallback" && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            Direct file sharing isn&apos;t supported in this browser — the invoice PDF was downloaded and WhatsApp Web opened in a new tab. Attach the downloaded file to your chat.
          </p>
        )}
      </div>

      {/* Flight segment */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Flight Details</h2>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{b.from}</p>
            <p className="text-xs text-slate-400">{b.depart}</p>
          </div>
          <div className="flex flex-1 flex-col items-center px-4">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{b.airline}</p>
            <div className="my-1.5 flex w-full max-w-xs items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="h-px flex-1 border-t border-dashed border-slate-300 dark:border-slate-600" />
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              <span className="h-px flex-1 border-t border-dashed border-slate-300 dark:border-slate-600" />
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            </div>
            <p className="text-xs text-slate-400">{b.date}</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{b.to}</p>
            <p className="text-xs text-slate-400">{b.arrive}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 dark:border-slate-800 sm:grid-cols-4">
          <div>
            <p className="text-[11px] text-slate-400">Class</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{b.class}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Passengers</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{b.pax}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Agent</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{b.agent}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Total Amount</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{b.amount}</p>
          </div>
        </div>
      </div>

      {/* Passenger + contact */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-100">Passenger Details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-[11px] text-slate-400">Name</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{b.passenger}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Email</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{b.email}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Phone</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{b.phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
