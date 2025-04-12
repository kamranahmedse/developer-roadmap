# Futures

Futures in Flutter are a way of representing a potential value that will be available at some point in the future. Some key points about Futures in Flutter:

- Futures are used for asynchronous programming in Flutter
- Futures return a single value (or an error) and are often used with `async` and `await`.
- The `then` method can be used to attach a callback to a Future that will be executed once the Future's value is available
- Futures can be combined with other Futures using `Future.wait` or `Future.whenComplete` methods
- Futures are often used with network requests, file I/O operations, and other long-running tasks in Flutter.

Learn more from the following resources:

- [@official@Futures and Error handling](https://dart.dev/guides/libraries/futures-error-handling)
