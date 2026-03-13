# Conversions
Implicit conversions allow the compiler to automatically convert one type to another in certain situations. In Scala 3, implicit conversions are defined by a given instance of type scala.Conversion[S, T], where S is the source type and T is the target type. In Scala 3.8+, the into keyword is used to mark types that can be implicitly converted. If the expected type of an expression is into[T], then an implicit conversion to that type can be inserted without the need for a language import.

Visit the following resources to learn more:

- [@official@Implicit Conversions | Tour of Scala | Scala Documentation](https://docs.scala-lang.org/tour/implicit-conversions.html)
- [@official@Implicit Conversions | Scala 3 - Book | Scala Documentation](https://docs.scala-lang.org/scala3/book/ca-implicit-conversions.html)
- [@article@Implicit Conversions | Baeldung on Scala](https://www.baeldung.com/scala/implicit-conversions)