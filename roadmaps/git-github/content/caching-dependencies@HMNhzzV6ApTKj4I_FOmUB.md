# Caching Dependencies
 
Caching dependencies in GitHub Actions stores files like package manager directories between workflow runs, avoiding the need to reinstall them from scratch every time. The `actions/cache` action saves and restores these files based on a key, often derived from a lockfile's hash. This significantly speeds up workflows that install the same dependencies repeatedly across multiple runs.

Visit the following resources to learn more:

- [@official@Caching dependencies to speed up workflows](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows)
- [@video@Cache Management with GitHub actions](https://www.youtube.com/watch?v=7PVUjRXUY0o)