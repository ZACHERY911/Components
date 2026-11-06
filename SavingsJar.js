/**
 * SavingsJar - a small reusable component.
 * You set a goal, put money in, take money out, and it tells you
 * when the goal is reached.
 *
 * PROVIDED INTERFACE
 *   Config     : name, goal                    (set in the constructor)
 *   Properties : balance, progress             (read-only)
 *   Methods    : deposit(), withdraw(), on()
 *   Events     : goalReached, withdrawFailed
 *
 * Everything else is PRIVATE (hidden inside the component).
 */
export class SavingsJar {
  // ---------- private state (encapsulation) ----------
  #balance = 0;
  #name;
  #goal;
  #goalReached = false;
  #listeners = { goalReached: [], withdrawFailed: [] };

  constructor(name, goal) {
    if (!name || typeof goal !== "number" || goal <= 0) {
      throw new Error("A jar needs a name and a goal above 0");
    }
    this.#name = name;
    this.#goal = goal;
  }

  // ---------- read-only properties ----------
  get balance() {
    return this.#balance;
  }

  get progress() {
    return Math.min(100, Math.round((this.#balance / this.#goal) * 100));
  }

  // ---------- public methods ----------
  deposit(amount) {
    if (!(amount > 0)) throw new Error("Deposit must be more than 0");
    this.#balance += amount;

    if (this.#balance >= this.#goal && !this.#goalReached) {
      this.#goalReached = true;
      this.#emit("goalReached", { name: this.#name, balance: this.#balance });
    }
  }

  withdraw(amount) {
    if (!(amount > 0)) throw new Error("Withdrawal must be more than 0");
    if (amount > this.#balance) {
      this.#emit("withdrawFailed", { name: this.#name, wanted: amount, balance: this.#balance });
      return false;
    }
    this.#balance -= amount;
    if (this.#balance < this.#goal) this.#goalReached = false;
    return true;
  }

  // ---------- event interface ----------
  on(eventName, handler) {
    if (!this.#listeners[eventName]) throw new Error(`Unknown event: ${eventName}`);
    this.#listeners[eventName].push(handler);
  }

  // ---------- private helper ----------
  #emit(eventName, data) {
    this.#listeners[eventName].forEach((handler) => handler(data));
  }
}
