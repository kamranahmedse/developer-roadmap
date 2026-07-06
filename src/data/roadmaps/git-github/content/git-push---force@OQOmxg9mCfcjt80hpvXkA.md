# git push --force
 
`git push --force` overwrites the remote branch's history with the local branch's history, even if they've diverged. This is necessary after rewriting local commits, like through a rebase, since a normal push would be rejected due to mismatched history. Because it can overwrite others' work on a shared branch, `git push --force-with-lease` is often recommended instead, since it fails if the remote has changes the local branch doesn't know about.

Visit the following resources to learn more:

- [@article@Git Push Force](https://www.gitkraken.com/learn/git/problems/git-push-force)
- [@video@How to force push to GitHub?](https://www.youtube.com/watch?v=wgXbfLn-zkI)