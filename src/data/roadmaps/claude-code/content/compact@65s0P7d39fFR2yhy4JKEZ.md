# /compact

The `/compact` command is a context management tool designed to optimize your session's memory when the context window begins to fill up. Instead of completely wiping your history like `/clear`, `/compact` instructs Claude to generate a concise summary of the key decisions, code changes, and project state established so far. It then replaces the bulky, line-by-line conversation history with this summarized version, effectively "compressing" the tokens used while preserving the essential knowledge the AI needs to continue the task.

Visit the following resources to learn more:

- [@official@Built-in commands](https://code.claude.com/docs/en/interactive-mode)
- [@article@What Actually Happens When You Run /compact in Claude Code](https://dev.to/rigby_/what-actually-happens-when-you-run-compact-in-claude-code-3kl9)
- [@video@3 Ways to Fix Claude Code's Context](https://www.youtube.com/watch?v=yBLwsBKPYSw)