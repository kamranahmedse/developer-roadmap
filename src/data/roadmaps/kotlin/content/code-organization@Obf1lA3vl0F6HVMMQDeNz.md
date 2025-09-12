# Code Organization

In pure Kotlin projects, the recommended directory structure follows the package structure with the common root package omitted. For example, if all the code in the project is in the `org.example.kotlin` package and its subpackages, files with the `org.example.kotlin` package should be placed directly under the source root, and files in `org.example.kotlin.network.socke
t` should be in the `network/socket` subdirectory of the source root.

If a Kotlin file contains a single class or interface (potentially with related top-level declarations), its name should be the same as the name of the class, with the .kt extension appended. It applies to all types of classes and interfaces. If a file contains multiple classes, or only top-level declarations, choose a name describing what the file contains, and name the file accordingly. Use upper camel case, where the first letter of each word is capitalized. For example, ProcessDeclarations.kt

Visit the following resources to learn more:

- [@official@Source code organization](https://kotlinlang.org/docs/coding-conventions.html#source-code-organization)
- [@video@Full 2025 Kotlin Crash Course For Beginners](https://www.youtube.com/watch?v=dzUc9vrsldM)