const offers = [
  {
    id: "offer-basic",
    title: "LaL Basic",
    summary: "Orientierung & 1–2 passende Kontakte",
    priceHint: "Freemium",
    includes: ["Einmalige Orientierung", "Self-Help Checklisten", "Kontaktfreigabe"]
  },
  {
    id: "offer-plus",
    title: "LaL Plus",
    summary: "Schneller Profi-Kontakt",
    priceHint: "Servicegebühr + Link Fee",
    includes: ["Einarbeitung", "3–4 passende Kontakte", "Schnelle Rückmeldung"]
  },
  {
    id: "offer-expert",
    title: "LaL Expert",
    summary: "Komplexe Fälle & Mandatsübernahme",
    priceHint: "Premium",
    includes: ["Vollständige Beratung", "5 passende Kontakte", "Priorisierte Betreuung"]
  }
];

export default function handler(_req, res) {
  res.status(200).json({ offers });
}
