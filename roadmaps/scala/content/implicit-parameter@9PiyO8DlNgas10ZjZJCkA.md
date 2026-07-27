# Implicit parameters

Implicit parameters are passed to functions without having to explicitly specify them at the call site. This can make your code more concise and readable, especially when dealing with common or boilerplate code. In Scala 2, they were declared with the implicit keyword. In Scala 3, we use keywords given and using. The given keyword is used to define instances of implicit values, and the using keyword is used to declare context parameters.

Visit the following resources to learn more:

- [@official@Using Clauses | Scala documentation](https://docs.scala-lang.org/scala3/reference/contextual/using-clauses.html)
- [@article@Scala 3: Given and Using Clauses | Rock the JVM](https://rockthejvm.com/articles/scala-3-given-and-using-clauses)
- [@article@Scala 3: Using Term Inference with Given and Using (and extension methods) | alvinalexander.com](https://alvinalexander.com/scala/scala-3-given-using-term-inference-context/)