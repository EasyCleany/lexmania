const PASSWORD = "Nibero2025!!";
const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login");
const dashboardSection = document.getElementById("dashboard");
const errorText = document.getElementById("login-error");

const showDashboard = () => {
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
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
  } else {
    errorText.textContent = "Passwort falsch. Bitte erneut versuchen.";
  }

  input.value = "";
});
