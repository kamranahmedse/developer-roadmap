# git filter-branch

You can use `git filter-branch` to rewrite Git revision history by applying custom filters on each revision.

- Filter types: You can modify trees (e.g., removing a file or running a Perl script) or information about each commit.
- Preserving original data: The command preserves all original commit times, merge information, and other details unless specified otherwise.
- Rewriting specific branches: Only the positive refs mentioned in the command line are rewritten; if no filters are specified, commits are recommitted without changes.

Visit the following resources to learn more: 

- [@official@git filter-branch](https://git-scm.com/docs/git-filter-branch)