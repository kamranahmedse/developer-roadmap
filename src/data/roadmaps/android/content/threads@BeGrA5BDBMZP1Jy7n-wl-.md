# Threads

In Android, a `Thread` is a concurrent unit of execution. It has its own call stack, but can share its state with other threads in the same process, i.e., they can share the same memory area. They're primarily used in Android to perform operations in the background. One important aspect to note is that Android UI operations are not thread-safe, meaning they should always be done on the UI thread. Operations on `Threads` are typically managed through `Handler`, `Looper` and `MessageQueue` classes. Android also provides high-level constructs like `AsyncTask` and `Loader` for managing threads in relation to the UI.

Visit the following resources to learn more:

- [@official@Threads](https://developer.android.com/guide/components/processes-and-threads)
