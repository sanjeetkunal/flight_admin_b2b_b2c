"use client"

import { useEffect, useState } from "react"

export type DialogMode = "approve" | "reject" | "confirm" | "view"

export type DialogField = { label: string; value: string }

export type DialogState = {
  mode: DialogMode
  title: string
  subtitle?: string
  summary: DialogField[]
  details: DialogField[]
  confirmLabel?: string
} | null

const modeStyles: Record<DialogMode, { icon: React.ReactNode; ring: string; badge: string; button: string; heading: string; textareaRing: string }> = {
  approve: {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
    ),
    ring: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    button: "bg-emerald-600 hover:bg-emerald-700",
    heading: "Approve this request?",
    textareaRing: "focus:ring-emerald-100 focus:border-emerald-300",
  },
  reject: {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
    ),
    ring: "bg-red-50 text-red-600",
    badge: "bg-red-100 text-red-700",
    button: "bg-red-600 hover:bg-red-700",
    heading: "Reject this request?",
    textareaRing: "focus:ring-red-100 focus:border-red-300",
  },
  confirm: {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
    ),
    ring: "bg-blue-50 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700",
    heading: "Confirm this action?",
    textareaRing: "focus:ring-blue-100 focus:border-blue-300",
  },
  view: {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
    ),
    ring: "bg-slate-100 text-slate-600",
    badge: "bg-slate-100 text-slate-600",
    button: "bg-slate-800 hover:bg-slate-900",
    heading: "Booking Details",
    textareaRing: "focus:ring-slate-100 focus:border-slate-300",
  },
}

export default function RecordDialog({
  state,
  onClose,
  onConfirm,
}: {
  state: DialogState
  onClose: () => void
  onConfirm?: (remarks: string) => void
}) {
  const [remarks, setRemarks] = useState("")

  useEffect(() => {
    setRemarks("")
  }, [state?.title, state?.mode])

  if (!state) return null
  const style = modeStyles[state.mode]
  const isView = state.mode === "view"
  const showRemarks = state.mode === "approve" || state.mode === "reject"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 dark:bg-black/60" onClick={onClose}>
      <div
        className={`w-full ${isView ? "max-w-lg" : "max-w-md"} rounded-xl bg-white shadow-xl dark:bg-slate-900 dark:shadow-black/40`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${style.ring}`}>
            {style.icon}
          </span>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{isView ? state.title : style.heading}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">{state.subtitle || (isView ? state.title : "Please review the details below before continuing")}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {!isView && (
            <div className="mb-2 grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
              {state.summary.map((f) => (
                <div key={f.label}>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">{f.label}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{f.value}</p>
                </div>
              ))}
            </div>
          )}

          {showRemarks && (
            <div className="mt-3">
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Remarks <span className="font-normal text-slate-400 dark:text-slate-500">(optional)</span>
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder={state.mode === "approve" ? "Add a note for this approval..." : "Reason for rejection..."}
                className={`w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 ${style.textareaRing}`}
              />
            </div>
          )}

          {isView && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {state.details.map((f) => (
                <div key={f.label}>
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">{f.label}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{f.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            {isView ? "Close" : "Cancel"}
          </button>
          {!isView && (
            <button onClick={() => onConfirm?.(remarks)} className={`rounded-lg px-3.5 py-2 text-xs font-medium text-white transition-colors ${style.button}`}>
              {state.confirmLabel || (state.mode === "approve" ? "Approve" : state.mode === "reject" ? "Reject" : "Confirm")}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
