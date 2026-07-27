# Rewriting History
 
Rewriting history refers to Git operations that change existing commits rather than adding new ones on top, such as amending a commit message or rebasing a series of commits. These operations alter commit hashes, which can cause issues for anyone who already has a copy of the original history. Because of this, rewriting history is generally safe on local or unshared branches, but risky on branches others are actively using.

Visit the following resources to learn more:

- [@official@Git Tools - Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
- [@article@Methods of Rewriting History in Git](https://www.atlassian.com/git/tutorials/rewriting-history)