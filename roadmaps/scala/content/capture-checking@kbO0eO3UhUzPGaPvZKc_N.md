# Capture checking

Capture Checking is an experimental feature in Scala that allows you to track which designated values are captured (i.e., stored as references) by arbitrary other values. This tracking happens at compile time and is currently an opt-in mechanism that can be enabled via an import. Capture checking helps ensure resource safety and prevent capability leakage by verifying at compile-time that capabilities (representing resources, effects, or permissions) are properly managed and do not escape their intended scope.

Visit the following resources to learn more:

- [@official@Capture Checking](https://docs.scala-lang.org/scala3/reference/experimental/cc.html)
- [@article@Understanding Capture Checking in Scala | SoftwareMill](https://softwaremill.com/understanding-capture-checking-in-scala/)
- [@article@Capture Checking Basics](https://nightly.scala-lang.org/docs/reference/experimental/capture-checking/basics.html)