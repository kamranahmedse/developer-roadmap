# git revert

Git revert is a command that allows you to "undo" or revert specific commits in your Git repository. It creates a new commit that reverses the changes made by the specified commit(s), effectively rolling back your code to a previous state.

Here are some key things to know about `git revert`:

- Reverts changes, not moves HEAD: Unlike `git reset`, which can move your current branch's head to a different point in history, `git revert` creates new commits that reverse the changes made by specific commit(s).
- Creates new commits: Each time you use `git revert`, it creates a new commit that undoes the specified change. This means your Git history will still contain all previous commits.
- Can be used with multiple commits: If you want to revert multiple commits, simply specify their hashes or references (e.g., branch names) separated by commas.

Visit the following resources to learn more:

- [@article@Git Revert](https://medium.com/@meghasharmaa704/git-revert-84727b543c17)
- [@video@Git Revert - Visualised](https://www.youtube.com/watch?v=XJqQPNudPSY)