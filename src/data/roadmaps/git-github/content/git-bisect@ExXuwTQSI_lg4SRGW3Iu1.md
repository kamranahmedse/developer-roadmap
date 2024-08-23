# Git Bisect

Git Bisect is an interactive tool used to identify which commit in your project's history introduced a bug or regression. You start by identifying two commits: one where the issue isn't present (the "good" commit) and another where it is (the "bad" commit). Then, run `git bisect start`, followed by `git bisect good` for the good commit and `git bisect bad` for the bad commit. Git Bisect will guide you through a binary search process, asking you to test the midpoint of your current range until it identifies the exact commit that introduced the bug or regression.

Visit the following resources to learn more:

- [@official@Git Bisect](https://git-scm.com/docs/git-bisect)
- [@article@Using `git bisect` to find the faulty commit](https://dev.to/alvesjessica/using-git-bisect-to-find-the-faulty-commit-25gf)
- [@video@Git Bisect | How to use Git Bisect | Learn Git](https://www.youtube.com/watch?v=z-AkSXDqodc)