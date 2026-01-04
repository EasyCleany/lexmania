const customers = [
  {
    id: "cust-1",
    name: "Kunde 5",
    email: "behdjb@gmail.com",
    topic: "Wohnen & Nachbarschaft",
    summary: "Lärmbelästigung und Mietsenkung",
    createdAt: "2026-01-04T09:15:00.000Z",
    status: "Gast"
  },
  {
    id: "cust-2",
    name: "Marco Test",
    email: "bwen@gmail.com",
    topic: "Konsum & Verträge",
    summary: "Widerruf und Rückerstattung",
    createdAt: "2026-01-04T11:30:00.000Z",
    status: "Gast"
  }
];

const createCustomer = ({ name, email, topic, summary }) => {
  const customer = {
    id: `cust-${Date.now()}`,
    name,
    email,
    topic,
    summary: summary ?? "",
    createdAt: new Date().toISOString(),
    status: "Gast"
  };
  customers.unshift(customer);
  return customer;
};

export { customers, createCustomer };
