# Coroutine Builders

Coroutine builders in Kotlin are functions that start a new coroutine. They bridge the gap between regular, blocking code and the non-blocking, concurrent world of coroutines. Common builders include `launch`, which starts a coroutine without blocking the current thread and returns a `Job`, and `runBlocking`, which blocks the current thread until the coroutine completes, primarily used for testing and main functions. Another builder, `async`, starts a coroutine and returns a `Deferred` object, which represents a future result. These builders allow you to execute code concurrently and manage the lifecycle of coroutines.

Visit the following resources to learn more:

- [@official@Coroutines basics](https://kotlinlang.org/docs/coroutines-basics.html#your-first-coroutine)
- [@article@Kotlin Coroutine builders](https://medium.com/@appdevinsights/kotlin-coroutine-builders-6a6639cc478d)