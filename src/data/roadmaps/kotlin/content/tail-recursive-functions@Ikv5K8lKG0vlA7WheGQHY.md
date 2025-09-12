# Tail-recursive Functions

Kotlin supports a style of functional programming known as tail recursion. For some algorithms that would normally use loops, you can use a recursive function instead without the risk of stack overflow. When a function is marked with the tailrec modifier and meets the required formal conditions, the compiler optimizes out the recursion, leaving behind a fast and efficient loop based version instead.

Visit the following resources to learn more:

- [@official@Tail-recursive Functions](https://kotlinlang.org/docs/functions.html#tail-recursive-functions)
- [@article@Kotlin Recursion (Recursive Function) and Tail Recursion](https://www.programiz.com/kotlin-programming/recursion)