"use client"

import { useId, useState } from "react"

export function TooltipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] shadow-lg dark:border-slate-700 dark:bg-slate-800">
      {children}
    </div>
  )
}

export function edgeAlign(pct: number): React.CSSProperties {
  if (pct < 12) return { left: 0, transform: "translateX(0)" }
  if (pct > 88) return { left: "100%", transform: "translateX(-100%)" }
  return { left: `${pct}%`, transform: "translateX(-50%)" }
}

export function Sparkline({
  points,
  color,
  labels,
  formatValue,
}: {
  points: number[]
  color: string
  labels?: string[]
  formatValue?: (v: number) => string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 100
  const h = 30
  const step = w / (points.length - 1)
  const coords = points.map((p, i) => `${i * step},${h - ((p - min) / range) * h}`).join(" ")

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    setHover(Math.round(pct * (points.length - 1)))
  }

  const leftPct = hover !== null ? (hover / (points.length - 1)) * 100 : 0
  const topPct = hover !== null ? (1 - (points[hover] - min) / range) * 100 : 0

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-8 w-full cursor-crosshair"
        preserveAspectRatio="none"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <polyline points={coords} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {hover !== null && (
          <>
            <line x1={hover * step} y1="0" x2={hover * step} y2={h} stroke={color} strokeWidth="0.6" strokeDasharray="2,2" opacity="0.35" vectorEffect="non-scaling-stroke" />
            <circle cx={hover * step} cy={h - ((points[hover] - min) / range) * h} r="2.6" fill={color} stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
      {hover !== null && (
        <div className="pointer-events-none absolute z-20" style={{ ...edgeAlign(leftPct), top: `${topPct}%`, marginTop: "-42px" }}>
          <TooltipBox>
            <p className="font-semibold text-slate-800 dark:text-slate-100">{formatValue ? formatValue(points[hover]) : points[hover]}</p>
            {labels && <p className="text-slate-400">{labels[hover]}</p>}
          </TooltipBox>
        </div>
      )}
    </div>
  )
}

function toSmoothPath(coords: [number, number][]): string {
  if (coords.length < 2) return ""
  let d = `M ${coords[0][0]},${coords[0][1]}`
  for (let i = 0; i < coords.length - 1; i++) {
    const [x0, y0] = coords[i]
    const [x1, y1] = coords[i + 1]
    const mx = (x0 + x1) / 2
    d += ` C ${mx},${y0} ${mx},${y1} ${x1},${y1}`
  }
  return d
}

export function AreaSparkline({
  points,
  comparePoints,
  color,
  labels,
  formatValue,
  compareFormatValue,
  showArea = true,
}: {
  points: number[]
  comparePoints?: number[]
  color: string
  labels?: string[]
  formatValue?: (v: number) => string
  compareFormatValue?: (v: number) => string
  showArea?: boolean
}) {
  const [hover, setHover] = useState<number | null>(null)
  const gradId = useId()
  const all = comparePoints ? [...points, ...comparePoints] : points
  const max = Math.max(...all)
  const min = Math.min(...all)
  const range = max - min || 1
  const w = 100
  const h = 36
  const step = w / (points.length - 1)
  const toY = (v: number) => h - ((v - min) / range) * h

  const coords = points.map((p, i) => [i * step, toY(p)] as [number, number])
  const compareCoords = comparePoints?.map((p, i) => [i * step, toY(p)] as [number, number])
  const linePath = toSmoothPath(coords)
  const comparePath = compareCoords ? toSmoothPath(compareCoords) : null
  const areaPath = `${linePath} L ${(points.length - 1) * step},${h} L 0,${h} Z`

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    setHover(Math.round(pct * (points.length - 1)))
  }

  const leftPct = hover !== null ? (hover / (points.length - 1)) * 100 : 0
  const topPct = hover !== null ? (1 - (points[hover] - min) / range) * 100 : 0

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-14 w-full cursor-crosshair"
        preserveAspectRatio="none"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {comparePath && (
          <path d={comparePath} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        )}
        {showArea && <path d={areaPath} fill={`url(#${gradId})`} stroke="none" />}
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {hover !== null && (
          <>
            <line x1={hover * step} y1="0" x2={hover * step} y2={h} stroke={color} strokeWidth="0.6" strokeDasharray="2,2" opacity="0.35" vectorEffect="non-scaling-stroke" />
            {compareCoords && <circle cx={hover * step} cy={compareCoords[hover][1]} r="2.2" fill="#94a3b8" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />}
            <circle cx={hover * step} cy={toY(points[hover])} r="2.8" fill={color} stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
      {hover !== null && (
        <div className="pointer-events-none absolute z-20" style={{ ...edgeAlign(leftPct), top: `${topPct}%`, marginTop: "-46px" }}>
          <TooltipBox>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-slate-500 dark:text-slate-400">This period</span>
              <span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{formatValue ? formatValue(points[hover]) : points[hover]}</span>
            </div>
            {comparePoints && (
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full border border-slate-400 border-dashed" />
                <span className="text-slate-500 dark:text-slate-400">Last period</span>
                <span className="ml-auto font-semibold text-slate-800 dark:text-slate-100">{compareFormatValue ? compareFormatValue(comparePoints[hover]) : comparePoints[hover]}</span>
              </div>
            )}
            {labels && <p className="mt-0.5 text-slate-400">{labels[hover]}</p>}
          </TooltipBox>
        </div>
      )}
    </div>
  )
}

export function MiniBars({
  values,
  color,
  labels,
  formatValue,
}: {
  values: number[]
  color: string
  labels?: string[]
  formatValue?: (v: number) => string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...values)
  return (
    <div className="relative">
      <div className="flex h-8 items-end gap-0.5">
        {values.map((v, i) => (
          <div
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`w-1.5 cursor-pointer rounded-sm transition-opacity ${color} ${hover !== null && hover !== i ? "opacity-40" : "opacity-100"}`}
            style={{ height: `${Math.max((v / max) * 100, 8)}%` }}
          />
        ))}
      </div>
      {hover !== null && (
        <div className="pointer-events-none absolute z-20 bottom-full mb-1.5" style={edgeAlign(((hover + 0.5) / values.length) * 100)}>
          <TooltipBox>
            <p className="font-semibold text-slate-800 dark:text-slate-100">{formatValue ? formatValue(values[hover]) : values[hover]}</p>
            {labels && <p className="text-slate-400">{labels[hover]}</p>}
          </TooltipBox>
        </div>
      )}
    </div>
  )
}

export function DonutRing({
  pct,
  color,
  label,
  breakdown,
}: {
  pct: number
  color: string
  label: string
  breakdown?: { label: string; value: number; color: string }[]
}) {
  const [hover, setHover] = useState(false)
  return (
    <div className="relative flex flex-col items-center" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div
        className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full"
        style={{ background: `conic-gradient(${color} ${pct * 3.6}deg, #e2e8f0 0deg)` }}
      >
        <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{pct}%</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">{label}</span>
        </div>
      </div>
      {hover && breakdown && (
        <div className="pointer-events-none absolute z-20 bottom-full left-1/2 mb-2 -translate-x-1/2">
          <TooltipBox>
            <div className="space-y-1">
              {breakdown.map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${b.color}`} />
                  <span className="text-slate-500 dark:text-slate-400">{b.label}</span>
                  <span className="ml-3 font-semibold text-slate-800 dark:text-slate-100">{b.value}</span>
                </div>
              ))}
            </div>
          </TooltipBox>
        </div>
      )}
    </div>
  )
}
