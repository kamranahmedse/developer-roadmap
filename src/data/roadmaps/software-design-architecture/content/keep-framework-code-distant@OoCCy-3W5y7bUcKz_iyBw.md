# Keep Framework Code Distant

Keeping framework code distant refers to separating the application's code from the framework's code. By doing so, it makes it easier to maintain, test, and upgrade the application's codebase and the framework independently.

Here are some ways to keep framework code distant in system architecture:

1. Use an abstraction layer to separate the application code from the framework code. This allows the application code to be written without the need to know the specifics of the framework.
2. Use dependency injection to decouple the application code from the framework code. This allows the application code to use the framework's functionality without having to instantiate the framework objects directly.
3. Avoid using framework-specific libraries or classes in the application code. This makes it easier to switch to a different framework in the future if needed.
4. Use a standard interface for the application code to interact with the framework. This allows the application code to be written without the need to know the specifics of the framework.
5. Keep the application and the framework code in separate projects and/or repositories.

By following these best practices, the system architecture will be more maintainable, testable, and less error-prone, and it will be easier to upgrade or switch the framework if needed.

Learn more from the following links:

- [@article@Clean architecture](https://pusher.com/tutorials/clean-architecture-introduction/)
- [@feed@Explore top posts about General Programming](https://app.daily.dev/tags/general-programming?ref=roadmapsh)
