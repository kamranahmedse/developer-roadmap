Without a full framework or library like React or Vue.js, properly handling state management is not a trivial task.

Some options available through the language itself are:

- **Global Variables**: You can use global variables, or perhaps a global object to centralize state. The problem with this approach is that it can become quite unmanageable for large applications. It’s also a lot harder to maintain local state inside single components.
- **Module Pattern**: You can use this pattern to encapsulate state and provide a clear API to manage it. You would have to instantiate local instances of these modules for individual components.
- **Pub/Sub Pattern**: This option is more sophisticated, and it decouples state changes using event-driven architecture. It’s a more complex solution, but it provides a bigger flexibility.
- **State Management Libraries**: You can always use something like [Redux](https://redux.js.org/) or similar libraries without frameworks.
