const usernameInput = document.getElementById("username");
const betAmountInput = document.getElementById("betAmount");
const betButtons = document.getElementById("betButtons");
const allBets = document.getElementById("allBets");
const result = document.getElementById("result");
const clearBetsBtn = document.getElementById("clearBetsBtn");

let username = "";

const quotes = {
  "Lars Schneider": 4.66,
  "Yannick Oberli": 4.78,
  "Fynn Roth": 8.95,
  "Cedric Buri": 2.84,
  "Cedric Oberli": 7.70,
  "Ivan Wittwer": 6.95,
  "Michael Gugger": 8.95,
  "Naïm Büchi": 8.95,
  "Florin Suter": 38.95,
  "Noel Muralt": 38.95,
  "Elia Dubach": 13.95,
  "Dominic Hofer": 16.45,
  "Justin Martinjas": 18.95,
  "Yannick Hirschi": 28.95,
  "Luan Richner": 23.95,
  "Elia Dübi": 28.95
};

// === NAME SPEICHERN BEI EINGABE ===
usernameInput.addEventListener("input", () => {
  username = usernameInput.value.trim();
  localStorage.setItem("username", username);
  checkAdmin();
  loadBets();
});

// === BUTTONS GENERIEREN ===
function renderBetOptions() {
  betButtons.innerHTML = "";
  const amount = parseFloat(betAmountInput.value) || 0;

  Object.entries(quotes).forEach(([name, quote]) => {
    const win = amount ? (quote * amount).toFixed(2) + " CHF" : "–";
    const btn = document.createElement("button");
    btn.className = "betOption";
    btn.innerHTML = `<strong>${name}</strong> – Quote: ${quote} | Gewinn: ${win}`;
    btn.addEventListener("click", () => {
      if (!username) {
        alert("Bitte gib zuerst deinen Namen ein!");
        return;
      }
      const userBet = { name: username, bet: name };
      saveBet(userBet);
      result.innerHTML = `<p>✅ Du hast auf <b>${name}</b> getippt!</p>`;
      result.classList.remove("hidden");
      loadBets();
    });
    betButtons.appendChild(btn);
  });
}

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
  const amount = parseFloat(betAmountInput.value) || 0;

  bets.forEach((b) => {
    const quote = quotes[b.bet] || 0;
    const win = amount ? (quote * amount).toFixed(2) + " CHF" : "–";
    const li = document.createElement("li");
    li.innerHTML = `<strong>${b.name}</strong>: ${b.bet} – Gewinn: <span class="win">${win}</span>`;
    allBets.appendChild(li);
  });
}

// === ADMIN-FUNKTION ===
function checkAdmin() {
  if (username.toLowerCase() === "chlous") {
    clearBetsBtn.classList.remove("hidden");
  } else {
    clearBetsBtn.classList.add("hidden");
  }
}

clearBetsBtn.addEventListener("click", () => {
  if (confirm("Willst du wirklich alle Tipps löschen?")) {
    localStorage.removeItem("bets");
    loadBets();
    alert("Alle Tipps wurden gelöscht!");
  }
});

// === GEWINN BERECHNEN BEI EINGABE ===
betAmountInput.addEventListener("input", () => {
  renderBetOptions();
  loadBets();
});

// === SEITE LADEN ===
window.addEventListener("load", () => {
  username = localStorage.getItem("username") || "";
  usernameInput.value = username;
  checkAdmin();
  renderBetOptions();
  loadBets();
});

usernameInput.addEventListener("input", () => {
  username = usernameInput.value.trim();
  localStorage.setItem("username", username);
  checkAdmin();
  loadBets();
});


