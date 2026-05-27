# Coroutines Best Practices

Coroutines in Kotlin simplify asynchronous programming, but using them effectively requires following certain best practices. These include using structured concurrency to manage coroutine lifecycles and prevent leaks, avoiding `GlobalScope` for most tasks and preferring `CoroutineScope` tied to specific components, handling exceptions properly within coroutines, and offloading long-running or blocking operations to appropriate dispatchers like `Dispatchers.IO` to avoid blocking the main thread.  Additionally, it's important to cancel coroutines when they are no longer needed to free up resources and prevent unnecessary work.

Visit the following resources to learn more:

- [@article@Coroutine: Best Practices](https://medium.com/@vivekbansal19/coroutine-best-practices-affddb50ae1b)
- [@article@Best practices for coroutines in Android](https://developer.android.com/kotlin/coroutines/coroutines-best-practices)