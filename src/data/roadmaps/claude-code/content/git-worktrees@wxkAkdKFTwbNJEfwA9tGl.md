# Git Worktrees

Using Git worktrees with Claude Code is a powerful scaling technique that allows you to run multiple independent AI sessions in parallel without the overhead of context switching or the risk of file-edit collisions. This workflow is highly efficient for "fanning out" tasks: you can supervise several separate worktrees simultaneously, leveraging prompt caching across them for shared codebase context, and simply delete the worktree folder once the branch is merged to keep your environment clean.

Visit the following resources to learn more:

- [@official@Run parallel Claude Code sessions with Git worktrees](https://code.claude.com/docs/en/worktrees)
- [@article@Using Git Worktrees for Parallel AI Development](https://stevekinney.com/courses/ai-development/git-worktrees)
- [@video@Git Worktrees: The secret sauce to Claude Code!](https://www.youtube.com/watch?v=up91rbPEdVc)