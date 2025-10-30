const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const betSection = document.getElementById("betSection");
const allBets = document.getElementById("allBets");
const betOptions = document.querySelectorAll(".betOption");
const result = document.getElementById("result");
const clearBetsBtn = document.getElementById("clearBetsBtn");

let username = "";

// === LOGIN ===
loginBtn.addEventListener("click", () => {
  username = usernameInput.value.trim();
  if (!username) return alert("Bitte gib einen Namen ein!");
  localStorage.setItem("username", username);
  document.querySelector(".login").classList.add("hidden");
  betSection.classList.remove("hidden");
  loadBets();
  checkAdmin();
});

// === WETTE ABGEBEN ===
betOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.innerText;
    const userBet = { name: username, bet: choice };
    saveBet(userBet);
    result.innerHTML = `<p>✅ Du hast auf <b>${choice}</b> getippt!</p>`;
    result.classList.remove("hidden");
    loadBets();
  });
});

// === SPEICHERN DER TIPP-DATEN ===
function saveBet(userBet) {
  let bets = JSON.parse(localStorage.getItem("bets") || "[]");
  const existing = bets.find((b) => b.name === userBet.name);
  if (existing) existing.bet = userBet.bet;
  else bets.push(userBet);
  localStorage.setItem("bets", JSON.stringify(bets));
}

// === LADEN DER TIPP-LISTE ===
function loadBets() {
  let bets = JSON.parse(localStorage.getItem("bets") || "[]");
  allBets.innerHTML = "";
  bets.forEach((b) => {
    const li = document.createElement("li");
    li.textContent = `${b.name}: ${b.bet}`;
    allBets.appendChild(li);
  });
}

// === ADMIN-FUNKTION ===
function checkAdmin() {
  // Admin ist Chlous (Gross-/Kleinschreibung egal)
  if (username.toLowerCase() === "chlous") {
    clearBetsBtn.classList.remove("hidden");
  }
}

// Klick auf Admin-Button: Alle Tipps löschen
clearBetsBtn.addEventListener("click", () => {
  if (confirm("Willst du wirklich alle Tipps löschen?")) {
    localStorage.removeItem("bets");
    loadBets();
    alert("Alle Tipps wurden gelöscht!");
  }
});

// === AUTOMATISCHER LOGIN BEIM NEULADEN ===
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("username");
  if (savedName) {
    username = savedName;
    document.querySelector(".login").classList.add("hidden");
    betSection.classList.remove("hidden");
    loadBets();
    checkAdmin();
  }
});
