# Fast-Forward vs Non-FF

In Git, when you merge branches, there are two primary types of merges: Fast-Forward and Non-Fast-Forward (No-FF). These terms describe how Git handles the history and pointers when merging branches. Understanding the difference between these two types of merges is crucial for managing your project's commit history effectively.

A Fast-Forward merge occurs when the branch you are merging into (often main or master) has not diverged from the branch you are merging (often a feature branch). In other words, the commit history of the target branch is a strict subset of the branch being merged. In a Fast-Forward merge, Git simply moves the pointer of the target branch forward to the latest commit on the branch being merged.
No new merge commit is created; the history is linear.

A Non-Fast-Forward (No-FF) merge happens when the target branch has diverged from the branch being merged or when you explicitly choose to create a merge commit. In this case, Git creates a new commit that represents the merging of the two branches. Git creates a new merge commit that has two parent commits: one from the target branch and one from the branch being merged. The merge commit is a snapshot of the merged work, preserving the history of both branches.

Visit the following resources to learn more:

- [@article@Git Fast-Forward VS Non-Fast-Forward](https://leimao.github.io/blog/Git-Fast-Forward-VS-Non-Fast-Forward/)
- [@article@Git Merge: To Squash Or Fast-Forward?](https://dev.to/trpricesoftware/git-merge-to-squash-or-fast-forward-3791)
- [@article@Difference between a git fast forward and no fast forward](https://gist.github.com/moraisaugusto/1fa02c49b6d9833fcdf665505595ac2e)
- [@video@GIT Fast Forward Visualized](https://youtu.be/DN1fNYoJgDw?si=_TZKACj4SCOuESGm)
- [@video@git merge no fast forward](https://youtu.be/X_8atqzsO8U?si=e9hMQg_aWLRMWf4O)
