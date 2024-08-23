# Git Stash Basics

Git stash allows you to temporarily save your changes, or "stashes", when they're not yet ready for commit. This feature is useful when you need to work on multiple tasks, and want to switch between them without committing changes that are not complete. By using `git stash`, you can quickly stash uncommitted changes, reset the working directory to a clean state, and then apply the stashed changes later when they're ready for commit. This helps avoid cluttering the commit history with incomplete work, and allows you to maintain a clean and organized repository by separating your progress on different tasks.

To apply a stash in Git, you can use the following commands:

- `git stash apply`: This command applies the topmost stash (the most recent one) by default. It will merge the stashed changes into your current working directory.
- `git stash apply <stash_name>`: If you want to specify a particular stash, you can use its name instead of default. For example, if you've stored multiple stashes and want to apply an earlier one, you can use <stash_name>.
- `git stash pop`: This command is similar to apply, but it also automatically deletes the applied stash from the stash list. If you need more control over which stash to apply, using pop might be a better option.

Visit the following resources to learn more:

- [@article@Git stash](https://www.atlassian.com/git/tutorials/saving-changes/git-stash)
- [@article@A practical guide to using the git stash command](https://opensource.com/article/21/4/git-stash)