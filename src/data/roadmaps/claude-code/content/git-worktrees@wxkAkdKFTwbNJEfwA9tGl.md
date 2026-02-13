# Git Worktrees

Using Git worktrees with Claude Code is a powerful scaling technique that allows you to run multiple independent AI sessions in parallel without the overhead of context switching or the risk of file-edit collisions. This workflow is highly efficient for "fanning out" tasks: you can supervise several separate worktrees simultaneously, leveraging prompt caching across them for shared codebase context, and simply delete the worktree folder once the branch is merged to keep your environment clean.

Visit the following resources to learn more:

- [@official@Run parallel Claude Code sessions with Git worktrees](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)
- [@official@git-worktrees](https://git-scm.com/docs/git-worktree)
- [@article@Parallel Development with ClaudeCode and Git Worktrees](https://medium.com/@ooi_yee_fei/parallel-ai-development-with-git-worktrees-f2524afc3e33)
- [@article@Using Git Worktrees for Parallel AI Development](https://stevekinney.com/courses/ai-development/git-worktrees)
- [@video@Git Worktrees: The secret sauce to Claude Code!](https://www.youtube.com/watch?v=up91rbPEdVc)
- [@video@Claude Code & Git Worktrees: How to Run Claude Code in parallel with Git Worktrees](https://www.youtube.com/watch?v=an-Abb7b2XM)