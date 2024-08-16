# HEAD

The `HEAD` file is at the core of how Git knows the SHA-1 of the last commit when running commands like `git branch <branch>`. It serves as a symbolic reference, pointing to the current branch. However, in rare cases, HEAD can contain the actual SHA-1 value of a Git object, such as when checking out a tag, commit, or remote branch, which puts your repository in a "detached HEAD" state.

Visit the following resources to learn more:

- [@official@Git Internals - Git References - The HEAD](https://git-scm.com/book/en/v2/Git-Internals-Git-References#:~:text=want%20to%20create.-,The%20HEAD,-The%20question%20now)
- [@video@Learn Git Essentials: Head & Detached Head](https://www.youtube.com/watch?v=HvDjbAa9ZsY)