# Caching Dependencies

GitHub Actions provides a caching feature that allows you to store and reuse dependencies between workflows, reducing the time it takes to run your actions. By caching dependencies, you can:

- Reuse compiled code
- Store database connections
- Reduce network traffic

It is highly recommended to not store any sensitive information in the cache. For example, sensitive information can include access tokens or login credentials stored in a file in the cache path.

Visit the following resources to learn more:

- [@official@Caching dependencies to speed up workflows](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows)
- [@video@Cache Management with GitHub actions](https://www.youtube.com/watch?v=7PVUjRXUY0o)