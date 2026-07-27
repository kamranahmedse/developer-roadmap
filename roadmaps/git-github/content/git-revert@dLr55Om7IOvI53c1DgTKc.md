# git revert
 
`git revert` creates a new commit that undoes the changes made by a previous commit, without altering existing history. This makes it a safe way to undo changes on a branch that others have already pulled, since it doesn't rewrite any commits. Running `git revert <commit-hash>` applies the inverse of that commit's changes and prompts for a new commit message.

Visit the following resources to learn more:

- [@article@Git Revert](https://medium.com/@meghasharmaa704/git-revert-84727b543c17)
- [@video@Git Revert - Visualised](https://www.youtube.com/watch?v=XJqQPNudPSY)