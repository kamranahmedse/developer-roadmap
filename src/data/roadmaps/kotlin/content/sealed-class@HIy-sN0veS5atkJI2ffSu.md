# Sealed Class

A sealed class in Kotlin represents a restricted class hierarchy. It's used when a value can have one of a limited set of types, but no other types. Essentially, it's an abstract class that restricts which classes can inherit from it. All subclasses of a sealed class must be declared in the same file as the sealed class itself. This restriction enables the compiler to know all possible subtypes at compile time, allowing for exhaustive `when` expressions.

Visit the following resources to learn more:

- [@official@Sealed classes and interfaces](https://kotlinlang.org/docs/sealed-classes.html)
- [@video@Sealed classes - Kotlin Vocabulary](https://www.youtube.com/watch?v=OyIRuxjBORY)
- [@video@Sealed Classes VS. Enum Classes VS. Sealed Interfaces - When to Use Which?](https://www.youtube.com/watch?v=kLJRZpRhX1o)