# Monads

Monads in Scala are constructs that augment a value with additional features, known as effects. These effects can include managing the nullability of a variable or handling the asynchronicity of its computation. In Scala, common monads include Option\[T\], Future\[T\], Either, List, and more. A monad adds an effect to a value by wrapping it around a context. The key functions a monad must implement are unit (which lifts a value into the monadic context) and flatMap (which allows for chaining operations within the monadic context).

Visit the following resources to learn more:

- [@article@Monads in Scala | Baeldung on Scala](https://www.baeldung.com/scala/monads)
- [@article@An Introduction to Monads in Scala | Rock the JVM](https://rockthejvm.com/articles/an-introduction-to-monads-in-scala)
- [@article@Demystifying the Monad in Scala](https://medium.com/free-code-camp/demystifying-the-monad-in-scala-cc716bb6f534)