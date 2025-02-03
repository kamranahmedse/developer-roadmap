# Unstaged Changes

For changes that are not yet staged with `git add`, such as untracked new files or modified existing ones , use `git diff`. This command compares your working directory (your current changes) against the staging area (changes already staged with `git add`). It’s a useful tool for reviewing local modifications before deciding whether to stage them for future commits.

The `--unified` option (or -U) controls the number of context lines shown in the diff output. By default, Git shows 3 lines of context around each change. For example, `git diff --unified=5` will display 5 lines of context around each change, making it easier to understand the surrounding code or content.

- [@article@What are unstaged changes in GitHub?](https://stackoverflow.com/questions/10954329/whats-the-unstaged-changes-in-github)
- [@article@How to unstage files in Git](https://www.git-tower.com/learn/git/faq/git-unstage)
