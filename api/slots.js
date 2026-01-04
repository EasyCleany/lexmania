const slots = [
  {
    id: "slot-1",
    date: "2026-01-06",
    time: "09:00",
    durationMinutes: 30,
    providerId: "lm-101",
    location: "Zürich"
  },
  {
    id: "slot-2",
    date: "2026-01-06",
    time: "14:00",
    durationMinutes: 45,
    providerId: "lm-318",
    location: "Zürich"
  },
  {
    id: "slot-3",
    date: "2026-01-07",
    time: "11:00",
    durationMinutes: 30,
    providerId: "lm-204",
    location: "Basel"
  }
];

export default function handler(req, res) {
  const { providerId } = req.query ?? {};

  if (providerId) {
    const filtered = slots.filter((slot) => slot.providerId === providerId);
    return res.status(200).json({ slots: filtered });
  }

  return res.status(200).json({ slots });
}
