# Law of Demeter

Also called “Principle of Least Knowledge”, it states:

In Practice
-----------

*   Avoid chaining calls deep into the internals of other objects.
*   Restrict communication to objects you directly manage.

### 🔹 ❌ Bad Example (Violation)

    // Controller
    total = order.customer.address.getRegionTaxRate() * order.amount
    

### 🔹 ✅ Good Example

    // Controller
    total = order.calculateTotal()
    

🔹 Why It Matters
-----------------

*   **Reduces coupling** → fewer dependencies between classes.
*   **Increases maintainability** → changes in one class don’t affect distant classes.
*   **Improves readability** → clear boundaries of responsibility.

🔹 Resources
------------

Visit the following resources to learn more:

- [@article@@Article: Law of Demeter Explained](https://en.wikipedia.org/wiki/Law_of_Demeter)