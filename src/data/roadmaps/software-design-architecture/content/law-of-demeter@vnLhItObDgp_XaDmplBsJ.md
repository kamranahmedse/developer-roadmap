# Law of Demeter

# What is the Law of Demeter?

Also called “Principle of Least Knowledge”, it says:

A method should only talk to its immediate friends, not strangers.

## In Practice

- Don’t chain deep calls into other objects’ internals.
- Keep communication local to what you directly own.

## 🔹 ❌ Bad Example (Violation)

```
// Controller
total = order.customer.address.getRegionTaxRate() * order.amount
```

## 🔹 ✅ Good Example (Following LoD)

Controller becomes simple:

```
// Controller
total = order.calculateTotal()
```

## 🔹 Why It Matters

- **Reduces coupling** → fewer dependencies between classes.
- **Increases maintainability** → changes in one class don’t break faraway classes.
- **Improves readability** → you know who talks to who.
