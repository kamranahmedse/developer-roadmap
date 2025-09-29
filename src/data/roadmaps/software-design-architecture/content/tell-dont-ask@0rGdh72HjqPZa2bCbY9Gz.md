# Tell, don't ask

## 🔹 What is “Tell, Don’t Ask”?

It means:

👉 Instead of asking an object for data and then making decisions outside of it, tell the object what to do and let it handle the logic.

- Don’t pull data out of objects to make decisions.
- Do push behavior into the object itself.

This keeps logic encapsulated and objects more responsible for themselves.

Asking style (bad):

```
if (user.profile.isComplete()) {
    // allow checkout
}
```

Telling style (good):

```
if (user.canCheckout()) {
    // allow checkout
}
```

## 🔹 Why It Matters

- **Encourages encapsulation** (objects protect their own data).
- **Reduces coupling** (outside code doesn’t need to know internals).
- **Makes code easier to extend** → just change the class behavior, not every caller.
