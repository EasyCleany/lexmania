import { requests } from "./dataStore.js";

export default function handler(req, res) {
  const { q } = req.query ?? {};
  const search = q?.toLowerCase() ?? "";

  if (!search) {
    return res.status(200).json({ requests });
  }

  const filtered = requests.filter((request) => {
    return (
      request.name.toLowerCase().includes(search) ||
      request.email.toLowerCase().includes(search) ||
      request.topic.toLowerCase().includes(search) ||
      request.summary.toLowerCase().includes(search)
    );
  });

  return res.status(200).json({ requests: filtered });
}
