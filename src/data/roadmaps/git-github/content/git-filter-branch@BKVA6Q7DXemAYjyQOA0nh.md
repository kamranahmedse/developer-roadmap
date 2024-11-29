# git filter-branch

You can use `git filter-branch` to rewrite Git revision history by applying custom filters on each revision.

- Filter types: You can modify trees (e.g., removing a file or running a Perl script) or information about each commit.
- Preserving original data: The command preserves all original commit times, merge information, and other details unless specified otherwise.
- Rewriting specific branches: Only the positive refs mentioned in the command line are rewritten; if no filters are specified, commits are recommitted without changes.

Notably, there exists a simpler, safer, and more powerful alternative: `git filter-repo`. This tool is actively promoted by Git and offers a streamlined approach to filtering revisions, making it a preferred choice for rewriting your Git history, especially when managing large repositories.

Visit the following resources to learn more:

- [@official@git filter-branch](https://git-scm.com/docs/git-filter-branch)
- [@official@git filter-repo](https://github.com/newren/git-filter-repo)
- [@article@Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)