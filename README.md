# SavingsJar: Component Programming Assignment (SCO 310)

A reusable JavaScript component, used by two different programs.

## Files
| File | Role |
|---|---|
| `SavingsJar.js` | **The component** |
| `main.js` | Program 1: console program that uses the component |
| `index.html`, `ui.js`, `style.css` | Program 2: website that uses the same component |
| `package.json` | Marks the project as ES modules (`"type": "module"`) |

## The component
- **Config:** `new SavingsJar(name, goal)`
- **Read-only properties:** `balance`, `progress`
- **Methods:** `deposit(amount)`, `withdraw(amount)`, `on(event, handler)`
- **Events:** `goalReached`, `withdrawFailed`
- **Private (hidden):** `#balance`, `#goal`, `#name`, `#goalReached`, `#listeners`, `#emit()`

## How it demonstrates component concepts
- **Encapsulation:** state is private; `balance` is read-only.
- **Defined interface:** only the methods, properties and events above are exposed.
- **Reusability:** two jars from one component; used by a console program and a web page without changing the component.
- **Independence:** separate module that knows nothing about its users.
- **Event-based communication:** the component announces events; the host program decides how to react.

## How to run
Requires Node.js.

**Console program**
```
node main.js
```

**Website** (must be served, not opened as a plain file)
- VS Code: install *Live Server*, right-click `index.html` > *Open with Live Server*
- or in the folder run `npx serve` and open the link shown
