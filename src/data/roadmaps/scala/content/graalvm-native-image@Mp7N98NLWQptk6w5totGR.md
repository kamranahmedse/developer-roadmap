# GraalVM Native Image

GraalVM Native Image is a tool that compiles Java applications into native binary executables using ahead-of-time (AOT) compilation. When used with Scala, it can significantly improve the performance and startup time of Scala applications by eliminating the need for a JVM at runtime. The process involves using plugins like sbt-native-image, which automates the installation of GraalVM and the generation of native binaries. However, configuring GraalVM for Scala applications can be challenging due to the need to handle reflection and other dynamic features used by Scala libraries.

Visit the following resources to learn more:

- [@opensource@GitHub - scalameta/sbt-native-image: Plugin to generate native-image binaries with sbt](https://github.com/scalameta/sbt-native-image)
- [@article@GraalVM with Scala | Baeldung on Scala](https://www.baeldung.com/scala/graalvm)
- [@article@Packaging as GraalVM native images ⚡ | Scala CLI](https://scala-cli.virtuslab.org/docs/cookbooks/package/native-images/)