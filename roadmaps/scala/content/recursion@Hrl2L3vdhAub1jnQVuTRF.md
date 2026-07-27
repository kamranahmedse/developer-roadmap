# Recursion basics

Recursion is a fundamental concept in computer science and mathematics where a function or process calls itself as part of its execution. This approach is particularly useful for tasks that can be defined in terms of similar subtasks, such as traversing tree structures, calculating factorials, or solving problems that exhibit self-similarity. In Scala, recursion is supported on many levels. It is possible for a function to recursively call itself. Additionally, the Scala compiler uses tail recursion to rewrite a subset of recursive functions into flat loops, and the Scala standard library contains "trampolines" - a mechanism to simulate recursion without the risk of stack overflow. On top of that, Scala pattern matching helps to write recursive functions in a readable way, and implicit parameters help to keep the code concise.

Visit the following resources to learn more:

- [@article@Scala Recursion Functions](https://www.tutorialspoint.com/scala/recursion_functions.htm)
- [@article@Simple Scala recursion examples (recursive programming) | alvinalexander.com](https://alvinalexander.com/scala/scala-recursion-examples-recursive-programming/)
- [@article@Scala Tutorial | Tail Recursion](https://www.scala-exercises.org/scala_tutorial/tail_recursion)