# Layers

AWS Lambda layers are distribution mechanisms for libraries, custom runtimes, and other function dependencies. In other words, they are a distribution mechanism for artifacts. The layers can be versioned, and each version is immutable. An AWS Lambda layer is a ZIP archive that contains libraries, a custom runtime, or other dependencies. Lambda functions can be configured to reference these layers. The layer is then extracted to the `/opt` directory in the function execution environment. Each runtime looks for libraries in a different location under the `/opt` folder, depending on the language.

Visit the following resources to learn more:

- [@official@AWS Lambda Layers](https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html)
- [@video@Create and Use Lambda Layers](https://www.youtube.com/watch?v=jyuZDkiHe2Q)
