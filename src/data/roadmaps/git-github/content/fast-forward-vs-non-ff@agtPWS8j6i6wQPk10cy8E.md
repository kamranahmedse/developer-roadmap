# Fast-Forward vs Non-FF
 
A fast-forward merge happens when the target branch has no new commits since the feature branch was created, so Git simply moves the branch pointer forward without creating a new commit. A non-fast-forward merge occurs when both branches have diverged, requiring Git to create a dedicated merge commit that ties the two histories together. Developers can force a merge commit even when a fast-forward is possible by using `git merge --no-ff`, which some teams prefer for a clearer history.

Visit the following resources to learn more:

- [@article@Git Fast-Forward VS Non-Fast-Forward](https://leimao.github.io/blog/Git-Fast-Forward-VS-Non-Fast-Forward/)
- [@article@Difference between a git fast forward and no fast forward](https://gist.github.com/moraisaugusto/1fa02c49b6d9833fcdf665505595ac2e)
- [@video@GIT Fast Forward Visualized](https://youtu.be/DN1fNYoJgDw?si=_TZKACj4SCOuESGm)
- [@video@git merge no fast forward](https://youtu.be/X_8atqzsO8U?si=e9hMQg_aWLRMWf4O)