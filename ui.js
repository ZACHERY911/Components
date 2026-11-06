// The UI program: it only uses SavingsJar through its public interface.
import { SavingsJar } from "./SavingsJar.js";

const jarsEl = document.getElementById("jars");
const form = document.getElementById("create-form");
const formError = document.getElementById("form-error");

// Build one card on the page for one jar instance
function addJarCard(name, goal) {
  const jar = new SavingsJar(name, goal); // may throw if the settings are invalid

  const card = document.createElement("section");
  card.className = "jar";
  card.innerHTML = `
    <h2></h2>
    <p class="balance"></p>
    <div class="bar"><div class="fill"></div></div>
    <div class="row">
      <input type="number" min="1" placeholder="Amount">
      <button class="deposit">Deposit</button>
      <button class="withdraw secondary">Withdraw</button>
    </div>
    <p class="msg"></p>
  `;
  card.querySelector("h2").textContent = name;

  const balanceEl = card.querySelector(".balance");
  const fillEl = card.querySelector(".fill");
  const amountEl = card.querySelector("input");
  const msgEl = card.querySelector(".msg");

  function show(text, type = "") {
    msgEl.textContent = text;
    msgEl.className = "msg " + type;
  }

  // Redraw the card from the component's read-only properties
  function refresh() {
    balanceEl.textContent = `Balance: ${jar.balance} / ${goal} (${jar.progress}%)`;
    fillEl.style.width = jar.progress + "%";
    card.classList.toggle("done", jar.progress >= 100);
  }

  // React to the component's events
  jar.on("goalReached", () => show("🎉 Goal reached!", "good"));
  jar.on("withdrawFailed", (e) => show(`Only ${e.balance} in the jar, can't take ${e.wanted}.`, "bad"));

  card.querySelector(".deposit").addEventListener("click", () => {
    show("");
    try {
      jar.deposit(amountEl.valueAsNumber);
    } catch (err) {
      show(err.message, "bad");
    }
    refresh();
    amountEl.value = "";
  });

  card.querySelector(".withdraw").addEventListener("click", () => {
    show("");
    try {
      jar.withdraw(amountEl.valueAsNumber);
    } catch (err) {
      show(err.message, "bad");
    }
    refresh();
    amountEl.value = "";
  });

  refresh();
  jarsEl.prepend(card);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formError.textContent = "";
  try {
    addJarCard(
      document.getElementById("jar-name").value.trim(),
      Number(document.getElementById("jar-goal").value)
    );
    form.reset();
  } catch (err) {
    formError.textContent = err.message;
  }
});

// Two starter jars to show reuse straight away
addJarCard("Holiday Trip", 1000);
addJarCard("New Phone", 500);
