// The HOST PROGRAM: it only uses the component through its public interface.
import { SavingsJar } from "./SavingsJar.js";

// Two jars from the SAME component, with different settings
const phoneJar = new SavingsJar("New Phone", 500);
const tripJar = new SavingsJar("Holiday Trip", 1000);

// The host program decides what happens when events fire
phoneJar.on("goalReached", (e) => console.log(`  🎉 "${e.name}" goal reached! Balance: ${e.balance}`));
phoneJar.on("withdrawFailed", (e) => console.log(`  ✗ Can't take ${e.wanted} from "${e.name}", only ${e.balance} inside`));
tripJar.on("goalReached", (e) => console.log(`  🎉 "${e.name}" goal reached!`));

console.log("--- Phone jar ---");
phoneJar.deposit(200);
console.log("  Balance:", phoneJar.balance, "| Progress:", phoneJar.progress + "%");
phoneJar.deposit(300);                 // reaches the goal -> event fires
phoneJar.withdraw(1000);               // too much -> event fires
phoneJar.withdraw(100);
console.log("  Balance:", phoneJar.balance, "| Progress:", phoneJar.progress + "%");

console.log("--- Trip jar (independent from the phone jar) ---");
tripJar.deposit(250);
console.log("  Balance:", tripJar.balance, "| Progress:", tripJar.progress + "%");

console.log("--- Encapsulation check ---");
try {
  phoneJar.balance = 999999;           // tries to cheat...
} catch (err) {
  console.log("  Cheating blocked: balance is read-only");
}
console.log("  Balance is still:", phoneJar.balance);
