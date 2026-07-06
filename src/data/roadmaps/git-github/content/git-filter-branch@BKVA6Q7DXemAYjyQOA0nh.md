# git filter-branch
 
`git filter-branch` rewrites a large portion of a repository's history, often used to remove sensitive files or restructure the project after the fact. It applies a filter across many or all commits, such as deleting a specific file from every point in history. Because it's slow and error-prone, Git's documentation now recommends the `git filter-repo` tool as a faster, safer alternative for the same kind of history rewriting.

Visit the following resources to learn more:

- [@official@git filter-branch](https://git-scm.com/docs/git-filter-branch)
- [@official@git filter-repo](https://github.com/newren/git-filter-repo)
- [@article@Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)