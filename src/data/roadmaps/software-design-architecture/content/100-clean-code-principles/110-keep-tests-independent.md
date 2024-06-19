# Keep Tests Independent

Keeping tests independent helps ensures that the tests are reliable, repeatable, and easy to maintain. When tests are independent, a change in one test will not affect the results of other tests.

Here are some ways to keep tests independent in system architecture:

- Use dependency injection to decouple the test code from the application code. This allows the tests to be run without the need to instantiate the application objects directly.
- Use mocks or stubs to isolate the test from external dependencies such as databases, APIs, or other services.
- Use test data that is self-contained and does not rely on external data or state.
- Use a test framework that supports running tests in parallel, so that the tests can be run independently of each other.
- Use test-driven development (TDD), which involves writing tests before writing the application code. This ensures that the tests are independent and that the code is written with testability in mind.
- Avoid global state and shared mutable state as it may cause unexpected results.

Learn more from the following links:

- [@article@Keeping Tests Valuable](https://www.checklyhq.com/learn/headless/valuable-tests/)
- [@feed@Explore top posts about Testing](https://app.daily.dev/tags/testing?ref=roadmapsh)
