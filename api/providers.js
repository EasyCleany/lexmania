const providers = [
  {
    id: "lm-101",
    name: "Kanzlei Adler & Partner",
    location: "Zürich",
    focus: ["wohnen", "arbeit"],
    responseTimeHours: 6,
    rating: 4.9,
    verified: true
  },
  {
    id: "lm-204",
    name: "Rechtsdienstleister Nord",
    location: "Basel",
    focus: ["inkasso", "betreibung", "konsum"],
    responseTimeHours: 12,
    rating: 4.7,
    verified: true
  },
  {
    id: "lm-318",
    name: "Lex Zürich West",
    location: "Zürich",
    focus: ["verkehr", "reisen", "versicherung"],
    responseTimeHours: 8,
    rating: 4.8,
    verified: true
  }
];

export default function handler(req, res) {
  const { category } = req.query ?? {};

  if (category) {
    const filtered = providers.filter((provider) => provider.focus.includes(category));
    return res.status(200).json({ providers: filtered });
  }

  return res.status(200).json({ providers });
}
