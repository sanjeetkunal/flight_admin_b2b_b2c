"use client"

type PaginationProps = {
  page: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  itemLabel?: string
}

function pageNumbers(current: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  const keep = new Set([1, 2, totalPages - 1, totalPages, current - 1, current, current + 1])
  const sorted = [...keep].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
  const result: (number | "...")[] = []
  let prev = 0
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("...")
    result.push(p)
    prev = p
  }
  return result
}

export default function Pagination({ page, pageSize, totalItems, onPageChange, itemLabel = "entries" }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const current = Math.min(Math.max(page, 1), totalPages)
  const start = totalItems === 0 ? 0 : (current - 1) * pageSize + 1
  const end = Math.min(current * pageSize, totalItems)

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {totalItems === 0 ? (
          `No ${itemLabel} found`
        ) : (
          <>
            Showing <span className="font-medium text-slate-700 dark:text-slate-300">{start}</span>–
            <span className="font-medium text-slate-700 dark:text-slate-300">{end}</span> of{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">{totalItems}</span> {itemLabel}
          </>
        )}
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(current - 1)}
            disabled={current === 1}
            aria-label="Previous page"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          {pageNumbers(current, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-1 text-xs text-slate-400 dark:text-slate-500">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                aria-current={p === current ? "page" : undefined}
                className={`h-7 min-w-7 rounded-md px-2 text-xs font-medium ${
                  p === current ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => onPageChange(current + 1)}
            disabled={current === totalPages}
            aria-label="Next page"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      )}
    </div>
  )
}
