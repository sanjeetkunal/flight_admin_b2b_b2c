export type FlightBooking = {
  pnr: string
  passenger: string
  email: string
  phone: string
  airline: string
  from: string
  to: string
  date: string
  depart: string
  arrive: string
  class: string
  pax: number
  amount: string
  status: "Confirmed" | "Pending" | "Cancelled"
  agent: string
  booked: string
}

export const allBookings: FlightBooking[] = [
  { pnr: "6E2847", passenger: "Rajesh Kumar", email: "rajesh.kumar@example.com", phone: "+91 98200 11234", airline: "IndiGo", from: "DEL", to: "BOM", date: "30 Jun 2026", depart: "06:20", arrive: "08:35", class: "Economy", pax: 2, amount: "₹8,450", status: "Confirmed", agent: "TravelBox", booked: "30 Jun, 09:14" },
  { pnr: "AI1045", passenger: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 98100 22345", airline: "Air India", from: "BOM", to: "DEL", date: "30 Jun 2026", depart: "13:40", arrive: "15:55", class: "Business", pax: 1, amount: "₹22,100", status: "Pending", agent: "FlyDeal", booked: "30 Jun, 08:52" },
  { pnr: "SG301", passenger: "Amit Singh", email: "amit.singh@example.com", phone: "+91 97600 33456", airline: "SpiceJet", from: "BOM", to: "GOI", date: "01 Jul 2026", depart: "09:15", arrive: "10:20", class: "Economy", pax: 4, amount: "₹14,800", status: "Confirmed", agent: "StarTravel", booked: "29 Jun, 21:30" },
  { pnr: "UK927", passenger: "Sneha Patel", email: "sneha.patel@example.com", phone: "+91 99200 44567", airline: "Vistara", from: "DEL", to: "BLR", date: "01 Jul 2026", depart: "17:30", arrive: "20:05", class: "Premium Eco", pax: 2, amount: "₹18,600", status: "Confirmed", agent: "TravelBox", booked: "29 Jun, 18:45" },
  { pnr: "IX234", passenger: "Deepa Menon", email: "deepa.menon@example.com", phone: "+91 98450 55678", airline: "Air Asia", from: "COK", to: "DEL", date: "02 Jul 2026", depart: "05:45", arrive: "09:10", class: "Economy", pax: 1, amount: "₹5,200", status: "Cancelled", agent: "QuickBook", booked: "28 Jun, 14:20" },
  { pnr: "G8502", passenger: "Vikram Nair", email: "vikram.nair@example.com", phone: "+91 98330 66789", airline: "Go First", from: "BOM", to: "DEL", date: "02 Jul 2026", depart: "11:00", arrive: "13:15", class: "Economy", pax: 3, amount: "₹11,700", status: "Confirmed", agent: "FlyDeal", booked: "28 Jun, 11:05" },
  { pnr: "6E4821", passenger: "Ravi Gupta", email: "ravi.gupta@example.com", phone: "+91 98120 77890", airline: "IndiGo", from: "DEL", to: "HYD", date: "03 Jul 2026", depart: "07:50", arrive: "10:05", class: "Economy", pax: 2, amount: "₹9,800", status: "Pending", agent: "StarTravel", booked: "27 Jun, 16:30" },
  { pnr: "AI202", passenger: "Sunita Rao", email: "sunita.rao@example.com", phone: "+91 99870 88901", airline: "Air India", from: "DEL", to: "LHR", date: "05 Jul 2026", depart: "02:30", arrive: "07:45", class: "Business", pax: 2, amount: "₹2,14,000", status: "Confirmed", agent: "TravelBox", booked: "25 Jun, 10:00" },
  { pnr: "EK501", passenger: "Anuj Rawat", email: "anuj.rawat@example.com", phone: "+91 98700 99012", airline: "Emirates", from: "BOM", to: "DXB", date: "04 Jul 2026", depart: "23:55", arrive: "01:50+1", class: "Economy", pax: 5, amount: "₹1,12,500", status: "Confirmed", agent: "QuickBook", booked: "26 Jun, 08:15" },
  { pnr: "SQ422", passenger: "Meera Iyer", email: "meera.iyer@example.com", phone: "+91 98440 10123", airline: "Singapore Air", from: "DEL", to: "SIN", date: "06 Jul 2026", depart: "15:25", arrive: "01:20+1", class: "Premium Eco", pax: 2, amount: "₹98,000", status: "Pending", agent: "FlyDeal", booked: "24 Jun, 19:40" },
]

export function getBookingByPnr(pnr: string): FlightBooking | undefined {
  return allBookings.find((b) => b.pnr.toLowerCase() === pnr.toLowerCase())
}
