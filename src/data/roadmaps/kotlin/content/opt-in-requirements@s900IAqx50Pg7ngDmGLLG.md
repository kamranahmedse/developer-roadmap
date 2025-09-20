# Opt-in Requirements

Opt-in requirements in Kotlin provide a mechanism to enforce that certain APIs or code constructs are used only when the developer explicitly acknowledges and understands the associated risks or special conditions. This is achieved by marking APIs with annotations that require explicit opt-in, forcing users to acknowledge the usage by adding an `@OptIn` annotation or compiler argument. This helps prevent accidental misuse of potentially unstable, experimental, or otherwise restricted features.

Visit the following resources to learn more:

- [@official@Opt in to APIs](https://kotlinlang.org/docs/kotlin-tour-intermediate-libraries-and-apis.html#opt-in-to-apis)