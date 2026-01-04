import { createCustomer } from "./dataStore.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const { name, email, topic, summary } = req.body ?? {};

  if (!name || !email || !topic) {
    return res.status(400).json({
      status: "error",
      message: "name, email und topic sind erforderlich"
    });
  }

  const customer = createCustomer({ name, email, topic, summary });

  return res.status(201).json({
    status: "received",
    reference: `LM-${Date.now()}`,
    customer,
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
}
