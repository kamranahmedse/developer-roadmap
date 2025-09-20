# Safe Casts

Safe casts in Kotlin provide a way to convert a variable of one type to another, but unlike regular casts, they handle the possibility of the cast failing gracefully. Instead of throwing a `ClassCastException` if the cast is not possible, a safe cast returns `null`. This allows you to safely attempt a type conversion and handle the case where the object is not of the expected type without crashing your program.

Visit the following resources to learn more:

- [@official@Safe casts](https://kotlinlang.org/docs/null-safety.html#safe-casts)
- [@video@Kotlin Safe Casting with 'as?'](https://www.youtube.com/watch?v=3ZvJb_f9jrU)