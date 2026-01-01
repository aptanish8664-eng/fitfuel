let mode = "login";

function toggleMode() {
  mode = mode === "login" ? "signup" : "login";

  document.querySelector("button").innerText =
    mode === "login" ? "Login" : "Create Account";

  document.querySelector("p button").innerText =
    mode === "login" ? "Sign up" : "Back to login";

  document.getElementById("error").innerText = "";
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (!email || !password) {
    error.innerText = "Fill all fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (mode === "signup") {
    if (users[email]) {
      error.innerText = "Account already exists.";
      return;
    }

    users[email] = {
      password,
      profile: {},
      report: null
    };

    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("activeUser", email);

    window.location.href = "dashboard.html";
    return;
  }

  // login mode
  if (!users[email] || users[email].password !== password) {
    error.innerText = "Invalid email or password.";
    return;
  }

  sessionStorage.setItem("activeUser", email);
  window.location.href = "dashboard.html";
}
