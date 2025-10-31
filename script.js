const usernameInput = document.getElementById("username");
const betAmountInput = document.getElementById("betAmount");
const betButtons = document.getElementById("betButtons");
const allBets = document.getElementById("allBets");
const result = document.getElementById("result");
const clearBetsBtn = document.getElementById("clearBetsBtn");

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

function renderBetOptions() {
  betButtons.innerHTML = "";
  const amount = parseFloat(betAmountInput.value) || 0;

  Object.entries(quotes).forEach(([name, quote]) => {
    const win = amount ? (quote * amount).toFixed(2) + " CHF" : "–";
    const btn = document.createElement("button");
    btn.className = "betOption";
    btn.innerHTML = `<strong>${name}</strong> – Quote: ${quote} | Gewinn: ${win}`;
    btn.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (!username) return alert("Bitte gib deinen Namen ein!");
      const userBet = { name: username, bet: name, approved: false };
      saveBet(userBet);
      result.innerHTML = `<p>✅ Du hast auf <b>${name}</b> getippt!</p>`;
      result.classList.remove("hidden");
      loadBets();
      checkAdmin(username);
    });
    betButtons.appendChild(btn);
  });
}

function saveBet(userBet) {
  let bets = JSON.parse(localStorage.getItem("bets") || "[]");
  const existing = bets.find((b) => b.name === userBet.name);
  if (existing) {
    existing.bet = userBet.bet;
    existing.approved = existing.approved || false;
  } else {
    bets.push(userBet);
  }
  localStorage.setItem("bets", JSON.stringify(bets));
}

function loadBets() {
  let bets = JSON.parse(localStorage.getItem("bets") || "[]");
  allBets.innerHTML = "";
  const amount = parseFloat(betAmountInput.value) || 0;
  const username = usernameInput.value.trim().toLowerCase();

  bets.forEach((b) => {
    const quote = quotes[b.bet] || 0;
    const win = amount ? (quote * amount).toFixed(2) + " CHF" : "–";
    const li = document.createElement("li");
    const approvedIcon = b.approved ? "✅" : "";
    li.innerHTML = `<strong>${b.name}</strong>: ${b.bet} – Gewinn: <span class="win">${win}</span> ${approvedIcon}`;

    if (username === "chlous" && !b.approved) {
      const approveBtn = document.createElement("button");
      approveBtn.textContent = "✔ Genehmigen";
      approveBtn.className = "adminBtn";
      approveBtn.style.marginLeft = "10px";
      approveBtn.onclick = ()
