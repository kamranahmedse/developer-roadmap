# pre-commit
 
The `pre-commit` hook runs before a commit is finalized, giving a chance to inspect the staged changes and abort the commit if something is wrong. It's frequently used to run linters, formatters, or tests against the code being committed. If the hook script exits with a non-zero status, the commit is stopped.

Visit the following resources to learn more:

- [@official@Git Hooks](https://www.atlassian.com/git/tutorials/git-hooks)
- [@opensource@pre-commit/pre-commit](https://github.com/pre-commit/pre-commit)