# Proactor

The **Proactor** pattern is an event-driven application design pattern used in asynchronous programming, and is a variant of the Reactor Pattern, but with an important distinction in terms of control flow handling. Instead of the application explicitly triggering and managing operations, this responsibility is delegated to the asynchronous operation processor, also known as the proactor. The proactor initiates an asynchronous operation, and once the operation is complete, it determines the appropriate service to dispatch the completion event to. In other words, proactors are responsible for initiating asynchronous operations, while completion handlers are responsible for dictating what happens next, after the operations complete.

Visit the following resources to learn more:

- [@article@Proactor pattern - Wikipedia](https://en.wikipedia.org/wiki/Proactor_pattern)
- [@article@The Proactor Design Pattern: Concurrency Without Threads - Boost.Asio](https://www.boost.org/doc/libs/latest/doc/html/boost_asio/overview/core/async.html)
- [@article@If the Proactor Design Pattern is superior for asynchronous I/O - Stack Overflow](https://stackoverflow.com/questions/54798087/if-the-proactor-design-pattern-is-superior-for-asyncronous-i-o-why-isnt-it-def)
