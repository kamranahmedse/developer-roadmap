# Flow

`Flow` in Android development is part of the Kotlin Coroutines library. It is a type that can emit multiple values sequentially, making it perfect for working with any data streams or any streams of events that aren't instantaneous. Like Observables, `Flow` is also based on the observer pattern, meaning it can emit values and these emissions can be observed and reacted to. However, `Flow` comes with built-in back pressure handling and the ability to transform, filter, or combine these flows in a sequence. Along with Coroutines, `Flow` encourages a more predictable and simplified concurrency design without callback hell problem.

Visit the following resources to learn more:

- [@official@Flow](https://kotlinlang.org/docs/flow.html)
- [@official@Flow: Coroutines](https://kotlinlang.org/docs/flow-coroutines.html)
