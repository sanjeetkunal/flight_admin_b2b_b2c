export type ModuleKey = "flights" | "railways" | "holidays" | "buses" | "hotels"

export type CalendarEvent = {
  id: string
  module: ModuleKey
  date: string // ISO yyyy-mm-dd
  title: string
  subtitle: string
  amount: string
  status: "Confirmed" | "Pending" | "Cancelled"
  href: string
}

export const MODULES: Record<
  ModuleKey,
  { label: string; hex: string; text: string; bg: string; border: string; dot: string }
> = {
  flights: { label: "Flights", hex: "#2563eb", text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", dot: "bg-blue-500" },
  railways: { label: "Railways", hex: "#16a34a", text: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10", border: "border-green-100 dark:border-green-500/20", dot: "bg-green-500" },
  holidays: { label: "Holidays", hex: "#db2777", text: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10", border: "border-pink-100 dark:border-pink-500/20", dot: "bg-pink-500" },
  buses: { label: "Buses", hex: "#d97706", text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", dot: "bg-amber-500" },
  hotels: { label: "Hotels", hex: "#7c3aed", text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-100 dark:border-violet-500/20", dot: "bg-violet-500" },
}

export const calendarEvents: CalendarEvent[] = [
  // Flights
  { id: "FL-6E2847", module: "flights", date: "2026-06-30", title: "Rajesh Kumar", subtitle: "IndiGo · DEL → BOM", amount: "₹8,450", status: "Confirmed", href: "/flights/all-bookings" },
  { id: "FL-AI1045", module: "flights", date: "2026-06-30", title: "Priya Sharma", subtitle: "Air India · BOM → DEL", amount: "₹22,100", status: "Pending", href: "/flights/all-bookings" },
  { id: "FL-SG301", module: "flights", date: "2026-07-01", title: "Amit Singh", subtitle: "SpiceJet · BOM → GOI", amount: "₹14,800", status: "Confirmed", href: "/flights/all-bookings" },
  { id: "FL-UK927", module: "flights", date: "2026-07-01", title: "Sneha Patel", subtitle: "Vistara · DEL → BLR", amount: "₹18,600", status: "Confirmed", href: "/flights/all-bookings" },
  { id: "FL-IX234", module: "flights", date: "2026-07-02", title: "Deepa Menon", subtitle: "Air Asia · COK → DEL", amount: "₹5,200", status: "Cancelled", href: "/flights/all-bookings" },
  { id: "FL-G8502", module: "flights", date: "2026-07-02", title: "Vikram Nair", subtitle: "Go First · BOM → DEL", amount: "₹11,700", status: "Confirmed", href: "/flights/all-bookings" },
  { id: "FL-6E4821", module: "flights", date: "2026-07-03", title: "Ravi Gupta", subtitle: "IndiGo · DEL → HYD", amount: "₹9,800", status: "Pending", href: "/flights/all-bookings" },
  { id: "FL-EK501", module: "flights", date: "2026-07-04", title: "Anuj Rawat", subtitle: "Emirates · BOM → DXB", amount: "₹1,12,500", status: "Confirmed", href: "/flights/all-bookings" },
  { id: "FL-AI202", module: "flights", date: "2026-07-05", title: "Sunita Rao", subtitle: "Air India · DEL → LHR", amount: "₹2,14,000", status: "Confirmed", href: "/flights/all-bookings" },
  { id: "FL-SQ422", module: "flights", date: "2026-07-06", title: "Meera Iyer", subtitle: "Singapore Air · DEL → SIN", amount: "₹98,000", status: "Pending", href: "/flights/all-bookings" },

  // Railways
  { id: "RL-1234567890", module: "railways", date: "2026-06-30", title: "Amit Singh", subtitle: "Bhopal Shatabdi · NDLS → BPL", amount: "₹4,320", status: "Pending", href: "/railways/all-bookings" },
  { id: "RL-4567890123", module: "railways", date: "2026-06-30", title: "Sneha Patel", subtitle: "Mumbai Shatabdi · MMCT → PUNE", amount: "₹1,440", status: "Confirmed", href: "/railways/all-bookings" },
  { id: "RL-0000000001", module: "railways", date: "2026-07-01", title: "Rajesh Kumar", subtitle: "Mumbai Rajdhani · NDLS → MMCT", amount: "₹2,145", status: "Confirmed", href: "/railways/all-bookings" },
  { id: "RL-2345678901", module: "railways", date: "2026-07-01", title: "Priya Sharma", subtitle: "Howrah Rajdhani · NDLS → HWH", amount: "₹2,890", status: "Confirmed", href: "/railways/all-bookings" },
  { id: "RL-5678901234", module: "railways", date: "2026-07-02", title: "Vikram Nair", subtitle: "Tejas Express · CSMT → KYNR", amount: "₹5,800", status: "Cancelled", href: "/railways/all-bookings" },
  { id: "RL-6789012345", module: "railways", date: "2026-07-03", title: "Deepa Menon", subtitle: "Kerala Express · NDLS → TVC", amount: "₹1,180", status: "Confirmed", href: "/railways/all-bookings" },
  { id: "RL-7890123456", module: "railways", date: "2026-07-04", title: "Ravi Gupta", subtitle: "August Kranti Raj · NDLS → MMCT", amount: "₹4,650", status: "Pending", href: "/railways/all-bookings" },
  { id: "RL-8901234567", module: "railways", date: "2026-07-05", title: "Anuj Rawat", subtitle: "Bihar Sampark Kranti · ANVT → BGP", amount: "₹5,225", status: "Confirmed", href: "/railways/all-bookings" },

  // Holidays
  { id: "HOL08823", module: "holidays", date: "2026-07-15", title: "Meera Iyer", subtitle: "Manali Snow Adventure · 6N/7D", amount: "₹1,52,000", status: "Pending", href: "/holidays/all-bookings" },
  { id: "HOL08821", module: "holidays", date: "2026-07-05", title: "Sneha Patel", subtitle: "Goa Beach Escape · 4N/5D", amount: "₹84,000", status: "Confirmed", href: "/holidays/all-bookings" },
  { id: "HOL08822", module: "holidays", date: "2026-07-08", title: "Rahul Sharma", subtitle: "Kerala Backwaters · 5N/6D", amount: "₹62,000", status: "Confirmed", href: "/holidays/all-bookings" },
  { id: "HOL08825", module: "holidays", date: "2026-07-12", title: "Anita Roy", subtitle: "Andaman Islands · 5N/6D", amount: "₹1,12,500", status: "Pending", href: "/holidays/all-bookings" },
  { id: "HOL08827", module: "holidays", date: "2026-07-10", title: "Kavita Reddy", subtitle: "Thailand Bangkok Pattaya · 5N/6D", amount: "₹1,45,000", status: "Cancelled", href: "/holidays/all-bookings" },
  { id: "HOL08824", module: "holidays", date: "2026-07-20", title: "Vikram Nair", subtitle: "Rajasthan Royal Tour · 7N/8D", amount: "₹98,000", status: "Confirmed", href: "/holidays/all-bookings" },
  { id: "HOL08826", module: "holidays", date: "2026-08-01", title: "Deepak Singh", subtitle: "Shimla Manali Combo · 8N/9D", amount: "₹68,000", status: "Confirmed", href: "/holidays/all-bookings" },

  // Buses
  { id: "BUS7721", module: "buses", date: "2026-06-30", title: "Vikram Nair", subtitle: "RedBus · Mumbai → Pune", amount: "₹1,700", status: "Confirmed", href: "/buses" },
  { id: "BUS7722", module: "buses", date: "2026-06-30", title: "Sunita Rao", subtitle: "VRL Travels · Bangalore → Hyderabad", amount: "₹650", status: "Confirmed", href: "/buses" },
  { id: "BUS7725", module: "buses", date: "2026-06-30", title: "Rahul Gupta", subtitle: "KSRTC · Mysore → Bangalore", amount: "₹190", status: "Cancelled", href: "/buses" },
  { id: "BUS7723", module: "buses", date: "2026-07-01", title: "Arun Sharma", subtitle: "Orange Travels · Chennai → Coimbatore", amount: "₹1,200", status: "Pending", href: "/buses" },
  { id: "BUS7724", module: "buses", date: "2026-07-01", title: "Priya Iyer", subtitle: "Parveen Travels · Hyderabad → Vijayawada", amount: "₹900", status: "Confirmed", href: "/buses" },
  { id: "BUS7726", module: "buses", date: "2026-07-02", title: "Meena Patel", subtitle: "Neeta Tours · Ahmedabad → Surat", amount: "₹780", status: "Confirmed", href: "/buses" },
  { id: "BUS7727", module: "buses", date: "2026-07-02", title: "Deepak Singh", subtitle: "Rajasthan Travels · Jaipur → Delhi", amount: "₹950", status: "Pending", href: "/buses" },
  { id: "BUS7728", module: "buses", date: "2026-07-04", title: "Kavita Reddy", subtitle: "IntrCity SmartBus · Bangalore → Goa", amount: "₹3,200", status: "Confirmed", href: "/buses" },

  // Hotels
  { id: "HTL00223", module: "hotels", date: "2026-06-30", title: "Vikram Nair", subtitle: "Radisson Blu · Hyderabad", amount: "₹5,800", status: "Confirmed", href: "/hotels" },
  { id: "HTL00219", module: "hotels", date: "2026-07-01", title: "Rajesh Kumar", subtitle: "Taj Palace · New Delhi", amount: "₹28,400", status: "Confirmed", href: "/hotels" },
  { id: "HTL00220", module: "hotels", date: "2026-07-02", title: "Priya Sharma", subtitle: "The Leela · Mumbai", amount: "₹42,000", status: "Confirmed", href: "/hotels" },
  { id: "HTL00222", module: "hotels", date: "2026-07-03", title: "Sneha Patel", subtitle: "Courtyard Marriott · Bangalore", amount: "₹12,600", status: "Confirmed", href: "/hotels" },
  { id: "HTL00225", module: "hotels", date: "2026-07-04", title: "Ravi Gupta", subtitle: "Hyatt Regency · Delhi", amount: "₹18,200", status: "Cancelled", href: "/hotels" },
  { id: "HTL00221", module: "hotels", date: "2026-07-05", title: "Amit Singh", subtitle: "Novotel · Goa", amount: "₹68,000", status: "Pending", href: "/hotels" },
  { id: "HTL00226", module: "hotels", date: "2026-07-07", title: "Anuj Rawat", subtitle: "Ibis Styles · Pune", amount: "₹14,400", status: "Pending", href: "/hotels" },
  { id: "HTL00224", module: "hotels", date: "2026-07-08", title: "Deepa Menon", subtitle: "Backwater Ripples · Kerala", amount: "₹38,400", status: "Confirmed", href: "/hotels" },
]

export function parseAmount(amount: string): number {
  return Number(amount.replace(/[^0-9]/g, "")) || 0
}
