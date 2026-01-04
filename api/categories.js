const categories = [
  {
    id: "wohnen",
    label: "Wohnen & Nachbarschaft",
    description: "Miete, Hausordnung, Lärm, Nachbarschaftskonflikte"
  },
  {
    id: "inkasso",
    label: "Mahnungen & Inkasso",
    description: "Zahlungsaufforderungen, Gebühren, Inkassofälle"
  },
  {
    id: "betreibung",
    label: "Betreibungen",
    description: "Betreibungsbegehren, Rechtsvorschlag, Kosten"
  },
  {
    id: "konsum",
    label: "Konsum & Verträge",
    description: "Kaufrecht, Abos, Widerruf, Vertragsprüfung"
  },
  {
    id: "verkehr",
    label: "Verkehr & Reisen",
    description: "Verkehrsunfälle, Flugverspätungen, Reiserecht"
  },
  {
    id: "arbeit",
    label: "Arbeit & Versicherung",
    description: "Kündigung, Lohn, Arbeitszeugnis, Versicherungen"
  }
];

export default function handler(_req, res) {
  res.status(200).json({ categories });
}
