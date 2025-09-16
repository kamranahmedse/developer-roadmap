# Coroutines Behavior

Launching a coroutine from a `CoroutineScope` creates a context that governs its execution. Builder functions like `.launch()` and `.async()` automatically create a set of elements that define how the coroutine behaves, including the `Job` interface, which tracks the coroutine's lifecycle and enables structured concurrency; `CoroutineDispatcher`, which controls where the coroutine runs; and `CoroutineExceptionHandler`, which handles uncaught exceptions.

Visit the following resources to learn more:

- [@official@Coroutine concepts](https://kotlinlang.org/docs/coroutines-basics.html)
- [@video@Coroutine Contexts - Kotlin Coroutines](https://www.youtube.com/watch?v=71NrkkRNXG4)