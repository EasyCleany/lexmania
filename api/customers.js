import { customers } from "./dataStore.js";

export default function handler(req, res) {
  const { q } = req.query ?? {};
  const search = q?.toLowerCase() ?? "";

  if (!search) {
    return res.status(200).json({ customers });
  }

  const filtered = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.topic.toLowerCase().includes(search)
    );
  });

  return res.status(200).json({ customers: filtered });
}
