const PASSWORD = "Nibero2025!!";
const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login");
const dashboardSection = document.getElementById("dashboard");
const errorText = document.getElementById("login-error");
const customersGrid = document.getElementById("customers-grid");
const customerCount = document.getElementById("customer-count");
const customerSearch = document.getElementById("customer-search");

const showDashboard = () => {
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
};

const renderCustomers = (customers) => {
  if (!customersGrid || !customerCount) {
    return;
  }

  customerCount.textContent = customers.length;
  customersGrid.innerHTML = customers
    .map((customer) => {
      const initials = customer.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return `
        <article class="customer-card">
          <div class="avatar">${initials || "LM"}</div>
          <div>
            <strong>${customer.name}</strong>
            <div class="customer-meta">${customer.email}</div>
          </div>
          <div class="customer-meta">${customer.topic}</div>
          <div class="customer-meta">${customer.summary || "Keine Notizen"}</div>
          <div class="customer-footer">
            <span class="customer-status">
              <span class="status-dot"></span>
              ${customer.status}
            </span>
            <span class="customer-meta">${new Date(customer.createdAt).toLocaleDateString(
              "de-CH"
            )}</span>
          </div>
        </article>
      `;
    })
    .join("");
};

const loadCustomers = async (query = "") => {
  if (!customersGrid) {
    return;
  }

  customersGrid.innerHTML = "<p>Lade Kunden...</p>";
  const url = query ? `/api/customers?q=${encodeURIComponent(query)}` : "/api/customers";
  const response = await fetch(url);
  const data = await response.json();
  renderCustomers(data.customers || []);
};

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = loginForm.querySelector("input[name='password']");
  if (!input) {
    return;
  }

  if (input.value === PASSWORD) {
    errorText.textContent = "";
    showDashboard();
    loadCustomers();
  } else {
    errorText.textContent = "Passwort falsch. Bitte erneut versuchen.";
  }

  input.value = "";
});

customerSearch?.addEventListener("input", (event) => {
  loadCustomers(event.target.value);
});
