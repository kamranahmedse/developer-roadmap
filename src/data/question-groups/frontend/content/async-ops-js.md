There are 4 main ways in which JavaScript allows developers to handle asynchronous calls. In the end, the result is always the same, but the final structure of the code and the way to reason about it is considerably different.

- **Callbacks**. They allow you to set up a function to be called directly once the asynchronous operation is done.
- **Promises**. Promises represent the eventual completion of an asynchronous operation, and they provide a simpler and more intuitive syntax to specify callbacks to be called on success and failure of the operation.
- **Async/Await**. The final evolution of the promises syntax. It’s mainly syntactic sugar, but it makes asynchronous code look synchronous, which in turn makes it a lot easier to read and reason about.
- **Event listeners**. Event listeners are callbacks that get triggered when specific events are fired (usually due to user interactions).
