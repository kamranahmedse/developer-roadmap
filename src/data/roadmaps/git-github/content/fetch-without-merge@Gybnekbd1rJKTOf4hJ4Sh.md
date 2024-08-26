# Fetch without Merge

Running `git fetch` retrieves changes from a remote repository into your local clone, but does not automatically merge any of these changes into your local working directory. This is different from `git pull`, which both fetches and merges remote changes. By using fetch without merge, you can ensure that your local clone is up-to-date with the latest information from the remote repository, while leaving your working directory unchanged. You can then choose to apply these changes by using merge or rebase. This approach helps maintain a clean and consistent local state, making it easier to manage and commit changes.

Visit the following resources to learn more:

- [@official@Git Fetch](https://git-scm.com/docs/git-fetch)
- [@article@Git fetch](https://www.atlassian.com/git/tutorials/syncing/git-fetch)
- [@video@Git Fetch | What is Git Fetch and How to Use it | Learn Git](https://www.youtube.com/watch?v=uEEcw1s_wWk)