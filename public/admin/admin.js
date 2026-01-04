const homeView = document.getElementById("home-view");
const dashboardSection = document.getElementById("dashboard");
const customersGrid = document.getElementById("customers-grid");
const customerCount = document.getElementById("customer-count");
const customerSearch = document.getElementById("customer-search");
const dashboardTitle = document.getElementById("dashboard-title");
const requestsView = document.getElementById("requests-view");
const requestsBody = document.getElementById("requests-body");
const navItems = document.querySelectorAll(".nav-item[data-view]");

let activeView = "customers";

const showDashboard = () => {
  if (homeView) {
    homeView.classList.add("hidden");
  }
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

const renderRequests = (requests) => {
  if (!requestsBody) {
    return;
  }

  requestsBody.innerHTML = requests
    .map((request) => {
      return `
        <tr>
          <td>${request.name}</td>
          <td>${request.email}</td>
          <td>${request.topic}</td>
          <td>${request.summary || "Keine Notizen"}</td>
          <td>${new Date(request.createdAt).toLocaleDateString("de-CH")}</td>
          <td>${request.status}</td>
        </tr>
      `;
    })
    .join("");
};

const loadRequests = async (query = "") => {
  if (!requestsBody) {
    return;
  }

  requestsBody.innerHTML = "<tr><td colspan=\"6\">Lade Anfragen...</td></tr>";
  const url = query ? `/api/requests?q=${encodeURIComponent(query)}` : "/api/requests";
  const response = await fetch(url);
  const data = await response.json();
  renderRequests(data.requests || []);
  if (customerCount) {
    customerCount.textContent = data.requests?.length ?? 0;
  }
};

const switchView = (view) => {
  activeView = view;
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });

  if (dashboardTitle) {
    dashboardTitle.textContent = view === "customers" ? "Kunden" : "Anfragen";
  }

  if (customersGrid) {
    customersGrid.classList.toggle("hidden", view !== "customers");
  }

  if (requestsView) {
    requestsView.classList.toggle("hidden", view !== "requests");
  }

  if (customerSearch) {
    customerSearch.value = "";
  }

  showDashboard();
  if (view === "customers") {
    loadCustomers();
  } else {
    loadRequests();
  }
};

customerSearch?.addEventListener("input", (event) => {
  if (activeView === "customers") {
    loadCustomers(event.target.value);
  } else {
    loadRequests(event.target.value);
  }
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    switchView(item.dataset.view);
  });
});
