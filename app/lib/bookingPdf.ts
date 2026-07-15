import { jsPDF } from "jspdf"
import type { FlightBooking } from "./flightBookings"

const BRAND = "Primer Route Holidays"
const BRAND_EMAIL = "info@primerouteholidays.com"
const INK: [number, number, number] = [30, 41, 59]
const MUTED: [number, number, number] = [100, 116, 139]
const ACCENT: [number, number, number] = [37, 99, 235]
const LINE: [number, number, number] = [226, 232, 240]

function parseAmount(amount: string) {
  return Number(amount.replace(/[^0-9.]/g, "")) || 0
}

function formatInr(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`
}

function drawHeader(doc: jsPDF, title: string, subtitle: string) {
  doc.setFillColor(...ACCENT)
  doc.rect(0, 0, 210, 28, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  doc.text(BRAND, 14, 13)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text(BRAND_EMAIL, 14, 20)

  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.text(title, 196, 13, { align: "right" })
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text(subtitle, 196, 20, { align: "right" })
}

function labelValue(doc: jsPDF, x: number, y: number, label: string, value: string) {
  doc.setTextColor(...MUTED)
  doc.setFontSize(8)
  doc.text(label.toUpperCase(), x, y)
  doc.setTextColor(...INK)
  doc.setFontSize(10.5)
  doc.setFont("helvetica", "bold")
  doc.text(value, x, y + 5)
  doc.setFont("helvetica", "normal")
}

export function buildInvoicePdf(b: FlightBooking): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" })
  const invoiceNo = `INV-${b.pnr}`

  drawHeader(doc, "TAX INVOICE", `${invoiceNo}  ·  ${b.booked}`)

  let y = 42
  doc.setTextColor(...MUTED)
  doc.setFontSize(8)
  doc.text("BILL TO", 14, y)
  doc.setTextColor(...INK)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.text(b.passenger, 14, y + 6)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text(b.email, 14, y + 12)
  doc.text(b.phone, 14, y + 17)

  doc.setTextColor(...MUTED)
  doc.setFontSize(8)
  doc.text("BOOKED VIA AGENT", 140, y)
  doc.setTextColor(...INK)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.text(b.agent, 140, y + 6)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text(`Status: ${b.status}`, 140, y + 12)

  y += 28
  doc.setDrawColor(...LINE)
  doc.line(14, y, 196, y)

  y += 10
  labelValue(doc, 14, y, "PNR", b.pnr)
  labelValue(doc, 60, y, "Airline", b.airline)
  labelValue(doc, 106, y, "Route", `${b.from} → ${b.to}`)
  labelValue(doc, 152, y, "Travel Date", b.date)

  y += 16
  labelValue(doc, 14, y, "Departure", b.depart)
  labelValue(doc, 60, y, "Arrival", b.arrive)
  labelValue(doc, 106, y, "Class", b.class)
  labelValue(doc, 152, y, "Passengers", String(b.pax))

  y += 20
  doc.setDrawColor(...LINE)
  doc.line(14, y, 196, y)

  const total = parseAmount(b.amount)
  const base = total / 1.18
  const taxes = total - base

  y += 12
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(14, y, 182, 42, 2, 2, "F")

  const rowY = y + 10
  doc.setFontSize(10)
  doc.setTextColor(...INK)
  doc.text("Base Fare", 22, rowY)
  doc.text(formatInr(base), 182, rowY, { align: "right" })

  doc.text("Taxes & Surcharges", 22, rowY + 9)
  doc.text(formatInr(taxes), 182, rowY + 9, { align: "right" })

  doc.setDrawColor(...LINE)
  doc.line(22, rowY + 15, 182, rowY + 15)

  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("Total Amount", 22, rowY + 25)
  doc.setTextColor(...ACCENT)
  doc.text(b.amount, 182, rowY + 25, { align: "right" })

  doc.setFont("helvetica", "normal")
  doc.setTextColor(...MUTED)
  doc.setFontSize(8)
  doc.text("This is a system-generated invoice and does not require a signature.", 14, 280)
  doc.text(`Generated on ${new Date().toLocaleString("en-IN")}`, 14, 285)

  return doc
}

export function buildTicketPdf(b: FlightBooking): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" })

  drawHeader(doc, "E-TICKET", "Itinerary Receipt")

  let y = 42
  doc.setTextColor(...MUTED)
  doc.setFontSize(8)
  doc.text("PNR", 14, y)
  doc.setTextColor(...ACCENT)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.text(b.pnr, 14, y + 9)

  doc.setTextColor(...INK)
  doc.setFontSize(11)
  doc.text(b.passenger, 140, y + 3, { align: "left" })
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text(`${b.class} · ${b.pax} Passenger${b.pax > 1 ? "s" : ""}`, 140, y + 9)

  y += 24
  doc.setDrawColor(...LINE)
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(14, y, 182, 46, 2, 2, "F")

  doc.setTextColor(...INK)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.text(b.from, 24, y + 20)
  doc.text(b.to, 172, y + 20, { align: "right" })

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text(b.depart, 24, y + 27)
  doc.text(b.arrive, 172, y + 27, { align: "right" })

  doc.setDrawColor(...ACCENT)
  doc.line(50, y + 16, 146, y + 16)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.setTextColor(...ACCENT)
  doc.text(b.airline, 98, y + 13, { align: "center" })

  doc.setTextColor(...INK)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.text(`Travel Date: ${b.date}`, 98, y + 38, { align: "center" })

  y += 58
  labelValue(doc, 14, y, "Booking Reference", b.pnr)
  labelValue(doc, 60, y, "Booked Via", b.agent)
  labelValue(doc, 106, y, "Booked On", b.booked)
  labelValue(doc, 152, y, "Status", b.status)

  y += 20
  doc.setDrawColor(...LINE)
  doc.line(14, y, 196, y)

  doc.setTextColor(...MUTED)
  doc.setFontSize(8)
  doc.text("Please carry a valid photo ID along with this e-ticket for check-in.", 14, y + 8)
  doc.text(`Generated on ${new Date().toLocaleString("en-IN")}`, 14, 285)

  return doc
}

export async function shareBookingPdfOnWhatsApp(doc: jsPDF, filename: string, message: string) {
  const blob = doc.output("blob")
  const file = new File([blob], filename, { type: "application/pdf" })

  const nav = navigator as Navigator & {
    canShare?: (data: { files?: File[] }) => boolean
    share?: (data: { files?: File[]; text?: string; title?: string }) => Promise<void>
  }

  if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
    await nav.share({ files: [file], text: message, title: filename })
    return "shared" as const
  }

  doc.save(filename)
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
  return "fallback" as const
}
