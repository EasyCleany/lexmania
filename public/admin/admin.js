const PASSWORD = "Nibero2025!!";

const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login");
const dashboardSection = document.getElementById("dashboard");
const topbar = document.getElementById("portal-topbar");
const sidebar = document.getElementById("portal-sidebar");
const errorText = document.getElementById("login-error");
const customersGrid = document.getElementById("customers-grid");
const dashboardCount = document.getElementById("dashboard-count");
const dashboardSearch = document.getElementById("dashboard-search");
const dashboardTitle = document.getElementById("dashboard-title");
const requestsView = document.getElementById("requests-view");
const requestsBody = document.getElementById("requests-body");
const navItems = document.querySelectorAll(".nav-item[data-view]");
const refreshButton = document.getElementById("refresh-button");
const offerModal = document.getElementById("offer-modal");
const offerForm = document.getElementById("offer-form");
const cancelOfferButton = document.getElementById("cancel-offer");

let activeView = "customers";
let isAuthenticated = false;
let requestsCache = [];
let selectedRequestId = null;

const showDashboard = () => {
  loginSection?.classList.add("hidden");
  dashboardSection?.classList.remove("hidden");
  topbar?.classList.remove("hidden");
  sidebar?.classList.remove("hidden");
};

const showLogin = (message = "") => {
  if (errorText) {
    errorText.textContent = message;
  }
  loginSection?.classList.remove("hidden");
  dashboardSection?.classList.add("hidden");
  topbar?.classList.add("hidden");
  sidebar?.classList.add("hidden");
  offerModal?.classList.add("hidden");
};

const renderCustomers = (customers) => {
  if (!customersGrid || !dashboardCount) {
    return;
  }

  dashboardCount.textContent = customers.length;
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

const renderRequests = (requests) => {
  if (!requestsBody) {
    return;
  }

  requestsCache = requests;
  requestsBody.innerHTML = requests
    .map((request) => {
      const statusLabel = request.status || "Offen";
      const statusClass =
        statusLabel.toLowerCase() === "angefragt" ? "status-requested" : "status-open";

      return `
        <tr>
          <td>${request.name}</td>
          <td>${request.email}</td>
          <td>${request.topic}</td>
          <td>${request.summary || "Keine Notizen"}</td>
          <td>${new Date(request.createdAt).toLocaleDateString("de-CH")}</td>
          <td><span class="status-pill ${statusClass}">${statusLabel}</span></td>
          <td>
            <button class="offer-button" type="button" data-request-id="${request.id}">
              Angebot senden
            </button>
          </td>
        </tr>
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

const loadRequests = async (query = "") => {
  if (!requestsBody) {
    return;
  }

  requestsBody.innerHTML = '<tr><td colspan="7">Lade Anfragen...</td></tr>';
  const url = query ? `/api/requests?q=${encodeURIComponent(query)}` : "/api/requests";
  const response = await fetch(url);
  const data = await response.json();
  renderRequests(data.requests || []);
  if (dashboardCount) {
    dashboardCount.textContent = data.requests?.length ?? 0;
  }
};

const applyView = (view) => {
  activeView = view;
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });

  if (dashboardTitle) {
    dashboardTitle.textContent = view === "customers" ? "Kunden" : "Anfragen";
  }

  customersGrid?.classList.toggle("hidden", view !== "customers");
  requestsView?.classList.toggle("hidden", view !== "requests");

  if (dashboardSearch) {
    dashboardSearch.value = "";
  }

  if (view === "customers") {
    loadCustomers();
  } else {
    loadRequests();
  }
};

const openOfferModal = (request) => {
  if (!offerModal || !offerForm) {
    return;
  }

  selectedRequestId = request.id;
  offerForm.customerName.value = request.name;
  offerForm.customerEmail.value = request.email;
  offerForm.customerTopic.value = request.topic;
  offerForm.offerPrice.value = "";
  offerForm.offerLawyer.value = "";
  offerForm.offerContact.value = "";
  offerForm.offerNote.value = "";
  offerModal.classList.remove("hidden");
  offerModal.setAttribute("aria-hidden", "false");
};

const closeOfferModal = () => {
  if (!offerModal) {
    return;
  }
  offerModal.classList.add("hidden");
  offerModal.setAttribute("aria-hidden", "true");
  selectedRequestId = null;
};

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = loginForm.querySelector("input[name='password']");
  if (!input) {
    return;
  }

  if (input.value === PASSWORD) {
    isAuthenticated = true;
    showDashboard();
    applyView("customers");
    errorText.textContent = "";
  } else {
    showLogin("Passwort falsch. Bitte erneut versuchen.");
  }

  input.value = "";
});

dashboardSearch?.addEventListener("input", (event) => {
  if (activeView === "customers") {
    loadCustomers(event.target.value);
  } else {
    loadRequests(event.target.value);
  }
});

refreshButton?.addEventListener("click", () => {
  if (activeView === "customers") {
    loadCustomers(dashboardSearch?.value || "");
  } else {
    loadRequests(dashboardSearch?.value || "");
  }
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!isAuthenticated) {
      showLogin("Bitte zuerst einloggen.");
      return;
    }
    applyView(item.dataset.view);
  });
});

requestsBody?.addEventListener("click", (event) => {
  const button = event.target.closest(".offer-button");
  if (!button) {
    return;
  }
  const requestId = button.dataset.requestId;
  const request = requestsCache.find((item) => item.id === requestId);
  if (request) {
    openOfferModal(request);
  }
});

cancelOfferButton?.addEventListener("click", closeOfferModal);

offerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!selectedRequestId) {
    return;
  }

  const requestIndex = requestsCache.findIndex((item) => item.id === selectedRequestId);
  if (requestIndex === -1) {
    return;
  }

  requestsCache[requestIndex] = {
    ...requestsCache[requestIndex],
    status: "Angefragt"
  };

  renderRequests(requestsCache);
  closeOfferModal();
  alert("Angebot gesendet. Der Gast erhält eine E-Mail mit den Offertedaten.");
});

showLogin("");
