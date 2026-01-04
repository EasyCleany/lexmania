import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "lexmania-backend" });
});

app.post("/api/intake", (req, res) => {
  const { name, email, topic, summary } = req.body ?? {};

  if (!name || !email || !topic) {
    return res.status(400).json({
      status: "error",
      message: "name, email und topic sind erforderlich"
    });
  }

  return res.status(201).json({
    status: "received",
    reference: `LM-${Date.now()}`,
    nextSteps: [
      "Fallprüfung durch AI Lexy",
      "Matching mit passenden Dienstleistern",
      "Kontaktaufnahme innerhalb von 24h"
    ],
    summary: summary ?? ""
  });
});

app.listen(port, () => {
  console.log(`lexmania backend listening on :${port}`);
});
